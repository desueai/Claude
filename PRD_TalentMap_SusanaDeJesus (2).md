# PRD — Intentional Career Path · Talent Map & Career Development
**Autor:** Susana De Jesús  
**Marca:** Intentional Career Path  
**Handle:** @intentional_careerpath  
**Versión:** 1.2  
**Fecha:** Junio 2026  
**Para:** Claude Code

---

## 1. Visión general

Una plataforma web pública de una sola página (con scroll por secciones) bajo la marca **Intentional Career Path** que ayuda tanto a **profesionales individuales** como a **líderes y equipos de RRHH** a entender los tres grandes caminos de carrera (Liderazgo, Project Manager y Especialista), diagnosticar su posición actual y acceder a material de desarrollo curado. La plataforma es la presencia digital y la marca personal de Susana De Jesús como experta en talento y desarrollo de carrera.

---

## 2. Audiencia objetivo

| Segmento | Necesidad principal |
|---|---|
| Profesional individual | Claridad sobre qué path seguir y cómo desarrollarse |
| Líder / Manager | Mapear el talento de su equipo y guiar conversaciones de carrera |
| RRHH | Marco de referencia para evaluaciones y planes de desarrollo |

---

## 3. Stack tecnológico recomendado

- **Framework:** React (Vite) o Next.js (preferible para SEO)
- **Estilos:** Tailwind CSS
- **Idiomas:** Español (primario) + Inglés (secundario) — i18n con `react-i18next`
- **Formulario de contacto:** Formspree o EmailJS (sin backend propio)
- **Hosting:** Vercel o Netlify
- **Sin base de datos ni autenticación en v1**

---

## 4. Identidad visual

### Paleta de colores
```
--color-primary:    #6366F1   /* Indigo vibrante — path liderazgo */
--color-secondary:  #F59E0B   /* Ámbar — path project manager */
--color-accent:     #10B981   /* Esmeralda — path especialista */
--color-dark:       #0F172A   /* Slate 900 — textos y fondos oscuros */
--color-light:      #F8FAFC   /* Slate 50 — fondos claros */
--color-surface:    #FFFFFF   /* Blanco — tarjetas */
```

### Tipografía
- **Display / Headlines:** `Plus Jakarta Sans` — peso 700–800
- **Body:** `Inter` — peso 400–500
- **Labels / Badges:** `Inter` — peso 600, uppercase con letter-spacing

### Estilo general
- Moderno y colorido, con cards con bordes suaves (`border-radius: 16px`)
- Gradientes sutiles en heroes y separadores de sección
- Iconografía: Lucide React o Heroicons (outline)
- Animaciones suaves al hacer scroll (Intersection Observer o Framer Motion ligero)
- Totalmente responsive — mobile-first

---

## 5. Arquitectura de secciones

La web es una **Single Page Application** con navegación por anclas (`#section`). Las secciones en orden:

```
1.  Navbar fija
2.  Hero
3.  ¿Qué es un Talent Map? (Sobre el framework)
4.  Los tres career paths
5.  Comparativa de competencias
6.  Herramientas de diagnóstico
7.  Guías y material de desarrollo
8.  Talent Map visual interactivo
9.  Plan de desarrollo (roadmap 90 días)
10. Calculadora de brecha de competencias   <- NUEVA
11. Historias de carrera                    <- NUEVA
12. Plan IA-personalizado (Claude API)      <- NUEVA
13. Newsletter                              <- NUEVA
14. Blog / Reflexiones
15. Sobre Susana
16. Formulario de contacto
17. Footer
```

---

## 6. Especificación detallada de secciones

---

### 6.1 Navbar fija

**Comportamiento:** Fija en la parte superior, cambia de transparente a blanco/dark con blur al hacer scroll.

**Contenido:**
- Logo / nombre de marca **"Intentional Career Path"** a la izquierda (con tagline opcional: "by Susana De Jesús")
- Links de navegación: Inicio · Paths · Diagnóstico · Recursos · Blog · Contacto
- Selector de idioma: `ES | EN` (toggle simple)
- CTA button: "Hacer diagnóstico" → ancla a sección #diagnostico

