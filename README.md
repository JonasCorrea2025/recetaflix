# RecetaFLIX — Área de Miembros (ES / LATAM)

Área de miembros estilo Netflix para el curso **Mini Tortas Caseras Rentables**, en español.
Sitio **100% estático** (HTML/CSS/JS, sin build, sin backend) — se publica en cualquier hosting estático.

Instructora: **María Repostera** · Idioma: Español neutro (LATAM)

---

## 🚀 Publicar (elegí una)

**Opción A — Netlify (la más fácil):**
1. Entrá a [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastrá **toda la carpeta** `recetaflix` a la página.
3. Listo: te da una URL pública. (Podés conectar tu dominio después.)

**Opción B — Vercel:** importá el repo o subí la carpeta en [vercel.com/new](https://vercel.com/new). Sin configuración (framework: *Other*).

**Opción C — GitHub Pages:** subí el repo → Settings → Pages → Branch `main` / carpeta `/ (root)`.

**Probar local:** abrí una terminal en la carpeta y corré `npx serve .` (o cualquier server estático) y entrá a la URL que muestre. *(Abrir `index.html` con doble clic también funciona para el texto, pero algunos navegadores bloquean la descarga de PDFs y el video con `file://`; por eso es mejor un server.)*

---

## ✏️ Personalizar (todo en un solo archivo)

Editá **`assets/js/data.js`**:

| Qué | Dónde |
|---|---|
| 🔒 **Contraseña de acceso** | `CONFIG.password` (cambiala antes de publicar) |
| Nombre de la marca / instructora | `CONFIG.brand`, `CONFIG.instructor` |
| Grupo de WhatsApp, Instagram, soporte | `CONFIG.whatsappGroup`, `CONFIG.instagram`, `CONFIG.supportWhatsapp` |
| Texto del banner principal | `CONFIG.hero` |
| Módulos, lecciones, videos | `MODULES` |
| PDFs / bonus descargables | `MATERIALS` |

### Agregar los videos de cada clase
En cada lección, el campo `video` acepta:

```js
video: { type: "youtube", id: "dQw4w9WgXcQ" }   // ← ID de YouTube (la parte después de watch?v=)
video: { type: "mp4", src: "videos/mi-clase.mp4" } // ← video propio (poné el archivo en /videos)
video: null                                        // ← muestra "Próximamente"
```

> Las clases de **Bienvenida** ya vienen con los 2 videos de ejemplo **doblados al español**.
> Para el resto: subí tus videos a YouTube (pueden ser *no listados*) y pegá el ID, o poné el `.mp4` en `/videos`.

---

## 📁 Estructura

```
recetaflix/
├─ index.html              ← entrada
├─ assets/
│  ├─ css/styles.css       ← estilos
│  ├─ js/data.js           ← ⭐ TODO el contenido editable
│  ├─ js/app.js            ← lógica (no hace falta tocar)
│  └─ img/thumbs/          ← portadas de los recetarios
├─ materiales/             ← los 13 PDFs en español (descargables)
└─ videos/                 ← videos propios (mp4)
```

## 🔐 Sobre la seguridad
El acceso usa una **contraseña del lado del cliente** (igual que muchos miembros-area simples). Sirve para "cerrar la puerta", pero alguien técnico podría ver el código fuente. Para protección fuerte (pago real + login por usuario) conviene una plataforma con backend; este sitio está pensado para entrega simple y rápida.

---
© María Repostera — Prohibida la reproducción o distribución sin autorización.
