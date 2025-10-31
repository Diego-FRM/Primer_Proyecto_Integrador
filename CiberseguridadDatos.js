

const datosGraficaAtaques = {
  etiquetas: ['Phishing', 'Ransomware', 'Malware', 'DDoS', 'BEC/Fraude', 'Otros'],
  valores: [39.6, 22, 20, 8, 6, 4.4], 
  año: 2024,
  totalIncidentes: 493000000, // 493 millones de ataques en 2023 según Statista
  frecuencia: 'Un ciberataque cada 39 segundos',
  fuente: 'Techopedia & ExpressVPN Cyber Report 2024',
  urlFuente: 'https://www.techopedia.com/es/estadisticas-ciberseguridad'
};

const datosGraficaVulnerabilidades = {
  meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  cantidades: [45, 52, 58, 65, 62, 68, 55, 60, 50, 48, 42, 35], 
  año: 2024,
  totalAnual: 768, // 768 CVEs explotadas en 2024
  incrementoAnual: 20, // 20% más que 2023
  fuente: 'VulnCheck 2024 Report & CISA',
  urlFuente: 'https://blog.segu-info.com.ar/2025/02/analisis-de-las-principales.html'
};

const resumenEstadisticas = {
  totalIncidentes: 493000000, 
  vulnerabilidadesExplotadas: 768, // CVEs explotadas en 2024
  aumentoRansomware: 55, // 55% de aumento en casos de ransomware vs 2023
  organizacionesAfectadas: 72.7, // 72.7% de organizaciones afectadas por ransomware
  costoPromedioRansomware: '4.54 millones USD',
  phishingCorreosDiarios: '3.4 mil millones',
  porcentajeErrorHumano: 95, // 95% de brechas por error humano
  fuente: 'Múltiples reportes 2024 (ExpressVPN, Sophos, ESET)',
  urlFuente: 'https://www.expressvpn.com/es/blog/the-true-cost-of-cyber-attacks-in-2024-and-beyond/'
};

const listaNoticias = [
  {
    id: 1,
    titulo: 'Phishing lidera las ciberamenazas detectadas en 2024',
    descripcion: 'El phishing se consolidó como el ciberataque más frecuente con 39.6% de todos los ataques por correo electrónico. Los ciberdelincuentes utilizan IA para crear mensajes más convincentes.',
    categoria: 'phishing',
    gravedad: 'alta',
    fecha: '2024-12-26',
    fuente: 'ESET Cybersecurity Report 2024',
    url: 'https://www.itdigitalsecurity.es/endpoint/2024/12/las-ciberamenazas-que-han-marcado-2024'
  },
  {
    id: 2,
    titulo: 'Ransomware afecta al 72.7% de organizaciones en 2024',
    descripcion: 'El ransomware se posicionó como la mayor amenaza con costo promedio de recuperación de 4.54 millones de dólares. Aumento del 55% respecto a 2023.',
    categoria: 'ransomware',
    gravedad: 'critica',
    fecha: '2024-08-21',
    fuente: 'ExpressVPN Cyber Report 2024',
    url: 'https://www.expressvpn.com/es/blog/the-true-cost-of-cyber-attacks-in-2024-and-beyond/'
  },
  {
    id: 3,
    titulo: '768 vulnerabilidades CVE fueron explotadas en 2024',
    descripcion: 'VulnCheck reporta un aumento del 20% en CVEs explotadas comparado con 2023. El 23.6% fueron atacadas el mismo día de su divulgación.',
    categoria: 'vulnerabilidad',
    gravedad: 'critica',
    fecha: '2025-02-07',
    fuente: 'VulnCheck & CISA Report',
    url: 'https://blog.segu-info.com.ar/2025/02/analisis-de-las-principales.html'
  },
  {
    id: 4,
    titulo: 'El 90% de violaciones de datos son causadas por phishing',
    descripcion: 'Aproximadamente 3.4 mil millones de correos de phishing se envían diariamente. El 88% de organizaciones enfrentan ataques de spear phishing anualmente.',
    categoria: 'phishing',
    gravedad: 'alta',
    fecha: '2024-10-05',
    fuente: 'Techopedia Statistics 2024',
    url: 'https://www.techopedia.com/es/estadisticas-ciberseguridad'
  },
  {
    id: 5,
    titulo: 'Malware de robo de datos representa el 50% de amenazas a PyMEs',
    descripcion: 'Keyloggers, spyware y stealers dominan los ataques contra pequeñas y medianas empresas. Más del 90% de ciberataques involucraron robo de credenciales.',
    categoria: 'malware',
    gravedad: 'alta',
    fecha: '2024-03-13',
    fuente: 'Sophos Threat Report 2024',
    url: 'https://news.sophos.com/es-es/2024/03/13/los-ataques-de-ransomware-son-la-mayor-amenaza-para-las-pymes-segun-el-informe-de-ciberamenazas-2024-de-sophos/'
  },
  {
    id: 6,
    titulo: '92% de líderes de TI reportan aumento en ciberataques',
    descripcion: 'Según estudio de Keeper Security, los ataques de phishing, malware y ransomware continúan aumentando significativamente en 2024.',
    categoria: 'general',
    gravedad: 'alta',
    fecha: '2024-09-20',
    fuente: 'Keeper Security Study 2024',
    url: 'https://www.keepersecurity.com/blog/es/2024/09/06/are-cyber-attacks-increasing/'
  }
];