---

### 6.2 Hero section

**Objetivo:** Capturar la atención inmediatamente y comunicar el valor central.

**Contenido:**
- Headline principal (ES): *"Tu carrera, con intención. Tu camino, con claridad."*
- Headline principal (EN): *"Your career, with intention. Your path, with clarity."*
- Subtítulo: breve descripción del framework (2–3 líneas)
- Dos CTAs primarios:
  - "Hacer mi diagnóstico" → `#diagnostico`
  - "Ver los paths de carrera" → `#paths`
- Elemento visual: ilustración o animación SVG con los tres paths representados como ramas de un árbol o caminos que se bifurcan
- Badge / indicador de audiencia dual: "Para profesionales · Para líderes de equipo"

**Diseño:**
- Fondo con gradiente sutil de `--color-dark` a un azul-morado profundo
- Texto en blanco
- Cards flotantes sutiles que animen en entry

---

### 6.3 ¿Qué es un Talent Map?

**Objetivo:** Dar contexto del framework antes de profundizar.

**Contenido:**
- Título de sección
- Párrafo explicativo del concepto de Talent Map (qué es, para qué sirve, por qué importa)
- 3 tarjetas de beneficios clave:
  - Para ti como profesional
  - Para ti como líder
  - Para tu organización
- Stat decorativa opcional: "X profesionales han usado este framework" (si aplica)

---

### 6.4 Los tres career paths

**Objetivo:** Que el usuario entienda claramente las tres grandes rutas y se reconozca en alguna.

**Paths:**
1. **Liderazgo** (color: `--color-primary` indigo)
2. **Project Manager** (color: `--color-secondary` ámbar)
3. **Especialista** (color: `--color-accent` esmeralda)

**Contenido por path:**
- Icono representativo
- Nombre del path
- Descripción en 2–3 líneas: qué hace, qué mueve, en qué brilla
- Lista de 4–5 señales / rasgos clave ("Eres de este path si...")
- Competencias principales (lista)
- Ejemplo de roles típicos

**Diseño:**
- 3 cards grandes en grid (1 columna en mobile, 3 en desktop)
- Color accent en borde superior o fondo muy suave de cada card
- Hover: ligera elevación y resaltado del borde

---

### 6.5 Comparativa de competencias

**Objetivo:** Mostrar las diferencias entre los tres paths de forma visual y clara.

**Contenido:**
- Título: "¿En qué se diferencian?"
- Tabla comparativa o visual de radar/spider chart con las dimensiones:
  - Orientación a personas
  - Orientación a procesos
  - Orientación a expertise técnico
  - Pensamiento estratégico
  - Gestión de ambigüedad
  - Influencia sin autoridad
- Descripción debajo de cada dimensión
- Nota aclaratoria: "Los paths no son excluyentes — puedes combinar competencias"

**Opciones de implementación:**
- Opción A: Tabla HTML estilizada con barras de progreso por color
- Opción B: Radar chart con Recharts o Chart.js (una línea por path)
- **Recomendado: Opción B** (más visual e impactante)

---

### 6.6 Herramientas de diagnóstico

**Objetivo:** Dar al usuario una forma de conocer su perfil actual.

**Herramienta A — Quiz de autoevaluación (interactiva)**
- 10–15 preguntas de opción múltiple
- Lógica de puntuación por path (indigo/ámbar/esmeralda)
- Al terminar: resultado con el path dominante + segundo path
- Resultado muestra:
  - Nombre del perfil (ej: "Líder con alma de especialista")
  - Descripción personalizada
  - Competencias a desarrollar
  - CTA: "Ver mi plan de 90 días" → `#plan`

**Herramienta B — Checklist de competencias (estática / descargable)**
- Una checklist visual por path
- El usuario puede marcarla en pantalla o descargarla en PDF
- Formato: lista con checkboxes agrupados por área de competencia

**Diseño:**
- Tabs o cards para elegir entre las dos herramientas
- Quiz: paso a paso con barra de progreso superior
- Resultado del quiz: card grande con animación de entrada y color del path dominante

---

