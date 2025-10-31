// Configuración API
const API_BASE = document.body.dataset.apiBase || "http://127.0.0.1:5000";
const API_URL  = `${API_BASE.replace(/\/$/, "")}/api/news`;  // /api/news

// Referencias DOM
const grid        = document.getElementById("grid");
const themeToggle = document.getElementById("themeToggle");
const themeIcon   = themeToggle?.querySelector("i");

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

// Seguridad, funcion para proteger contra inyecciones HTML
function escapeHtml(value) {
  const text = (value === null || value === undefined) ? "" : String(value);
  const entities = { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" };
  return text.replace(/[&<>"']/g, (char) => entities[char]);
}


// Funcion para asignar clase de Bootstrap segun severidad
function sevBadgeClass(sev){
  const s = String(sev||"").toLowerCase();
  if (s === "critical") return "text-bg-danger";
  if (s === "high")     return "text-bg-warning";
  if (s === "medium")   return "text-bg-info";
  return "text-bg-secondary";
}

// Renderizar noticias
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

// Fetch y cargar noticias
async function loadNews(){
  grid.innerHTML = `
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 text-secondary">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>Cargando noticias…</span>
      </div>
    </div>`;

  try{
    const res = await fetch(API_URL, { headers: { "Accept": "application/json" }, mode: "cors" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const items = Array.isArray(data) ? data : (Array.isArray(data.items) ? data.items : []);

    if (!items.length){
      grid.innerHTML = `
        <div class="col-12">
          <div class="text-warning">No hay noticias para mostrar.</div>
        </div>`;
      return;
    }
    grid.innerHTML = items.map(toCard).join("");
  }catch(err){
    console.error(err);
    grid.innerHTML = `
      <div class="col-12">
        <div class="text-danger">Error al cargar noticias desde ${escapeHtml(API_URL)}.</div>
      </div>`;
  }
}

loadNews();
