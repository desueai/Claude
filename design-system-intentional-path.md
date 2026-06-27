# Design System — Intentional Path
> Guía de diseño para la landing page web. Extraída del logo oficial.
> Lista para usar en Claude Code.

---

## 1. Identidad visual

**Marca:** Intentional Path  
**Concepto:** Desarrollo de talento humano — calidez, intención, crecimiento personal.  
**Estilo:** Minimalista, limpio, humanista. Líneas finas, espaciado generoso, confianza sin frialdad.

---

## 2. Paleta de colores

### Colores primarios (extraídos del logo)

```css
:root {
  /* Primario — Rojo borgoña (corazón del logo) */
  --color-primary:        #8B2635;
  --color-primary-hover:  #7A1F2E;
  --color-primary-light:  #F5EAEC;
  --color-primary-muted:  #C4788A;

  /* Secundario — Gris carbón (tipografía del logo) */
  --color-text-logo:      #3D3D3D;

  /* Accento — Gris outline (ícono secundario del logo) */
  --color-icon-outline:   #6B6B6B;
}
```

### Escala de neutros

```css
:root {
  --color-white:      #FFFFFF;
  --color-gray-50:    #F9F9F9;   /* fondo de página */
  --color-gray-100:   #F2F2F2;   /* fondo de secciones alternas */
  --color-gray-200:   #E5E5E5;   /* bordes y divisores */
  --color-gray-400:   #A3A3A3;   /* texto secundario claro */
  --color-gray-600:   #6B6B6B;   /* texto secundario */
  --color-gray-800:   #3D3D3D;   /* texto principal */
  --color-gray-900:   #1A1A1A;   /* headings */
}
```

### Semánticos

```css
:root {
  --color-success:        #2D7A4F;
  --color-success-light:  #EAF4EE;
  --color-warning:        #B45309;
  --color-warning-light:  #FEF3C7;
  --color-error:          #B91C1C;
  --color-error-light:    #FEE2E2;
}
```

### Uso de colores

| Token                  | Dónde se usa                                          |
|------------------------|-------------------------------------------------------|
| `--color-primary`      | CTAs primarios, links activos, acento del logo        |
| `--color-primary-light`| Fondos de tarjetas destacadas, badges                 |
| `--color-primary-muted`| Iconos decorativos, bordes de acento                  |
| `--color-gray-900`     | Headings H1, H2                                       |
| `--color-gray-800`     | Texto de cuerpo                                       |
| `--color-gray-600`     | Subtítulos, captions, labels                          |
| `--color-gray-200`     | Bordes de tarjetas, divisores                         |
| `--color-gray-50`      | Fondo general de página                               |
| `--color-gray-100`     | Fondo de secciones alternas (ej. servicios)           |

---

## 3. Tipografía

### Fuente recomendada

El logo usa una sans-serif geométrica humanista de trazo medio-fino. La coincidencia más cercana disponible en Google Fonts:

**Principal:** `Plus Jakarta Sans` — geométrica, moderna, muy legible en pantalla.  
**Alternativa:** `DM Sans` o `Inter`.

```html
<!-- En el <head> del HTML -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
:root {
  --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* solo si hay código */
}

body {
  font-family: var(--font-sans);
}
```

### Escala tipográfica

```css
:root {
  /* Tamaños */
  --text-xs:   0.75rem;   /* 12px — labels, captions, badges */
  --text-sm:   0.875rem;  /* 14px — nav links, metadata */
  --text-base: 1rem;      /* 16px — cuerpo de texto */
  --text-lg:   1.125rem;  /* 18px — subtítulos de sección */
  --text-xl:   1.25rem;   /* 20px — intro párrafos */
  --text-2xl:  1.5rem;    /* 24px — H3 */
  --text-3xl:  1.875rem;  /* 30px — H2 */
  --text-4xl:  2.25rem;   /* 36px — H1 mobile */
  --text-5xl:  3rem;      /* 48px — H1 desktop */

  /* Pesos */
  --font-regular:   400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;

  /* Interlineado */
  --leading-tight:  1.2;   /* headings */
  --leading-snug:   1.4;   /* subtítulos */
  --leading-normal: 1.6;   /* cuerpo */
  --leading-relaxed:1.75;  /* párrafos largos */

  /* Tracking */
  --tracking-tight:  -0.02em;  /* headings grandes */
  --tracking-normal:  0em;
  --tracking-wide:    0.06em;  /* labels en mayúsculas */
}
```

### Aplicación tipográfica

```css
/* Headings */
h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--color-gray-900);
}

h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  color: var(--color-gray-900);
}

h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--color-gray-900);
}

/* Cuerpo */
p {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
  color: var(--color-gray-800);
}

/* Labels de sección */
.label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-primary);
}
```

---

## 4. Espaciado y layout