### 6.7 Guías y material de desarrollo

**Objetivo:** Biblioteca de recursos curada y organizada por path y nivel.

**Estructura:**
- Filtros: [Todos] [Liderazgo] [Project Manager] [Especialista]
- Sub-filtro: [Libros] [Cursos] [Artículos] [Templates] [Podcasts]
- Grid de cards de recursos

**Card de recurso:**
- Icono del tipo (libro, video, artículo)
- Título del recurso
- Breve descripción (2 líneas)
- Badge de path (color)
- Badge de nivel: Básico / Intermedio / Avanzado
- Link: interno (contenido propio) o externo (recurso curado)
- Tag "Susana recomienda" para los más destacados

**Nota técnica:** El contenido de recursos se manejará como un array JSON estático en v1 (sin CMS). Fácil de ampliar.

---

### 6.8 Talent Map visual interactivo

**Objetivo:** Que el usuario vea visualmente su posición en el mapa y su potencial de desarrollo.

**Funcionalidad:**
- Matriz 2x2 o mapa de posicionamiento con ejes: `Impacto ↑` vs `Alcance →`
- El usuario puede posicionarse en el mapa seleccionando su nivel actual
- Los tres paths están representados como zonas del mapa con colores
- Muestra la "distancia" entre la posición actual y los paths disponibles
- Botón: "Guardar mi posición" (puede ser solo visual, sin persistencia en v1)

**Alternativa simplificada:** Diagrama SVG estático estilizado con zonas y descripciones hover.

---

### 6.9 Plan de desarrollo — Roadmap 90 días

**Objetivo:** Convertir el diagnóstico en acción concreta.

**Contenido:**
- Después del quiz, se genera un roadmap visual de 3 meses
- Estructura: Mes 1 / Mes 2 / Mes 3
- Cada mes tiene: Enfoque principal + 3 acciones concretas + 1 recurso recomendado
- El contenido del roadmap varía según el resultado del quiz (path dominante)
- CTA: "Descargar mi plan" (PDF generado en browser con `jsPDF` o simplemente `window.print`)

**Nota:** En v1 los roadmaps son contenido estático predefinido por path. En v2 podría conectarse con IA para personalizarlo.

---

### 6.10 Blog / Reflexiones

**Objetivo:** Publicar artículos de Susana sobre liderazgo, talento y carrera para posicionamiento de autoridad.

**Estructura:**
- Grid de artículos: 3 columnas desktop, 1 columna mobile
- Card por artículo:
  - Imagen de banner (la que el autor sube)
  - Categoría / etiqueta con color
  - Título del artículo
  - Fecha de publicación
  - Tiempo de lectura estimado
  - Extracto de 2 líneas
  - "Leer más" →

**Campos de metadata por artículo (para el input form que pediste):**
- `autor` (default: Susana De Jesús)
- `fecha`
- `titulo`
- `imagen_banner` (URL o upload)
- `etiquetas` (multi-select: Liderazgo, PM, Especialista, Equipos, Carrera)
- `estilo_escritura` (Reflexivo / Práctico / Inspiracional / Educativo)
- `idioma` (ES / EN / Ambos)
- `extracto`
- `contenido` (rich text)

**Implementación v1:** Artículos como objetos JSON en un archivo `posts.js`. Para publicar, Susana edita ese archivo (o Claude Code lo hace). En v2: headless CMS (Contentful, Sanity, o Notion como backend).

**Página de artículo individual (`/blog/[slug]`):**
- Hero con imagen de banner
- Metadata (autor, fecha, etiquetas, tiempo lectura)
- Contenido en rich text con tipografía editorial
- Sección "Artículos relacionados" al final

---

### 6.11 Sobre Susana

**Objetivo:** Humanizar la plataforma, generar confianza y mostrar la experiencia detrás del framework.

**Contenido:**
- Foto de Susana (profesional)
- Headline: ej. "Soy Susana De Jesús y creo que el talento necesita dirección, no solo motivación."
- Bio en 3–4 párrafos: quién es, de dónde viene, por qué creó este framework
- Puntos destacados / credenciales (años de experiencia, sectores, logros)
- "Mi filosofía": 2–3 principios que guían su trabajo
- CTA: "Conectar en LinkedIn" + "Escribirme"