const preguntasQuiz = [
  {
    id: 1,
    pregunta: '¿Cuál es la longitud mínima recomendada para una contraseña segura según expertos en 2024?',
    opciones: ['6 caracteres', '8 caracteres', '12 caracteres', '16 caracteres'],
    respuestaCorrecta: 2,
    explicacion: 'Los expertos en ciberseguridad recomiendan usar al menos 12 caracteres con una combinación de letras mayúsculas, minúsculas, números y símbolos especiales.'
  },
  {
    id: 2,
    pregunta: '¿Qué porcentaje de violaciones de datos son causadas por phishing?',
    opciones: ['50%', '70%', '90%', '100%'],
    respuestaCorrecta: 2,
    explicacion: 'Según estadísticas de 2024, el phishing es responsable del 90% de las violaciones de datos, siendo la amenaza más común por correo electrónico.'
  },
  {
    id: 3,
    pregunta: '¿Con qué frecuencia ocurre un ciberataque globalmente?',
    opciones: ['Cada 5 minutos', 'Cada 39 segundos', 'Cada 2 horas', 'Cada día'],
    respuestaCorrecta: 1,
    explicacion: 'Según Statista y Cybersecurity Ventures, en 2024 ocurre un ciberataque cada 39 segundos, lo que suma aproximadamente 493 millones de ataques anuales.'
  },
  {
    id: 4,
    pregunta: '¿Qué porcentaje de las brechas de seguridad son causadas por error humano?',
    opciones: ['25%', '50%', '75%', '95%'],
    respuestaCorrecta: 3,
    explicacion: 'Según Cybint, casi el 95% de las vulnerabilidades aprovechadas por ciberdelincuentes ocurren por errores humanos, no por fallas técnicas.'
  },
  {
    id: 5,
    pregunta: '¿Qué porcentaje de organizaciones fue afectado por ransomware en 2024?',
    opciones: ['30%', '50%', '72.7%', '90%'],
    respuestaCorrecta: 2,
    explicacion: 'El 72.7% de las organizaciones experimentaron ataques de ransomware en 2024, con un costo promedio de recuperación de 4.54 millones de dólares.'
  },
  {
    id: 6,
    pregunta: '¿Cuántos correos de phishing se envían diariamente en el mundo?',
    opciones: ['100 millones', '500 millones', '1.5 mil millones', '3.4 mil millones'],
    respuestaCorrecta: 3,
    explicacion: 'Aproximadamente 3.4 mil millones de correos electrónicos de phishing se envían diariamente, representando el 39.6% de todos los ataques por correo.'
  },
  {
    id: 7,
    pregunta: '¿Cuántas vulnerabilidades CVE fueron explotadas en 2024?',
    opciones: ['250', '500', '768', '1000'],
    respuestaCorrecta: 2,
    explicacion: 'Según VulnCheck y CISA, 768 vulnerabilidades CVE fueron explotadas en 2024, un aumento del 20% respecto a 2023.'
  },
  {
    id: 8,
    pregunta: '¿Qué porcentaje de vulnerabilidades son explotadas el mismo día de su divulgación?',
    opciones: ['5%', '10%', '23.6%', '50%'],
    respuestaCorrecta: 2,
    explicacion: 'El 23.6% de las vulnerabilidades conocidas fueron atacadas el mismo día o antes de su divulgación pública, según el reporte de VulnCheck 2024.'
  }
];

