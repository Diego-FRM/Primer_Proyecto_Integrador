// Configuración API
const API_BASE = document.body.dataset.apiBase || "http://127.0.0.1:5000";
const API_URL  = `${API_BASE.replace(/\/$/, "")}/api/news`;  // /api/news

// Referencias DOM
const grid        = document.getElementById("grid");
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = themeToggle?.querySelector("i");
const prevBtn   = document.getElementById("prevBtn");
const nextBtn   = document.getElementById("nextBtn");
const pageInfo  = document.getElementById("pageInfo");

// Estado de paginación y cache
let page  = 1;
let limit = 3;
let pages = 2;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos
const cacheKey = (p = page, l = limit) => `newsCache:${p}:${l}`;

function readCache(p = page, l = limit) {
  try {
    const raw = localStorage.getItem(cacheKey(p, l));
    if (!raw) return null;
    const { payload, savedAt } = JSON.parse(raw);
    if (!savedAt || (Date.now() - savedAt) > CACHE_TTL_MS) return null;
    return payload;
  } catch { return null; }
}
function saveCache(p = page, l = limit, payload) {
  try { localStorage.setItem(cacheKey(p, l), JSON.stringify({ payload, savedAt: Date.now() })); } catch {}
}

// Tema oscuro
(function initTheme(){
  const saved = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-bs-theme", saved);
  if (themeIcon) themeIcon.className = saved === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
})();
themeToggle?.addEventListener("click", () => {
  const curr = document.documentElement.getAttribute("data-bs-theme");
  const next = curr === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", next);
  localStorage.setItem("theme", next);
  if (themeIcon) themeIcon.className = next === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
});

// Seguridad, función para proteger contra inyecciones HTML
function escapeHtml(value) {
  const text = (value === null || value === undefined) ? "" : String(value);
  const entities = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" };
  return text.replace(/[&<>"']/g, (char) => entities[char]);
}

// Función para asignar clase de Bootstrap según severidad
function sevBadgeClass(sev){
  const s = String(sev||"").toLowerCase();
  if (s === "critical") return "text-bg-danger";
  if (s === "high")     return "text-bg-warning";
  if (s === "medium")   return "text-bg-info";
  return "text-bg-secondary";
}

// Renderizar tarjeta
function toCard(n){
  const title   = n.title || "Alerta";
  const summary = n.summary || "";
  const src     = n.source || "";
  const dateStr = n.published_at || "";
  const tags    = Array.isArray(n.tags) ? n.tags : [];
  const sev     = n.severity || "low";
  const url     = n.url || "";

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm bg-body text-body border-2 border-primary rounded-3">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title mb-1">${escapeHtml(title)}</h5>
            <span class="badge ${sevBadgeClass(sev)}">${escapeHtml(sev)}</span>
          </div>
          <p class="card-text small text-secondary mb-2">
            ${dateStr ? `<i class="bi bi-calendar-week me-1"></i>${escapeHtml(dateStr)}` : ``}
            ${src ? ` · <i class="bi bi-broadcast ms-1 me-1"></i>${escapeHtml(src)}` : ``}
          </p>
          <p class="card-text flex-grow-1">${escapeHtml(summary)}</p>
          <div class="mt-auto mb-2">
            ${tags.map(t=>`<span class="badge text-bg-secondary me-1">${escapeHtml(t)}</span>`).join('')}
          </div>
          ${url ? `<a class="btn btn-outline-primary btn-sm" href="${escapeHtml(url)}" target="_blank" rel="noopener">Ver fuente</a>` : ``}
        </div>
      </div>
    </div>`;
}

// UI helpers
function setLoading(){
  grid.innerHTML = `
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 text-secondary">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>Cargando noticias…</span>
      </div>
    </div>`;
}
function renderItems(items){
  if (!items?.length){
    grid.innerHTML = `
      <div class="col-12">
        <div class="text-warning">No hay noticias para mostrar.</div>
      </div>`;
    return;
  }
  grid.innerHTML = items.map(toCard).join("");
}
function updatePagerUI(currPage, totalPages, offline=false){
  if (pageInfo) pageInfo.textContent = `Página ${currPage} de ${Math.max(1,totalPages)}${offline ? " (offline)" : ""}`;
  if (prevBtn)  prevBtn.disabled = currPage <= 1;
  if (nextBtn)  nextBtn.disabled = currPage >= totalPages;
}

// Fetch con paginación y cache local
async function fetchNewsPage(p = page, l = limit){
  const res = await fetch(`${API_URL}?page=${p}&limit=${l}`, { headers: { "Accept": "application/json" }, mode: "cors" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items
              : Array.isArray(data) ? data
              : [];
  const meta = {
    items,
    page: Number.isFinite(data.page)  ? data.page  : p,
    limit: Number.isFinite(data.limit) ? data.limit : l,
    total: Number.isFinite(data.total) ? data.total : items.length,
    pages: Number.isFinite(data.pages) ? data.pages : 1
  };
  return meta;
}

// Cargar noticias
async function loadNews(){
  setLoading();

  // 1) Pintado rápido desde cache si existe y no expiró
  const cached = readCache(page, limit);
  if (cached?.items) {
    renderItems(cached.items);
    pages = Math.max(1, cached.pages || 1);
    updatePagerUI(cached.page || page, pages, false);
  }

  // 2) Intentar red
  try{
    const meta = await fetchNewsPage(page, limit);
    saveCache(page, limit, meta);
    renderItems(meta.items);
    pages = Math.max(1, meta.pages || 1);
    page  = meta.page;
    limit = meta.limit;
    updatePagerUI(page, pages, false);
  }catch(err){
    console.error(err);
    if (!cached?.items){
      grid.innerHTML = `
        <div class="col-12">
          <div class="text-danger">Error al cargar noticias desde ${escapeHtml(API_URL)}.</div>
        </div>`;
      updatePagerUI(page, pages, false);
    } else {
      updatePagerUI(page, pages, true);
    }
  }
}

// Listeners de paginación
prevBtn?.addEventListener("click", () => {
  if (page > 1){ page -= 1; loadNews(); }
});
nextBtn?.addEventListener("click", () => {
  if (page < pages){ page += 1; loadNews(); }
});

// Inicialización: permite page/limit en querystring
(function initFromQuery(){
  try{
    const q = new URLSearchParams(location.search);
    const qp = parseInt(q.get("page")  || "", 10);
    const ql = parseInt(q.get("limit") || "", 10);
    if (Number.isFinite(qp) && qp > 0) page  = qp;
    if (Number.isFinite(ql) && ql > 0) limit = ql;
  }catch{}
})();

loadNews();