---

### 6.12 Formulario de contacto

**Objetivo:** Canal directo para consultas, colaboraciones y solicitudes.

**Campos:**
- Nombre completo (requerido)
- Email (requerido)
- Tipo de consulta: [Consultoría individual] [Taller de equipo] [Colaboración] [Otro]
- Mensaje (requerido, min 20 caracteres)
- Checkbox: "Acepto recibir contenido de Intentional Career Path" (GDPR / buenas prácticas)

**Comportamiento:**
- Validación en tiempo real
- Submit: envío vía Formspree o EmailJS (sin backend)
- Estado de éxito: mensaje de confirmación en pantalla
- Estado de error: mensaje claro con instrucción de qué hacer

---

### 6.13 Footer

**Contenido:**
- Logo / Nombre de marca: **Intentional Career Path**
- Subtítulo: "by Susana De Jesús"
- Tagline: "Tu carrera, con intención."
- Links de navegación rápida
- Redes sociales:
  - LinkedIn: `linkedin.com/in/susana-de-jesus`
  - Instagram: `@intentional_careerpath` → `instagram.com/intentional_careerpath`
- Idioma: selector ES | EN
- Copyright: © 2026 Intentional Career Path · Susana De Jesús. Todos los derechos reservados.
- Links legales: Política de privacidad · Términos de uso (placeholder en v1)

**Dominio sugerido:** `intentionalcareerpath.com` o `intentional-careerpath.com`

---

## 7. Internacionalización (i18n)

- **Librería:** `react-i18next`
- **Estructura de archivos:**
  ```
  /locales
    /es
      common.json
      paths.json
      blog.json
    /en
      common.json
      paths.json
      blog.json
  ```
- El idioma por defecto es Español
- El selector de idioma persiste en `localStorage`
- Las URLs pueden ser: `/es/...` y `/en/...` (si se usa Next.js con i18n routing)

---

## 8. Estructura de archivos del proyecto

```
/src
  /components
    /layout
      Navbar.jsx
      Footer.jsx
    /sections
      Hero.jsx
      WhatIsTalentMap.jsx
      CareerPaths.jsx
      CompetenciesComparison.jsx
      DiagnosticTools.jsx
      ResourceLibrary.jsx
      TalentMapVisual.jsx
      DevelopmentPlan.jsx
      GapCalculator.jsx        <- NUEVA
      CareerStories.jsx        <- NUEVA
      AIPlan.jsx               <- NUEVA
      Newsletter.jsx           <- NUEVA
      Blog.jsx
      AboutSusana.jsx
      ContactForm.jsx
    /ui
      Button.jsx
      Card.jsx
      Badge.jsx
      ProgressBar.jsx
      RadarChart.jsx
      Quiz.jsx
      Checklist.jsx
      Timeline.jsx             <- NUEVA (para historias de carrera)
  /data
    posts.js                   <- artículos del blog como JSON
    resources.js               <- biblioteca de recursos
    quizQuestions.js           <- preguntas del diagnóstico
    roadmaps.js                <- planes de 90 días por path (estáticos)
    competencyMatrix.js        <- NUEVO: matriz de competencias por path y rol
    careerStories.js           <- NUEVO: historias de carrera
  /locales
    /es / /en
  /styles
    globals.css
    tokens.css
  /pages (si Next.js)
    index.jsx
    blog/[slug].jsx
/api (Vercel Edge Functions o Netlify Functions)
  generate-plan.js             <- NUEVO: proxy serverless para Claude API
```

---

## 9. Comportamientos y lógica clave

### Quiz de diagnóstico
```
- 12 preguntas, cada una tiene 3 opciones (A=Liderazgo, B=PM, C=Especialista)
- Al terminar: contar respuestas por categoría
- Path dominante = categoría con más respuestas
- Si hay empate → mostrar perfil híbrido
- Resultado: persiste en sessionStorage para mostrarse en sección #plan
```