const ejemplosPhishing = [
  {
    id: 1,
    tipo: 'correo',
    esPhishing: true,
    remitente: 'soporte@banortesegur0.com',
    asunto: 'URGENTE: Confirme su cuenta en 24 horas',
    mensaje: 'Estimado cliente, detectamos actividad inusual en su cuenta. Haga clic aquí inmediatamente para verificar: http://banorte-verificacion.xyz/confirmar',
    indicadores: [
      'Dominio sospechoso (0 en lugar de o)',
      'Sentido de urgencia exagerado (24 horas)',
      'Enlace a dominio no oficial (.xyz)',
      'Tácticas de presión emocional'
    ]
  },
  {
    id: 2,
    tipo: 'correo',
    esPhishing: false,
    remitente: 'notificaciones@bbva-oficial.com',
    asunto: 'Resumen mensual de su cuenta',
    mensaje: 'Hola, su resumen mensual está disponible. Puede consultarlo ingresando a su banca en línea con sus credenciales habituales en nuestro sitio oficial.',
    indicadores: [
      'Dominio oficial verificable (.com del banco)',
      'No solicita datos personales directamente',
      'Sin enlaces sospechosos',
      'Tono profesional sin presión'
    ]
  },
  {
    id: 3,
    tipo: 'correo',
    esPhishing: true,
    remitente: 'premios@loteria-nacional.xyz',
    asunto: '¡FELICIDADES! Ganaste $500,000 USD',
    mensaje: 'Has sido seleccionado como ganador de nuestro sorteo. Para reclamar tu premio, envía copia de tu identificación y datos bancarios a este correo.',
    indicadores: [
      'Promesa de dinero sin participar',
      'Solicita información bancaria sensible',
      'Dominio sospechoso (.xyz)',
      'Uso excesivo de mayúsculas'
    ]
  },
  {
    id: 4,
    tipo: 'correo',
    esPhishing: true,
    remitente: 'netflix-renovacion@update-service.com',
    asunto: 'Tu suscripción será cancelada HOY',
    mensaje: 'Tu método de pago fue rechazado. Actualiza tu información aquí: http://netflix-update.com/pay o perderás tu cuenta.',
    indicadores: [
      'Dominio falso (no es netflix.com)',
      'Amenaza de pérdida inmediata de la cuenta',
      'Enlace a sitio no oficial',
      'Presión con fecha límite'
    ]
  },
  {
    id: 5,
    tipo: 'correo',
    esPhishing: false,
    remitente: 'no-reply@accounts.google.com',
    asunto: 'Nuevo inicio de sesión detectado',
    mensaje: 'Detectamos un inicio de sesión desde un nuevo dispositivo. Si fuiste tú, ignora este mensaje. Revisa tu actividad en myaccount.google.com',
    indicadores: [
      'Dominio "oficial" de Google',
      'Informa sin solicitar acción urgente',
      'Enlace verificable "oficial"',
      'Permite ignorar si no hay problema'
    ]
  }
];

