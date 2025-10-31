from flask import Flask, jsonify, request
from datetime import datetime

app = Flask(__name__)

# -------- Datos en memoria --------
usuarios = [
    {
        "id": 100001,
        "nombre": "Alice",
        "email": "alice@example.com",
        "rol": "admin",
        "esActivo": True,
        "telefono": "+52-55-1111-2222",
        "tags": ["seguridad", "propietario"],
        "fechaCreacion": "2025-10-01",
        "ultimoAcceso": "2025-10-25"
    },
    {
        "id": 100002,
        "nombre": "Bob",
        "email": "bob@example.com",
        "rol": "editor",
        "esActivo": True,
        "telefono": "+52-33-1234-5678",
        "tags": ["redactor"],
        "fechaCreacion": "2025-10-05",
        "ultimoAcceso": "2025-10-26"
    }
]

# --- Noticias falsas ---
NEWS = [
    {
        "id": 101,
        "title": "Campaña masiva de phishing bancario en MX",
        "summary": "Se detectaron correos falsos suplantando bancos populares. Evita dar clic en enlaces y verifica el remitente.",
        "severity": "high",  # low | medium | high | critical
        "source": "CERT-MX",
        "tags": ["phishing", "banca", "email"],
        "region": "MX",
        "url": "https://example.com/alerta/101"
    },
    {
        "id": 102,
        "title": "Parche urgente corrige 0-day en navegador",
        "summary": "Actualiza hoy: el fallo permite ejecución remota de código al visitar sitios maliciosos.",
        "severity": "critical",
        "source": "Vendor",
        "tags": ["actualización", "navegador"],
        "region": "GLOBAL",
        "url": "https://example.com/alerta/102"
    },
    {
        "id": 103,
        "title": "Ataques de ransomware a hospitales",
        "summary": "Varios centros médicos reportan cifrado de datos. Respaldos offline y segmentación son clave.",
        "severity": "high",
        "source": "ISAC Salud",
        "tags": ["ransomware", "salud", "respaldo"],
        "region": "MX",
        "url": "https://example.com/alerta/103"
    },
    {
        "id": 104,
        "title": "Malware móvil roba credenciales",
        "summary": "Apps de terceros recolectan tokens de sesión. Evita APKs fuera de tiendas oficiales.",
        "severity": "medium",
        "source": "Laboratorio AV",
        "tags": ["malware", "android", "credenciales"],
        "region": "GLOBAL",
        "url": "https://example.com/alerta/104"
    },
    {
    "id": 105,
    "title": "Filtración de datos en plataforma de videojuegos",
    "summary": "Una brecha de seguridad expuso correos y contraseñas de miles de usuarios. Se recomienda cambiar las credenciales y activar la autenticación en dos pasos.",
    "severity": "high",
    "source": "GamerSec Labs",
    "tags": ["filtración", "videojuegos", "contraseñas"],
    "region": "GLOBAL",
    "url": "https://example.com/alerta/105"
    },
    {
    "id": 106,
    "title": "Nueva campaña de smishing suplanta a empresas de paquetería",
    "summary": "Mensajes SMS con links falsos piden pago de aduanas para liberar paquetes. Recomendación: no abrir enlaces ni proporcionar datos.",
    "severity": "medium",
    "source": "CERT-MX",
    "tags": ["smishing", "paquetería", "ingeniería social"],
    "region": "MX",
    "url": "https://example.com/alerta/106"
    },
    {
    "id": 107,
    "title": "Backdoor en plugin de CMS afecta a tiendas en línea",
    "summary": "Un plugin popular fue comprometido e inyecta código para robar datos de tarjeta. Se sugiere desactivar el plugin y cambiar credenciales.",
    "severity": "critical",
    "source": "Vendor",
    "tags": ["ecommerce", "plugin", "backdoor", "credenciales"],
    "region": "GLOBAL",
    "url": "https://example.com/alerta/107"
    }
]

# --- Endpoints de noticias ---

# Lista completa (sin paginación ni ordenamiento)
@app.route("/api/news", methods=["GET"])
def list_news():
    return jsonify(NEWS)

# Obtener una sola noticia por id
@app.route("/api/news/<int:nid>", methods=["GET"])
def get_news(nid: int):
    n = next((x for x in NEWS if x["id"] == nid), None)
    if not n:
        return jsonify({"detail": "News not found"}), 404
    return jsonify(n)

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

# -------- CORS simple (desarrollo) --------
@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    resp.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return resp

# -------- Utilidades --------
# Genera el siguiente id secuencial.
def _siguiente_id():
    return max((u["id"] for u in usuarios), default=100002) + 1

# Busca un usuario por id.
def _buscar_usuario(uid: int):
    for u in usuarios:
        if u["id"] == uid:
            return u
    return None

