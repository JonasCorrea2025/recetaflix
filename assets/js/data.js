/* ============================================================
   CaseirinhosFLIX — Área de Miembros (ES / LATAM)
   Edita este archivo para personalizar TODO el contenido.
   ============================================================ */

const CONFIG = {
  brand: "RecetaFLIX",               // nombre de la plataforma (cambialo si querés)
  instructor: "María Repostera",
  // 🔒 Contraseña de acceso (cambiala antes de publicar):
  password: "alumna859",
  // Enlaces de comunidad / soporte (reemplazá por los tuyos):
  whatsappGroup: "https://chat.whatsapp.com/TU-GRUPO",
  instagram: "https://instagram.com/sigaprofmaria",
  supportWhatsapp: "https://wa.me/000000000000",
  hero: {
    title: "De Cero a los Miles con Mini Tortas Caseras",
    subtitle:
      "El método completo para producir, vender y vivir de las mini tortas caseras. Recetas probadas, precios que venden y estrategias para facturar todos los días.",
    badge: "CURSO COMPLETO",
    bgThumb: "assets/img/thumbs/mini-tortas.jpg",
    ctaModule: "bienvenida",
  },
};

/* ---------- MÓDULOS DEL CURSO ----------
   Cada lección tiene un campo `video`:
     { type:"youtube", id:"ID_DEL_VIDEO" }   -> embebe YouTube
     { type:"mp4", src:"videos/archivo.mp4" } -> video propio
     null                                     -> muestra "Próximamente"
   `materials`: slugs de la sección Materiales para enlazar el PDF.
*/
const MODULES = [
  {
    id: "bienvenida",
    title: "Bienvenida",
    tag: "Empezá acá",
    thumb: "assets/img/thumbs/mini-tortas.jpg",
    desc: "Tu punto de partida: cómo está organizado el curso y la mentalidad para transformar tu cocina en un negocio rentable.",
    lessons: [
      { title: "Bienvenida al curso", duration: "3 min", video: { type: "mp4", src: "videos/01.mp4" }, desc: "Te damos la bienvenida y te mostramos lo que vas a lograr." },
      { title: "Cómo aprovechar la plataforma", duration: "4 min", video: { type: "mp4", src: "videos/02.mp4" }, desc: "Recorrido por los módulos, materiales y bonus." },
      { title: "Tu mentalidad de negocio", duration: "6 min", video: null, desc: "El cambio de chip de 'hobby' a negocio que factura." },
    ],
  },
  {
    id: "primeros-pasos",
    title: "Primeros Pasos",
    tag: "Fundamentos",
    thumb: "assets/img/thumbs/crema-ninho.jpg",
    desc: "Todo lo que necesitás para empezar hoy: equipos, ingredientes y organización.",
    lessons: [
      { title: "Equipos y utensilios esenciales", duration: "7 min", video: null, desc: "Lo mínimo indispensable (sin gastar de más)." },
      { title: "Ingredientes base y dónde comprarlos", duration: "8 min", video: null, desc: "Lista de compras y proveedores." , materials:["proveedores"]},
      { title: "Higiene y organización de tu cocina", duration: "5 min", video: null, desc: "Producí más rápido y más seguro." },
    ],
  },
  {
    id: "masas-perfectas",
    title: "Masas Perfectas",
    tag: "Producción",
    thumb: "assets/img/thumbs/mini-tortas.jpg",
    desc: "La base de todo: la masa de las mini tortas en su punto exacto.",
    lessons: [
      { title: "La masa base de las mini tortas", duration: "10 min", video: null, desc: "Paso a paso de la masa tipo volcán.", materials: ["mini-tortas"] },
      { title: "El punto correcto del bizcocho", duration: "6 min", video: null, desc: "Cómo saber cuándo está lista." },
      { title: "Errores comunes y cómo evitarlos", duration: "5 min", video: null, desc: "Lo que arruina la masa (y la solución)." },
    ],
  },
  {
    id: "rellenos",
    title: "Rellenos Increíbles",
    tag: "Sabores que venden",
    thumb: "assets/img/thumbs/brigadeiros.jpg",
    desc: "Los rellenos que enamoran a tus clientes y te diferencian.",
    lessons: [
      { title: "Brigadeiro tradicional y gourmet", duration: "9 min", video: null, desc: "El relleno estrella, bien explicado.", materials: ["brigadeiros", "brigadeiros-sin-fuego"] },
      { title: "Rellenos cremosos (leche en polvo, maracuyá...)", duration: "8 min", video: null, desc: "Variedad para todos los gustos.", materials: ["crema-ninho"] },
      { title: "Combinaciones que más venden", duration: "5 min", video: null, desc: "Los combos ganadores." },
    ],
  },
  {
    id: "coberturas",
    title: "Coberturas y Terminaciones",
    tag: "El toque profesional",
    thumb: "assets/img/thumbs/trufas.jpg",
    desc: "El acabado que hace que tu producto parezca (y se venda) como premium.",
    lessons: [
      { title: "Cobertura de chocolate brillante", duration: "7 min", video: null, desc: "El secreto del brillo perfecto.", materials: ["trufas"] },
      { title: "Decoración profesional", duration: "6 min", video: null, desc: "Detalles que aumentan el valor percibido." },
      { title: "Presentación y empaque que vende", duration: "6 min", video: null, desc: "Cómo empacar para encantar." },
    ],
  },
  {
    id: "precios",
    title: "Precios que Venden",
    tag: "Ganancia",
    thumb: "assets/img/thumbs/como-lucrar.jpg",
    desc: "Dejá de regalar tu trabajo: aprendé a cobrar lo justo y ganar de verdad.",
    lessons: [
      { title: "Cómo calcular tu costo real", duration: "9 min", video: null, desc: "Nada de cálculos 'a ojo'.", materials: ["planilla"] },
      { title: "Fórmula de precificación", duration: "8 min", video: null, desc: "Usá la planilla para fijar precios rentables.", materials: ["planilla", "como-lucrar"] },
      { title: "Kits y combos que aumentan el ticket", duration: "6 min", video: null, desc: "Vendé más en cada pedido.", materials: ["kits-ganancia", "kits-ninos"] },
    ],
  },
  {
    id: "ventas",
    title: "Ventas Todos los Días",
    tag: "Clientes",
    thumb: "assets/img/thumbs/heladitos-gourmet.jpg",
    desc: "El sistema para tener pedidos de forma constante, no solo en fechas especiales.",
    lessons: [
      { title: "Foto de producto con el celular", duration: "7 min", video: null, desc: "Fotos que venden sin equipo caro." },
      { title: "WhatsApp e Instagram para vender", duration: "9 min", video: null, desc: "Tu vidriera digital, paso a paso." },
      { title: "Cómo conseguir clientes recurrentes", duration: "6 min", video: null, desc: "Que vuelvan a comprarte una y otra vez." },
    ],
  },
];

