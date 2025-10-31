import math
from flask import Flask, jsonify, request

app = Flask(__name__)

# --- Noticias ---
NEWS = [
    {
        "id": 101,
        "title": "Phishing lidera las ciberamenazas detectadas en 2024",
        "summary": "El phishing se consolidó como el ciberataque más frecuente con 39.6% de todos los ataques por correo electrónico.",
        "severity": "high",
        "source": "ESET Cybersecurity Report 2024",
        "tags": ["phishing", "correo electrónico", "estadísticas"],
        "region": "GLOBAL",
        "url": "https://www.itdigitalsecurity.es/endpoint/2024/12/las-ciberamenazas-que-han-marcado-2024"
    },
    {
        "id": 102,
        "title": "Ransomware afecta al 72.7% de organizaciones en 2024",
        "summary": "El ransomware se posicionó como la mayor amenaza con costo promedio de recuperación de 4.54 millones de dólares.",
        "severity": "critical",
        "source": "ExpressVPN Cyber Report 2024",
        "tags": ["ransomware", "costo", "estadísticas"],
        "region": "GLOBAL",
        "url": "https://www.expressvpn.com/es/blog/the-true-cost-of-cyber-attacks-in-2024-and-beyond/"
    },
    {
        "id": 103,
        "title": "768 vulnerabilidades CVE fueron explotadas en 2024",
        "summary": "VulnCheck reporta un aumento del 20% en CVEs explotadas comparado con 2023.",
        "severity": "critical",
        "source": "VulnCheck & CISA Report",
        "tags": ["vulnerabilidades", "CVE", "estadísticas"],
        "region": "GLOBAL",
        "url": "https://blog.segu-info.com.ar/2025/02/analisis-de-las-principales.html"
    },
    {
        "id": 104,
        "title": "El 90% de violaciones de datos son causadas por phishing",
        "summary": "Aproximadamente 3.4 mil millones de correos de phishing se envían diariamente.",
        "severity": "high",
        "source": "Techopedia Statistics 2024",
        "tags": ["phishing", "violaciones de datos", "estadísticas"],
        "region": "GLOBAL",
        "url": "https://www.techopedia.com/es/estadisticas-ciberseguridad"
    },
    {
        "id": 105,
        "title": "Malware de robo de datos representa el 50% de amenazas a PyMEs",
        "summary": "Keyloggers, spyware y stealers dominan los ataques contra pequeñas y medianas empresas.",
        "severity": "high",
        "source": "Sophos Threat Report 2024",
        "tags": ["malware", "PyMEs", "robo de datos"],
        "region": "GLOBAL",
        "url": "https://news.sophos.com/es-es/2024/03/13/"
    },
    {
        "id": 106,
        "title": "92% de líderes de TI reportan aumento en ciberataques",
        "summary": "Según estudio de Keeper Security, los ataques continúan aumentando significativamente en 2024.",
        "severity": "medium",
        "source": "Keeper Security Study 2024",
        "tags": ["ciberataques", "TI", "estadísticas"],
        "region": "GLOBAL",
        "url": "https://www.keepersecurity.com/blog/es/2024/09/06/are-cyber-attacks-increasing/"
    }
]

# Endpoints de noticias 

# Lista completa (sin paginación ni ordenamiento)
@app.route("/api/news", methods=["GET"])
def list_news():
    page = max(int(request.args.get("page", 1)), 1)
    limit = min(max(int(request.args.get("limit", 6)), 1), 50)

    start = (page - 1) * limit
    end = start + limit

    items = NEWS[start:end]
    total = len(NEWS)
    pages = math.ceil(total / limit) if limit else 1

    return jsonify({
        "items": items,
        "page": page,
        "limit": limit,
        "total": total,
        "pages": pages
    }), 200

# Obtener una sola noticia por id
@app.route("/api/news/<int:nid>", methods=["GET"])
def get_news(nid: int):
    n = next((x for x in NEWS if x["id"] == nid), None)
    if not n:
        return jsonify({"detail": "News not found"}), 404
    return jsonify(n)