const ubicacionesIncidentes = [
  { 
    latitud: 19.4326, 
    longitud: -99.1332, 
    ciudad: 'Ciudad de México', 
    cantidadIncidentes: 1250, 
    tipoAtaque: 'multiple',
    descripcion: 'Mayor concentración: phishing (40%), ransomware (25%), malware (20%)',
    fuente: 'CERT-MX Informe 2024'
  },
  { 
    latitud: 25.6866, 
    longitud: -100.3161, 
    ciudad: 'Monterrey', 
    cantidadIncidentes: 890, 
    tipoAtaque: 'ransomware',
    descripcion: 'Sector industrial más afectado - Aumento 35% vs 2023',
    fuente: 'CERT-MX Informe 2024'
  },
  { 
    latitud: 20.6597, 
    longitud: -103.3496, 
    ciudad: 'Guadalajara', 
    cantidadIncidentes: 760, 
    tipoAtaque: 'phishing',
    descripcion: 'Sector tecnológico objetivo principal de campañas de phishing',
    fuente: 'CERT-MX Informe 2024'
  },
  { 
    latitud: 21.1619, 
    longitud: -86.8515, 
    ciudad: 'Cancún', 
    cantidadIncidentes: 340, 
    tipoAtaque: 'malware',
    descripcion: 'Sector turismo y hotelería - Robo de datos de tarjetas',
    fuente: 'CERT-MX Informe 2024'
  },
  { 
    latitud: 32.5027, 
    longitud: -117.0037, 
    ciudad: 'Tijuana', 
    cantidadIncidentes: 420, 
    tipoAtaque: 'ddos',
    descripcion: 'Ataques DDoS a comercios electrónicos fronterizos',
    fuente: 'CERT-MX Informe 2024'
  },
  { 
    latitud: 31.6904, 
    longitud: -106.4245, 
    ciudad: 'Ciudad Juárez', 
    cantidadIncidentes: 280, 
    tipoAtaque: 'malware',
    descripcion: 'Sector maquilador afectado por stealers y keyloggers',
    fuente: 'CERT-MX Informe 2024'
  }
];

const consejosSeguridad = {
  contraseñas: [
    'Usa al menos 12 caracteres con mayúsculas, minúsculas, números y símbolos',
    'Evita reutilizar contraseñas entre diferentes servicios',
    'Utiliza un gestor de contraseñas verificado (1Password, Keeper)',
    'Activa la autenticación de dos factores (2FA) en todos los servicios',
    'Cambia tus contraseñas cada 3-6 meses o tras alguna sospecha de brecha',
    'No pongas información personal (nombres, fechas, lugares conocidos)'
  ],
  phishing: [
    'Verifica siempre el dominio completo del remitente',
    'Desconfía de urgencias y amenazas (tipo "tu cuenta será bloqueada")',
    'Nunca hagas clic en enlaces de correos sospechosos',
    'Contacta directamente a la empresa por canales oficiales si dudas',
    'Revisa errores ortográficos y gramaticales en mensajes',
    'Pasa el cursor sobre enlaces sin hacer clic para ver la URL real'
  ],
  wifi: [
    'Nunca realices operaciones bancarias con WiFi público',
    'Usa VPN siempre que te conectes a redes públicas',
    'Desactiva la conexión automática a redes WiFi',
    'Verifica el nombre exacto de la red con el establecimiento',
    'Mantén el firewall activo en todos tus dispositivos',
    'Utiliza datos móviles para información sensible'
  ],
  general: [
    'Actualiza tu sistema operativo y aplicaciones inmediatamente',
    'Usa un antivirus reconocido y mantenlo actualizado',
    'Realiza respaldos regulares',
    'Solo descarga software de fuentes oficiales',
    'Revisa los permisos que solicitan las aplicaciones móviles',
    'Infórmate: 95% de brechas son por error humano'
  ]
};

