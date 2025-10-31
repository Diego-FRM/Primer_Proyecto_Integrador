# CyberSafe Portal

## 1. Resumen del producto

**CyberSafe Portal** es una aplicación web educativa enfocada en concientizar sobre seguridad informática.  
El proyecto enseña buenas prácticas digitales, conceptos de ciberseguridad y prevención de amenazas mediante una interfaz moderna e interactiva.

El sistema está compuesto por dos partes principales:

- **Backend (Flask / Python):** API REST local que sirve datos de seguridad, alertas y estadísticas.  
- **Frontend (HTML / JS / Bootstrap):** Interfaz que consume la API y permite la interacción con el usuario.

El portal incluye tres áreas clave:
1. **Educación:** guías sobre contraseñas, phishing y redes seguras.  
2. **Datos interactivos:** estadísticas visualizadas con Chart.js.  
3. **Evaluación:** quiz educativo para reforzar conocimientos.

---

## 2. Instrucciones para levantar el frontend

El **frontend** corresponde a la parte visual del proyecto.  
Está desarrollado con HTML, CSS, JavaScript y Bootstrap, e incluye integración con Chart.js para las gráficas.

### Archivos principales
- `index.html` — página de inicio.  
- `alertas.html` — consume la API Flask (`/api/news`).  
- `Estadisticas.html` — muestra gráficas interactivas.  
- `quiz.html` — cuestionario de evaluación.

### Requisitos previos
- Tener **Python 3** instalado.  
- Tener el **backend ejecutándose** con el comando:
  ```bash
  python main.py
  ```
- Usar un **navegador moderno** (Chrome o Edge).  
- (Opcional) Tener **Visual Studio Code** con la extensión *Live Server*.

### Método 1 — Usando Live Server (recomendado)
1. Abre el proyecto en Visual Studio Code.  
2. Instala la extensión **Live Server** (autor: Ritwick Dey).  
3. Haz clic derecho sobre `index.html` → **Open with Live Server**.  
4. El sitio se abrirá en:
   ```
   http://127.0.0.1:5500/index.html
   ```
5. Navega por las secciones: Inicio, Alertas, Estadísticas y Quiz.

> **Nota:** antes de abrir `alertas.html`, asegúrate de que el backend Flask esté ejecutándose en el puerto `5000`.

### Método 2 — Servidor HTTP de Python
1. Abre una terminal en la carpeta raíz del proyecto.  
2. Ejecuta:
   ```bash
   python -m http.server 5500
   ```
3. Abre en el navegador:
   ```
   http://127.0.0.1:5500/index.html
   ```

---

## 3. Instrucciones para levantar el backend

El **backend** está implementado en **Flask (Python)** y sirve como API REST local.  
Permite la comunicación con el frontend mediante endpoints configurados.

### Requisitos
- Tener **Python 3.8+** instalado.  
- Instalar las dependencias del archivo `requirements.txt`:
  ```bash
  pip install -r requirements.txt
  ```

### Ejecución
1. Desde la terminal, ejecuta:
   ```bash
   python main.py
   ```
2. Si todo funciona, verás:
   ```
   * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
   ```
3. Para verificar el estado del servidor:
   [https://cybersafe-api.onrender.com/health](https://cybersafe-api.onrender.com/health)

### Endpoints principales
- `GET /api/news` — obtiene todas las noticias.  
- `POST /api/news` — crea una nueva alerta.  
- `PUT /api/news/<id>` — actualiza una alerta existente.  
- `GET /stats/ataques` — estadísticas de ataques.  
- `GET /stats/vulnerabilidades` — vulnerabilidades CVE.  
- `GET /stats/resumen` — resumen genrl.

---
## 4. requirements.txt

El archivo `requirements.txt` contiene las dependencias necesarias para ejecutar el backend Flask.

```
Flask==3.1.0
Werkzeug==3.1.3
gunicorn==21.2.0
```

Instala los paquetes con:
```bash
pip install -r requirements.txt
```

---

## 5. Verificación general del sistema

| Componente | Tipo | Depende de | Estado esperado |
|-------------|------|------------|-----------------|
| `index.html` | Frontend | Ninguno | Página informativa. |
| `alertas.html` | Frontend | Backend Flask | Muestra alertas dinámicas. |
| `Estadisticas.html` | Frontend | Datos locales | Gráficas con Chart.js. |
| `quiz.html` | Frontend | Ninguno | Cuestionario funcional. |
| `main.py` | Backend | Flask | API funcional. |


### Pasos para prueba
1. Ejecuta el backend con `python main.py`.  
2. Levanta el frontend con Live Server o `python -m http.server`.  
3. Abre `alertas.html` para comprobar la comunicación con la API.  
4. Navega por el resto de las páginas para verificar el funcionamiento general.

**CyberSafe Portal** cumple con los requerimientos del proyecto al integrar un backend funcional con un frontend educativo.  
La arquitectura está diseñada para ejecutarse localmente y demostrar la interacción entre cliente y servidor mediante API REST.

---

## 6. Link del cliente

```
https://diego-frm.github.io/Primer_Proyecto_Integrador/index.html
```
---

# Primer Proyecto Integrador
Primer Proyecto Integrador de la materia Introducción al Desarrollo Web Otoño 2025.
Integrantes del equipo:
- Diego Federico Romero Miravete
![Foto](IMG/Foto_Diego_Federico.jpg)

- Abel Benito Carrasco Hernandez
![Foto](IMG/FotoBenito.jpg)

- Emiliano Sebastián Millán Giffard
![IMG_5625](https://github.com/user-attachments/assets/31d8f2a3-c30f-4649-88d8-fdab995f0d8f)

- Emilio González Acosta
![Foto](IMG/img.jpg)