# Crear una noticia
@app.route("/api/news", methods=["POST"])
def create_news():
    if not request.is_json:
        return jsonify({"detail": "Content-Type debe ser application/json"}), 415

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"detail": "Cuerpo inválido; se esperaba JSON"}), 400

    # Campos requeridos mínimos
    required = ["title", "summary", "severity", "source"]
    missing = [k for k in required if not data.get(k)]
    if missing:
        return jsonify({"detail": f"Faltan campos requeridos: {', '.join(missing)}"}), 400

    # Validar severidad (ahora incluye 'low')
    sev = str(data.get("severity")).lower()
    allowed = {"low", "medium", "high", "critical"}
    if sev not in allowed:
        return jsonify({"detail": f"severity inválido '{sev}'. Valores permitidos: {', '.join(sorted(allowed))}"}), 400

    # Validar tags
    tags = data.get("tags", [])
    if tags is None:
        tags = []
    if not isinstance(tags, list):
        return jsonify({"detail": "El campo 'tags' debe ser una lista"}), 400
    tags = [str(t).strip() for t in tags]

    # Generar id siguiente
    new_id = (max((n["id"] for n in NEWS), default=100) + 1)

    news_item = {
        "id": new_id,
        "title": str(data["title"]).strip(),
        "summary": str(data["summary"]).strip(),
        "severity": sev,
        "source": str(data.get("source", "custom")).strip(),
        "tags": tags,
        "region": str(data.get("region", "GLOBAL")),
        "url": str(data.get("url", "")),
    }

    NEWS.append(news_item)
    return jsonify(news_item), 201

# Modificar una noticia existente
@app.route("/api/news/<int:nid>", methods=["PUT"])
def update_news(nid: int):
    if not request.is_json:
        return jsonify({"detail": "Content-Type debe ser application/json"}), 415

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"detail": "Cuerpo inválido; se esperaba JSON"}), 400

    # Buscar la noticia existente
    n = next((x for x in NEWS if x["id"] == nid), None)
    if not n:
        return jsonify({"detail": "Noticia no encontrada"}), 404

    # Validar severidad si viene
    if "severity" in data:
        sev = str(data["severity"]).lower()
        allowed = {"low", "medium", "high", "critical"}
        if sev not in allowed:
            return jsonify({"detail": f"severity inválido '{sev}'. Valores permitidos: {', '.join(sorted(allowed))}"}), 400
        n["severity"] = sev

    # Validar tags si vienen
    if "tags" in data:
        if not isinstance(data["tags"], list):
            return jsonify({"detail": "El campo 'tags' debe ser una lista"}), 400
        n["tags"] = [str(t).strip() for t in data["tags"]]

    # Actualizar campos simples
    for campo in ("title", "summary", "source", "region", "url"):
        if campo in data:
            n[campo] = str(data[campo]).strip()

    return jsonify(n), 200


# Datos que reflejan lo que usa estadisticas.html
datosGraficaAtaques = {
    "etiquetas": ['Phishing', 'Ransomware', 'Malware', 'DDoS', 'BEC/Fraude', 'Otros'],
    "valores": [39.6, 22, 20, 8, 6, 4.4],
    "año": 2024,
    "totalIncidentes": 493000000,
    "frecuencia": "Un ciberataque cada 39 segundos",
    "fuente": "Techopedia & ExpressVPN Cyber Report 2024",
    "urlFuente": "https://www.techopedia.com/es/estadisticas-ciberseguridad"
}

datosGraficaVulnerabilidades = {
    "meses": ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    "cantidades": [45, 52, 58, 65, 62, 68, 55, 60, 50, 48, 42, 35],
    "año": 2024,
    "totalAnual": 768,
    "incrementoAnual": 20,
    "fuente": "VulnCheck 2024 Report & CISA",
    "urlFuente": "https://blog.segu-info.com.ar/2025/02/analisis-de-las-principales.html"
}

resumenEstadisticas = {
    "totalIncidentes": 493000000,
    "vulnerabilidadesExplotadas": 768,
    "aumentoRansomware": 55,
    "organizacionesAfectadas": 72.7,
    "costoPromedioRansomware": "4.54 millones USD",
    "phishingCorreosDiarios": "3.4 mil millones",
    "porcentajeErrorHumano": 95,
    "fuente": "Múltiples reportes 2024 (ExpressVPN, Sophos, ESET)",
    "urlFuente": "https://www.expressvpn.com/es/blog/the-true-cost-of-cyber-attacks-in-2024-and-beyond/"
}

# CORS simple (desarrollo)
@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,OPTIONS"
    return resp

# Health 
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# Estadísticas (lo que usa estadisticas.html)
@app.route("/stats/ataques", methods=["GET"])
def stats_ataques():
    return jsonify(datosGraficaAtaques), 200

@app.route("/stats/vulnerabilidades", methods=["GET"])
def stats_vulnerabilidades():
    return jsonify(datosGraficaVulnerabilidades), 200

@app.route("/stats/resumen", methods=["GET"])
def stats_resumen():
    return jsonify(resumenEstadisticas), 200

# Manejo de errores
@app.errorhandler(404)
def not_found(_e):
    return jsonify({"error": "Ruta no encontrada."}), 404

@app.errorhandler(405)
def method_not_allowed(_e):
    return jsonify({"error": "Método no permitido en esta ruta."}), 405

@app.errorhandler(500)
def server_error(_e):
    return jsonify({"error": "Error interno del servidor."}), 500

if __name__ == "__main__":
    app.run(debug=True)