### Filtrado de recursos
```
- Estado en React: [activePathFilter, activeTypeFilter]
- Los recursos se filtran en tiempo real sin recarga
- Si no hay resultados: mensaje "No hay recursos para este filtro aún"
```

### Cambio de idioma
```
- Toggle ES | EN en Navbar y Footer
- Cambia el idioma de toda la UI con i18next
- Persiste en localStorage
- No recarga la página (SPA)
```

---

## 10. Secciones adicionales — incluidas en v1

---

### 10.1 Calculadora de brecha de competencias  (`#brecha`)

**Objetivo:** Mostrar al usuario exactamente qué competencias necesita desarrollar para transitar de su situación actual a un path objetivo.

**Flujo de usuario:**
1. El usuario selecciona su **rol actual** (dropdown o cards: Profesional individual / Líder de equipo / Especialista técnico / Otro)
2. El usuario selecciona el **path al que aspira** (Liderazgo / Project Manager / Especialista)
3. La herramienta calcula y muestra el **GAP de competencias** en tiempo real

**Output visual:**
- Lista de competencias requeridas para el path objetivo, organizadas en tres grupos:
  - ✅ **Ya tienes** — competencias que el rol actual comparte con el path objetivo
  - 🔶 **En desarrollo** — competencias parciales o relacionadas
  - 🔴 **Por desarrollar** — competencias nuevas necesarias
- Barra de progreso general: "Estás al X% de distancia de este path"
- CTA: "Ver recursos para cerrar esta brecha" → filtra automáticamente la biblioteca de recursos por las competencias faltantes

**Lógica técnica:**
```
- competencyMatrix: objeto JS que define el nivel requerido (0–3) de cada competencia por path
- rolActual: mapea al nivel actual estimado de cada competencia (0–3)
- GAP = competencyMatrix[pathObjetivo][competencia] - rolActual[competencia]
- Si GAP <= 0: "Ya tienes" | Si GAP == 1: "En desarrollo" | Si GAP >= 2: "Por desarrollar"
- Datos en /data/competencyMatrix.js
```

**Diseño:**
- Interfaz de dos pasos: selección → resultado
- Resultado con barras de color por estado (verde / ámbar / rojo)
- Botón "Recalcular" para probar otro path sin recargar

---

### 10.2 Historias de carrera  (`#historias`)

**Objetivo:** Generar inspiración y credibilidad a través de casos reales o representativos de personas que transitaron entre paths.

**Contenido:**
- 3–5 historias curadas (pueden ser reales con permiso, o arquetipos representativos)
- Cada historia tiene:
  - Nombre y foto (o avatar ilustrado si es arquetipo)
  - Rol de origen y path de destino
  - Timeline visual horizontal de la transición (3–5 hitos clave)
  - Cita destacada de la persona
  - Competencia clave que desbloqueó el cambio
  - Badge del path de destino con color

**Diseño:**
- Carrusel o scroll horizontal de cards en mobile
- En desktop: grid de 2–3 historias visibles con "Ver todas" expandible
- Timeline dentro de cada card: línea horizontal con puntos y fechas
- Color del card determinado por el path de destino

**Datos:**
- Historias como array en `/data/careerStories.js`
- Campos: `nombre`, `avatar`, `rolOrigen`, `pathDestino`, `hitos[]`, `cita`, `competenciaClave`

---

### 10.3 Plan IA-personalizado  (`#plan-ia`)

**Objetivo:** Generar un plan de desarrollo personalizado con IA (Claude API) basado en el perfil, diagnóstico y brecha del usuario.

**Flujo de usuario:**
1. El usuario llega aquí después de completar el quiz y/o la calculadora de brecha
2. Ve un resumen de su perfil: path dominante, brecha detectada, rol actual
3. Puede añadir contexto adicional en un campo de texto libre (ej: "Tengo 5 años de experiencia en finanzas y quiero liderar equipos")
4. Hace click en "Generar mi plan con IA"
5. El sistema llama a la Claude API con un prompt estructurado
6. Se muestra el plan generado en formato de roadmap visual (Mes 1 / Mes 2 / Mes 3)