```css
:root {
  /* Espaciado base: escala de 4px */
  --space-1:   0.25rem;  /* 4px */
  --space-2:   0.5rem;   /* 8px */
  --space-3:   0.75rem;  /* 12px */
  --space-4:   1rem;     /* 16px */
  --space-5:   1.25rem;  /* 20px */
  --space-6:   1.5rem;   /* 24px */
  --space-8:   2rem;     /* 32px */
  --space-10:  2.5rem;   /* 40px */
  --space-12:  3rem;     /* 48px */
  --space-16:  4rem;     /* 64px */
  --space-20:  5rem;     /* 80px */
  --space-24:  6rem;     /* 96px */

  /* Anchos de contenido */
  --container-sm:  640px;
  --container-md:  768px;
  --container-lg:  1024px;
  --container-xl:  1280px;
  --container-2xl: 1400px;

  /* Padding de sección */
  --section-py:    var(--space-20);  /* padding vertical secciones */
  --section-px:    var(--space-6);   /* padding horizontal en móvil */
}
```

### Grid system

```css
/* Layout de 12 columnas con CSS Grid */
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Grids comunes */
.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-8); }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-6); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

---

## 5. Bordes y radio

```css
:root {
  --radius-sm:   4px;    /* inputs pequeños, badges */
  --radius-md:   8px;    /* botones, inputs */
  --radius-lg:   12px;   /* tarjetas */
  --radius-xl:   16px;   /* tarjetas grandes */
  --radius-2xl:  24px;   /* hero cards, secciones destacadas */
  --radius-full: 9999px; /* pills, avatares */

  --border-thin:   0.5px solid var(--color-gray-200);
  --border-normal: 1px solid var(--color-gray-200);
  --border-accent: 1px solid var(--color-primary-muted);
}
```

---

## 6. Sombras

```css
:root {
  /* Sin sombras agresivas — estilo minimalista */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04);

  /* Sombra de foco para accesibilidad */
  --shadow-focus: 0 0 0 3px rgba(139, 38, 53, 0.25);
}
```

---

## 7. Componentes clave

### Botones

```css
/* Primario */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 12px 28px;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: #fff;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}
.btn-primary:hover  { background: var(--color-primary-hover); }
.btn-primary:active { transform: scale(0.98); }
.btn-primary:focus-visible { outline: none; box-shadow: var(--shadow-focus); }

/* Secundario — outline */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 11px 28px;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--color-gray-800);
  background: transparent;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.btn-secondary:hover { background: var(--color-gray-50); border-color: var(--color-gray-400); }

/* Ghost — solo texto */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 16px;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s;
}
.btn-ghost:hover { background: var(--color-primary-light); }
```

### Tarjetas (cards)

```css
.card {
  background: var(--color-white);
  border: var(--border-thin);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: box-shadow 0.2s ease;
}
.card:hover { box-shadow: var(--shadow-md); }

/* Tarjeta con acento de color en el borde superior */
.card-accent {
  border-top: 3px solid var(--color-primary);
}

/* Tarjeta de fondo sutil */
.card-soft {
  background: var(--color-gray-50);
  border: var(--border-normal);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}
```

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 4px 12px;
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
}

.badge-primary {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.badge-neutral {
  background: var(--color-gray-100);
  color: var(--color-gray-600);
}
```

### Inputs

```css
.input {
  width: 100%;
  height: 44px;
  padding: 0 var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  color: var(--color-gray-900);
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input:hover        { border-color: var(--color-gray-400); }
.input:focus        { border-color: var(--color-primary); box-shadow: var(--shadow-focus); }
.input::placeholder { color: var(--color-gray-400); }
```

---

## 8. Secciones de la landing page

### Navbar

```
- Fondo: blanco (#FFFFFF) con border-bottom de 0.5px en --color-gray-200
- Logo: SVG original del archivo
- Links: text-sm, font-medium, color-gray-600 → hover color-gray-900
- CTA nav: btn-primary compacto (padding 8px 20px)
- Sticky al hacer scroll
- En móvil: menú hamburguesa
```

### Hero

```
- Fondo: blanco o color-gray-50 muy sutil
- Label de categoría: badge-primary arriba del título
- H1: text-5xl, font-bold, tracking-tight, color-gray-900
  → palabra clave en color-primary
- Subtítulo: text-xl, font-regular, color-gray-600, max-width 540px
- CTAs: btn-primary + btn-secondary, espaciado gap-3
- Espaciado: padding-top 80px, padding-bottom 64px
```

### Sección de servicios

```
- Fondo: color-gray-50 (contraste sutil con el hero blanco)
- Label de sección: .label (uppercase, color-primary)
- H2: text-3xl, font-semibold
- Grid: 3 columnas en desktop, 1 en móvil
- Tarjetas: card + card-accent (borde superior en color-primary)
- Ícono: 36px en cuadro redondeado con fondo color-primary-light
```

### Sección de impacto / estadísticas

```
- Fondo: blanco
- Métricas: números grandes text-4xl font-bold color-primary
- Label de métrica: text-sm color-gray-600
- Layout: 4 columnas en desktop, 2 en móvil
```

### CTA final

```
- Fondo: color-primary (borgoña)
- Texto: blanco
- Subtítulo: rgba(255,255,255,0.8)
- Botón: fondo blanco, texto color-primary (inversión)
- Padding: 80px vertical
- Border-radius: radius-2xl si es una card flotante
```

### Footer