# Valida campos requeridos y formatos básicos.
def _validar_usuario(payload: dict, parcial: bool = False):
    if not isinstance(payload, dict):
        return False, "Cuerpo inválido; se esperaba JSON."
    if not parcial:
        if "nombre" not in payload or not str(payload["nombre"]).strip():
            return False, "Falta 'nombre' (texto no vacío)."
        if "email" not in payload or "@" not in str(payload["email"]):
            return False, "Falta 'email' válido."
    if "nombre" in payload and not str(payload["nombre"]).strip():
        return False, "'nombre' debe ser texto no vacío."
    if "email" in payload and "@" not in str(payload["email"]):
        return False, "'email' inválido."

    def _valida_fecha(v):
        return isinstance(v, str) and len(v) == 10 and v[4] == "-" and v[7] == "-"
    for campo in ("fechaCreacion", "ultimoAcceso"):
        if campo in payload and not _valida_fecha(payload[campo]):
            return False, f"'{campo}' debe tener formato AAAA-MM-DD."
    return True, None

# -------- Health --------
# Devuelve estado del servicio.
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# -------- Usuarios (para index/estadísticas si se conectan a /users) --------
# Lista todos los usuarios.
@app.route("/users", methods=["GET"])
def get_users():
    return jsonify(usuarios), 200

# Devuelve un usuario por id.
@app.route("/users/<int:user_id>", methods=["GET"])
def get_user_by_id(user_id: int):
    u = _buscar_usuario(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify(u), 200

# Crea un nuevo usuario.
@app.route("/users", methods=["POST"])
def add_user():
    if not request.is_json:
        return jsonify({"error": "Content-Type debe ser application/json"}), 415
    payload = request.get_json(silent=True)
    ok, msg = _validar_usuario(payload, parcial=False)
    if not ok:
        return jsonify({"error": msg}), 422

    nuevo_id = payload.get("id", _siguiente_id())
    if any(u["id"] == nuevo_id for u in usuarios):
        return jsonify({"error": "El id ya existe."}), 409

    nuevo = {
        "id": nuevo_id,
        "nombre": payload["nombre"].strip(),
        "email": payload["email"],
        "rol": payload.get("rol", "viewer"),
        "esActivo": bool(payload.get("esActivo", True)),
        "telefono": payload.get("telefono"),
        "tags": payload.get("tags", []),
        "fechaCreacion": payload.get("fechaCreacion"),
        "ultimoAcceso": payload.get("ultimoAcceso")
    }
    usuarios.append(nuevo)
    return jsonify(nuevo), 201

# Actualiza campos de un usuario por id.
@app.route("/users/<int:user_id>", methods=["PUT"])
def update_user(user_id: int):
    if not request.is_json:
        return jsonify({"error": "Content-Type debe ser application/json"}), 415
    u = _buscar_usuario(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado."}), 404

    payload = request.get_json(silent=True)
    ok, msg = _validar_usuario(payload, parcial=True)
    if not ok:
        return jsonify({"error": msg}), 422

    if "nombre" in payload:
        u["nombre"] = payload["nombre"].strip()
    if "email" in payload:
        u["email"] = payload["email"]
    if "rol" in payload:
        u["rol"] = payload["rol"]
    if "esActivo" in payload:
        u["esActivo"] = bool(payload["esActivo"])
    if "telefono" in payload:
        u["telefono"] = payload["telefono"]
    if "tags" in payload:
        u["tags"] = payload["tags"]
    if "fechaCreacion" in payload:
        u["fechaCreacion"] = payload["fechaCreacion"]
    if "ultimoAcceso" in payload:
        u["ultimoAcceso"] = payload["ultimoAcceso"]
    return jsonify(u), 200

# Elimina un usuario por id.
@app.route("/users/<int:user_id>", methods=["DELETE"])
def delete_user(user_id: int):
    u = _buscar_usuario(user_id)
    if not u:
        return jsonify({"error": "Usuario no encontrado."}), 404
    usuarios.remove(u)
    return "", 204

# -------- Estadísticas (lo que usa estadisticas.html) --------
# Devuelve estructura de ataques por categoría.
@app.route("/stats/ataques", methods=["GET"])
def stats_ataques():
    return jsonify(datosGraficaAtaques), 200

# Devuelve estructura de vulnerabilidades por mes.
@app.route("/stats/vulnerabilidades", methods=["GET"])
def stats_vulnerabilidades():
    return jsonify(datosGraficaVulnerabilidades), 200

# Devuelve resumen general (tarjetas y totales).
@app.route("/stats/resumen", methods=["GET"])
def stats_resumen():
    return jsonify(resumenEstadisticas), 200

# -------- Manejo de errores --------
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