**Integración Claude API:**
```javascript
// Prompt estructurado a enviar
const systemPrompt = `Eres Susana De Jesús, experta en desarrollo de carrera y talento.
Tu rol es crear planes de desarrollo personalizados, prácticos y motivadores.
Responde SOLO en JSON con la estructura: { mes1: {enfoque, acciones[], recurso}, mes2: {...}, mes3: {...}, consejo_final }`;

const userMessage = `
  Path dominante: ${pathDominante}
  Segundo path: ${segundoPath}
  Brecha de competencias: ${brechaDetectada}
  Contexto adicional del usuario: ${contextoUsuario}
  Genera un plan de desarrollo de 90 días personalizado.
`;

// Usar modelo: claude-sonnet-4-6
// max_tokens: 1000
```

**Output:**
- Roadmap visual de 3 meses con el JSON parseado
- Cada mes: icono + enfoque + 3 acciones concretas + 1 recurso recomendado
- Botón: "Descargar mi plan" (impresión CSS / jsPDF)
- Botón: "Ir a recursos" → filtra biblioteca con las recomendaciones del plan

**Estados de UI:**
- Idle: formulario con resumen del perfil + campo de contexto + botón
- Loading: spinner con mensaje motivador ("Susana está analizando tu perfil...")
- Success: plan renderizado
- Error: mensaje amigable + fallback al plan estático de la sección `#plan`

**Nota importante para Claude Code:** La API key de Anthropic NO debe estar en el frontend. Usar una función serverless (Vercel Edge Function o Netlify Function) como proxy que recibe la solicitud del cliente y llama a la API desde el servidor.

---

### 10.4 Newsletter  (`#newsletter`)

**Objetivo:** Construir una lista de suscriptores que reciban contenido de Susana sobre carrera y talento.

**Contenido:**
- Headline: "Recibe insights de carrera directamente en tu inbox"
- Subtítulo: frecuencia y tipo de contenido (ej: "Una reflexión útil cada quincena. Sin spam.")
- **Incentivo (lead magnet):** "Descarga gratis: La guía completa de los 3 paths de carrera" (PDF)
- Campo: Email (requerido)
- Campo: Nombre (opcional, para personalizar)
- Checkbox: "Acepto recibir contenido de Intentional Career Path" (GDPR)
- Botón: "Suscribirme y descargar la guía"

**Integración:**
- **Opción recomendada:** Mailchimp (plan gratuito hasta 500 contactos) vía su API embed o formulario hosted
- **Alternativa:** ConvertKit / Brevo (antes Sendinblue) — misma lógica
- Al suscribirse: envío automático del PDF como email de bienvenida (configurado en el ESP)

**Diseño:**
- Sección con fondo de color suave (gradiente muy ligero de `--color-primary` al 5%)
- Centrada, ancho máximo 600px
- Ilustración o ícono decorativo sobre el formulario
- Confirmación inline: "¡Listo! Revisa tu email para descargar la guía."

**PDF del lead magnet:**
- Generar con jsPDF o diseñar externamente (Canva) y hostear en `/public/guia-paths.pdf`
- Contenido: resumen de los 3 paths, competencias clave, checklist básica

---

## 10.5 Sección reservada para v2

La siguiente sección quedó fuera de v1 por requerir autenticación:

| Sección | Descripción | Razón para v2 |
|---|---|---|
| Dashboard de líder | Vista para managers donde pueden mapear a su equipo | Requiere auth + base de datos |

---

## 11. Requisitos no funcionales

- **Rendimiento:** Lighthouse score > 85 en mobile
- **Accesibilidad:** WCAG 2.1 AA — contraste, focus visible, alt texts, aria-labels
- **SEO:** Meta tags, Open Graph, sitemap.xml (especialmente importante para el blog)
- **Responsive:** Diseñado mobile-first, breakpoints: 375 / 768 / 1024 / 1280px
- **Motion:** Respetar `prefers-reduced-motion` en todas las animaciones
- **Dark mode:** Opcional en v1, preparar variables CSS para habilitarlo en v2

---

## 12. Fases de desarrollo sugeridas