/* ---------- MATERIALES / BONUS (descargables) ----------
   Estos son tus 13 PDFs ya traducidos al español.
*/
const MATERIALS = [
  {
    cat: "📕 Recetarios principales",
    items: [
      { slug: "mini-tortas", title: "127 Mini Tortas Caseras", pages: 69, thumb: "assets/img/thumbs/mini-tortas.jpg", file: "materiales/127-Mini-Tortas-Caseras-ES.pdf" },
      { slug: "rellenos-sin-horno", title: "101 Recetas de Rellenos sin Horno", pages: 55, thumb: "assets/img/thumbs/rellenos-sin-horno.jpg", file: "materiales/101-Recetas-Rellenos-sin-Horno-ES.pdf" },
      { slug: "trufas", title: "La Guía de las Trufas que Dan Dinero", pages: 13, thumb: "assets/img/thumbs/trufas.jpg", file: "materiales/La-Guia-de-las-Trufas-ES.pdf" },
    ],
  },
  {
    cat: "💰 Negocio y ganancias",
    items: [
      { slug: "como-lucrar", title: "Cómo Lucrar 2x Más", pages: 15, thumb: "assets/img/thumbs/como-lucrar.jpg", file: "materiales/Como-Lucrar-2x-Mas-ES.pdf" },
      { slug: "kits-ganancia", title: "Kits que Aumentan la Ganancia", pages: 19, thumb: "assets/img/thumbs/kits-ganancia.jpg", file: "materiales/Kits-que-Aumentan-la-Ganancia-ES.pdf" },
      { slug: "planilla", title: "Planilla de Costos y Precios", pages: 5, thumb: "assets/img/thumbs/planilla.jpg", file: "materiales/Planilla-de-Costos-y-Precios-ES.pdf" },
    ],
  },
  {
    cat: "🎁 Bonus y extras",
    items: [
      { slug: "brigadeiros", title: "Brigadeiros", pages: 11, thumb: "assets/img/thumbs/brigadeiros.jpg", file: "materiales/Brigadeiros-ES.pdf" },
      { slug: "brigadeiros-sin-fuego", title: "Brigadeiros sin Fuego", pages: 35, thumb: "assets/img/thumbs/brigadeiros-sin-fuego.jpg", file: "materiales/Brigadeiros-sin-Fuego-ES.pdf" },
      { slug: "crema-ninho", title: "Crema de Leche en Polvo", pages: 15, thumb: "assets/img/thumbs/crema-ninho.jpg", file: "materiales/Crema-de-Leche-en-Polvo-ES.pdf" },
      { slug: "kits-ninos", title: "Kits para Niños", pages: 11, thumb: "assets/img/thumbs/kits-ninos.jpg", file: "materiales/Kits-para-Ninos-ES.pdf" },
      { slug: "heladitos-gourmet", title: "Heladitos Gourmet", pages: 37, thumb: "assets/img/thumbs/heladitos-gourmet.jpg", file: "materiales/Heladitos-Gourmet-ES.pdf" },
      { slug: "heladitos-fit", title: "Heladitos Fit", pages: 33, thumb: "assets/img/thumbs/heladitos-fit.jpg", file: "materiales/Heladitos-Fit-ES.pdf" },
      { slug: "heladitos-alcoholicos", title: "Heladitos Alcohólicos", pages: 33, thumb: "assets/img/thumbs/heladitos-alcoholicos.jpg", file: "materiales/Heladitos-Alcoholicos-ES.pdf" },
    ],
  },
];

// Índice rápido slug -> material (para enlazar desde las lecciones)
const MATERIAL_BY_SLUG = {};
MATERIALS.forEach((g) => g.items.forEach((it) => (MATERIAL_BY_SLUG[it.slug] = it)));