function obtenerNoticiasFiltradas(filtros = {}) {
  let noticiasFiltradas = [...listaNoticias];
  
  if (filtros.categoria) {
    noticiasFiltradas = noticiasFiltradas.filter(n => n.categoria === filtros.categoria);
  }
  
  if (filtros.gravedad) {
    noticiasFiltradas = noticiasFiltradas.filter(n => n.gravedad === filtros.gravedad);
  }
  
  if (filtros.limite) {
    noticiasFiltradas = noticiasFiltradas.slice(0, filtros.limite);
  }
  
  return noticiasFiltradas;
}

function obtenerPreguntaAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * preguntasQuiz.length);
  return preguntasQuiz[indiceAleatorio];
}

function verificarRespuestaQuiz(idPregunta, respuestaUsuario) {
  const pregunta = preguntasQuiz.find(p => p.id === idPregunta);
  if (!pregunta) return null;
  
  return {
    esCorrecta: pregunta.respuestaCorrecta === respuestaUsuario,
    respuestaCorrecta: pregunta.respuestaCorrecta,
    explicacion: pregunta.explicacion
  };
}

function obtenerEjemploPhishingAleatorio() {
  const indiceAleatorio = Math.floor(Math.random() * ejemplosPhishing.length);
  return ejemplosPhishing[indiceAleatorio];
}

function verificarRespuestaPhishing(idEjemplo, respuestaUsuario) {
  const ejemplo = ejemplosPhishing.find(e => e.id === idEjemplo);
  if (!ejemplo) return null;
  
  return {
    esCorrecta: ejemplo.esPhishing === respuestaUsuario,
    esPhishing: ejemplo.esPhishing,
    indicadores: ejemplo.indicadores
  };
}

const fuentes = {
  principal: [
    {
      nombre: 'Techopedia - Estadísticas Ciberseguridad 2024',
      url: 'https://www.techopedia.com/es/estadisticas-ciberseguridad',
      fecha: 'Octubre 2024'
    },
    {
      nombre: 'ExpressVPN - The True Cost of Cyber Attacks',
      url: 'https://www.expressvpn.com/es/blog/the-true-cost-of-cyber-attacks-in-2024-and-beyond/',
      fecha: 'Agosto 2024'
    },
    {
      nombre: 'VulnCheck & CISA - Análisis Vulnerabilidades 2024',
      url: 'https://blog.segu-info.com.ar/2025/02/analisis-de-las-principales.html',
      fecha: 'Febrero 2025'
    },
    {
      nombre: 'Sophos Threat Report 2024',
      url: 'https://news.sophos.com/es-es/2024/03/13/',
      fecha: 'Marzo 2024'
    },
    {
      nombre: 'ESET - Las ciberamenazas que han marcado 2024',
      url: 'https://www.itdigitalsecurity.es/endpoint/2024/12/las-ciberamenazas-que-han-marcado-2024',
      fecha: 'Diciembre 2024'
    },
    {
      nombre: 'Kaspersky Security Bulletin Q1 2024',
      url: 'https://securelist.lat/vulnerability-report-q1-2024/98677/',
      fecha: 'Mayo 2024'
    }
  ],
  oficiales: [
    {
      nombre: 'CERT-MX (México)',
      url: 'https://www.gob.mx/cert',
      descripcion: 'Centro Nacional de Respuesta a Incidentes Cibernéticos'
    },
    {
      nombre: 'CISA (USA)',
      url: 'https://www.cisa.gov/',
      descripcion: 'Cybersecurity and Infrastructure Security Agency'
    },
    {
      nombre: 'CVE Program',
      url: 'https://cve.org/',
      descripcion: 'Common Vulnerabilities and Exposures'
    }
  ]
};