### Fase 1 — Fundación (semana 1–2)
- Setup del proyecto (Vite/Next + Tailwind + i18n)
- Design tokens (colores, tipografía, variables CSS)
- Navbar + Footer
- Hero section
- Sección "Sobre Susana"

### Fase 2 — Core content (semana 3–4)
- Sección "¿Qué es un Talent Map?"
- Los tres career paths
- Comparativa de competencias (radar chart)

### Fase 3 — Herramientas interactivas (semana 5–6)
- Quiz de diagnóstico (completo con lógica y resultados)
- Checklist descargable
- Plan de 90 días (estático por path)
- Calculadora de brecha de competencias

### Fase 4 — IA + Comunidad (semana 7–8)
- Función serverless `/api/generate-plan.js`
- Sección Plan IA-personalizado (integración Claude API)
- Historias de carrera (componente Timeline)
- Newsletter (integración Mailchimp + PDF lead magnet)

### Fase 5 — Recursos y blog (semana 9–10)
- Biblioteca de recursos con filtros
- Sección de blog (listado)
- Página de artículo individual
- Talent Map visual

### Fase 6 — Contacto y pulido (semana 11)
- Formulario de contacto (Formspree)
- Revisión responsive completa
- SEO y meta tags
- Deploy en Vercel

---

## 13. Identidad de marca y datos personales

```
Nombre:       Susana De Jesús
Marca:        Intentional Career Path
Handle:       @intentional_careerpath
LinkedIn:     linkedin.com/in/susana-de-jesus
Instagram:    instagram.com/intentional_careerpath
Dominio:      intentionalcareerpath.com (recomendado)
Copyright:    © 2026 Intentional Career Path · Susana De Jesús
```

> **Nota para Claude Code:** Centralizar estos valores en un archivo `/src/config/brand.js` que exporte constantes reutilizables (`BRAND_NAME`, `AUTHOR_NAME`, `LINKEDIN_URL`, `INSTAGRAM_URL`, etc.). Importar desde ahí en `Footer.jsx`, `AboutSusana.jsx`, `Navbar.jsx` y meta tags SEO. Nunca hardcodear URLs de redes sociales directamente en los componentes.

---

## 14. Notas finales para Claude Code

1. **Comenzar siempre por los design tokens** (`tokens.css`) antes de cualquier componente.
2. **El quiz es el corazón de la experiencia** — dedicar tiempo a que la UX sea fluida y el resultado sea memorable y motivador.
3. **Los textos en español son siempre la versión definitiva**; el inglés puede ser traducción aproximada en v1.
4. **No usar librerías de UI component libraries** (Material UI, Chakra, etc.) — construir los componentes desde Tailwind para mantener identidad visual propia.
5. **El blog en v1 es JSON estático** — no implementar CMS ni base de datos. El objetivo es que Susana o Claude Code puedan agregar artículos editando `posts.js`.
6. **Formulario de contacto:** usar Formspree.io (endpoint gratuito) para evitar backend propio.
7. **Preparar el proyecto para i18n desde el día 1** — no hardcodear strings en JSX, siempre usar `t('key')` de react-i18next.
8. **Claude API — seguridad crítica:** la API key de Anthropic NUNCA va en el cliente. Todo llamado a la API pasa por `/api/generate-plan.js` (función serverless). Si el entorno no soporta serverless, usar variables de entorno de Vercel y una Edge Function.
9. **Calculadora de brecha:** la `competencyMatrix` en `/data/competencyMatrix.js` debe ser el único lugar donde se define el modelo de competencias — quiz, calculadora y plan IA deben leerla de ahí para mantener consistencia.
10. **Newsletter:** configurar el flujo de email de bienvenida + entrega del PDF en el ESP (Mailchimp/Brevo) antes de conectar el formulario. El frontend solo hace el POST al ESP; la entrega del PDF ocurre vía email automático.
11. **Brand config:** crear `/src/config/brand.js` como primera tarea — centraliza nombre de marca, autor, URLs de redes sociales, dominio y taglines. Todos los componentes importan desde ahí. Facilita cambios globales sin tocar múltiples archivos.