```
- Fondo: color-gray-900 (oscuro)
- Texto: color-gray-400
- Links: color-gray-400 → hover color-white
- Logo: versión clara (blanca o gris claro)
- Border-top: 1px solid rgba(255,255,255,0.1)
```

---

## 9. Iconografía

Usar **Lucide Icons** (outline, 1.5px stroke) — coherente con el estilo de línea fina del logo.

```bash
# Si usas React
npm install lucide-react

# Si usas HTML vanilla
# CDN: https://unpkg.com/lucide@latest
```

```css
/* Tamaños de íconos */
--icon-sm:  16px;
--icon-md:  20px;
--icon-lg:  24px;
--icon-xl:  32px;
```

---

## 10. Animaciones y transiciones

```css
:root {
  /* Duraciones */
  --duration-fast:   100ms;
  --duration-base:   200ms;
  --duration-slow:   350ms;

  /* Easing */
  --ease-out:     cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
}

/* Transición estándar para elementos interactivos */
.interactive {
  transition: all var(--duration-base) var(--ease-out);
}

/* Fade-in para elementos al hacer scroll */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp {
  animation: fadeInUp var(--duration-slow) var(--ease-out) forwards;
}
```

---

## 11. Responsive breakpoints

```css
/* Mobile-first */
:root {
  --bp-sm:  640px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1536px;
}

/* Uso en media queries */
/* @media (min-width: 640px)  → sm: tablet pequeño */
/* @media (min-width: 768px)  → md: tablet          */
/* @media (min-width: 1024px) → lg: laptop          */
/* @media (min-width: 1280px) → xl: desktop         */
```

---

## 12. Tokens completos (archivo CSS raíz)

Pegar en `styles/tokens.css` o `globals.css`:

```css
:root {
  /* Colores de marca */
  --color-primary:         #8B2635;
  --color-primary-hover:   #7A1F2E;
  --color-primary-light:   #F5EAEC;
  --color-primary-muted:   #C4788A;

  /* Neutros */
  --color-white:           #FFFFFF;
  --color-gray-50:         #F9F9F9;
  --color-gray-100:        #F2F2F2;
  --color-gray-200:        #E5E5E5;
  --color-gray-400:        #A3A3A3;
  --color-gray-600:        #6B6B6B;
  --color-gray-800:        #3D3D3D;
  --color-gray-900:        #1A1A1A;

  /* Semánticos */
  --color-success:         #2D7A4F;
  --color-success-light:   #EAF4EE;
  --color-warning:         #B45309;
  --color-warning-light:   #FEF3C7;
  --color-error:           #B91C1C;
  --color-error-light:     #FEE2E2;

  /* Tipografía */
  --font-sans:             'Plus Jakarta Sans', system-ui, sans-serif;
  --text-xs:               0.75rem;
  --text-sm:               0.875rem;
  --text-base:             1rem;
  --text-lg:               1.125rem;
  --text-xl:               1.25rem;
  --text-2xl:              1.5rem;
  --text-3xl:              1.875rem;
  --text-4xl:              2.25rem;
  --text-5xl:              3rem;
  --font-regular:          400;
  --font-medium:           500;
  --font-semibold:         600;
  --font-bold:             700;
  --leading-tight:         1.2;
  --leading-normal:        1.6;
  --tracking-tight:        -0.02em;
  --tracking-wide:         0.06em;

  /* Espaciado */
  --space-1: 0.25rem; --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;    --space-5: 1.25rem; --space-6: 1.5rem;
  --space-8: 2rem;    --space-10: 2.5rem; --space-12: 3rem;
  --space-16: 4rem;   --space-20: 5rem;   --space-24: 6rem;

  /* Layout */
  --container-xl:          1280px;
  --section-py:            5rem;

  /* Bordes */
  --radius-sm:             4px;
  --radius-md:             8px;
  --radius-lg:             12px;
  --radius-xl:             16px;
  --radius-2xl:            24px;
  --radius-full:           9999px;
  --border-thin:           0.5px solid #E5E5E5;
  --border-normal:         1px solid #E5E5E5;

  /* Sombras */
  --shadow-xs:             0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm:             0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md:             0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg:             0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-focus:          0 0 0 3px rgba(139, 38, 53, 0.25);

  /* Animaciones */
  --duration-fast:         100ms;
  --duration-base:         200ms;
  --duration-slow:         350ms;
  --ease-out:              cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 13. Referencia rápida de uso en Claude Code

```
Marca:         Intentional Path
Color primario: #8B2635 (borgoña)
Fuente:        Plus Jakarta Sans (Google Fonts)
Estilo:        Minimalista, líneas finas, humanista
Fondo página:  #F9F9F9 o #FFFFFF
Texto principal:#1A1A1A
Texto body:    #3D3D3D
Texto muted:   #6B6B6B
Border radius: 8px botones, 12px tarjetas
Sombras:       Muy sutiles (ver tokens)
Íconos:        Lucide Icons (outline)
CTAs primarios: fondo #8B2635, texto blanco
CTAs secundarios: outline, borde #E5E5E5
```

---

*Generado por Claude · Junio 2026 · Intentional Path Design System v1.0*
