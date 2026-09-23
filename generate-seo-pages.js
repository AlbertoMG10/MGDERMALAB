const fs = require("fs");

const root = __dirname;
const site = "https://mgdermalab.mx";

const commonFaq = [
  ["¿Realizan envíos nacionales?", "Sí. MG Dermalab coordina envíos nacionales; cobertura, costo y tiempo se confirman al cotizar."],
  ["¿Cómo solicito disponibilidad?", "Envía el nombre del producto, la cantidad y tu ciudad por WhatsApp. Si aplica, incluye la presentación que buscas. Un asesor responderá con la disponibilidad vigente."],
  ["¿Manejan precios por volumen?", "Las condiciones por volumen se revisan en cada cotización y dependen de la cantidad y disponibilidad."],
  ["¿A qué tipo de clientes atienden?", "Atendemos principalmente a médicos, clínicas y farmacias. El equipo comercial confirma los requisitos aplicables a cada solicitud."]
];

const pages = [
  {
    slug: "neotrex", name: "Neotrex", category: "Dermatología", presentation: "10 mg · 20 mg",
    title: "Neotrex 10 mg y 20 mg | Cotización | MG Dermalab",
    description: "Consulta disponibilidad y cotización de Neotrex 10 mg y 20 mg con MG Dermalab. Atención para médicos, clínicas y farmacias en México.",
    intro: "Neotrex en presentaciones de 10 mg y 20 mg, disponible mediante cotización y confirmación directa con nuestro equipo comercial.",
    image: "assets/neotrex-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Confirma la concentración y cantidad que necesitas para recibir una respuesta precisa.",
    related: [["isotretinoina", "Ver categoría isotretinoína"], ["epuris", "Epuris"], ["vastionin", "Vastionin"]]
  },
  {
    slug: "epuris", name: "Epuris", category: "Dermatología", presentation: "10 mg · 20 mg",
    title: "Epuris 10 mg y 20 mg | Disponibilidad | MG Dermalab",
    description: "Cotiza Epuris 10 mg y 20 mg con MG Dermalab. Consulta disponibilidad, volumen y envío para médicos, clínicas y farmacias.",
    intro: "Epuris en 10 mg y 20 mg para solicitudes comerciales de profesionales y establecimientos de salud, sujeto a disponibilidad.",
    image: "assets/epuris-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Indica 10 mg o 20 mg al escribirnos; así podremos revisar existencias para la presentación correcta.",
    related: [["isotretinoina", "Ver categoría isotretinoína"], ["neotrex", "Neotrex"], ["oratane", "Oratane"]]
  },
  {
    slug: "vastionin", name: "Vastionin", category: "Dermatología", presentation: "10 mg · 20 mg",
    title: "Vastionin 10 mg y 20 mg | Cotización | MG Dermalab",
    description: "Consulta Vastionin 10 mg y 20 mg con MG Dermalab. Disponibilidad y cotización para médicos, clínicas y farmacias en México.",
    intro: "Vastionin en concentraciones de 10 mg y 20 mg, con atención comercial directa y disponibilidad sujeta a confirmación.",
    image: "assets/vastionin-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Comparte concentración, número de piezas y destino para preparar tu cotización.",
    related: [["isotretinoina", "Ver categoría isotretinoína"], ["neotrex", "Neotrex"], ["epuris", "Epuris"]]
  },
  {
    slug: "oratane", name: "Oratane", category: "Dermatología", presentation: "5 mg · 10 mg · 20 mg",
    title: "Oratane 5 mg, 10 mg y 20 mg | MG Dermalab",
    description: "Solicita disponibilidad de Oratane 5 mg, 10 mg y 20 mg con MG Dermalab. Cotización para médicos, clínicas y farmacias.",
    intro: "Oratane en 5 mg, 10 mg y 20 mg. Nuestro equipo confirma existencias y condiciones comerciales para cada solicitud.",
    note: "Indica la concentración de Oratane, la cantidad requerida y tu ciudad para preparar una consulta comercial precisa.",
    related: [["isotretinoina", "Ver categoría isotretinoína"], ["epuris", "Epuris"], ["vastionin", "Vastionin"]]
  },
  {
    slug: "dysport", name: "Dysport", category: "Medicina estética", presentation: "300 U · 500 U",
    title: "Dysport 300 U y 500 U | Cotización | MG Dermalab",
    description: "Consulta disponibilidad de Dysport 300 U y 500 U con MG Dermalab. Cotización directa para médicos y clínicas en México.",
    intro: "Dysport en presentaciones de 300 U y 500 U, con atención comercial especializada para médicos y clínicas.",
    image: "assets/dysport-300.jpg", width: 529, height: 378,
    note: "Selecciona 300 U o 500 U y comparte la cantidad requerida para consultar disponibilidad.",
    related: [["sculptra", "Sculptra"], ["restylane", "Familia Restylane"], ["", "Catálogo MG Dermalab"]]
  },
  {
    slug: "sculptra", name: "Sculptra", category: "Medicina estética", presentation: "",
    title: "Sculptra | Disponibilidad y cotización | MG Dermalab",
    description: "Consulta disponibilidad de Sculptra con MG Dermalab. Atención comercial para médicos y clínicas con envíos en México.",
    intro: "Sculptra con disponibilidad sujeta a confirmación. Atendemos solicitudes de médicos y clínicas mediante cotización directa.",
    image: "assets/sculptra-2pack.avif", width: 1344, height: 626,
    note: "Comparte la cantidad requerida y tu ciudad para que nuestro equipo prepare una cotización personalizada.",
    related: [["dysport", "Dysport"], ["restylane", "Familia Restylane"], ["", "Catálogo MG Dermalab"]]
  },
  {
    slug: "tirzepatida", name: "Tirzepatida", category: "Línea especializada", presentation: "60 mg",
    title: "Tirzepatida 60 mg | Cotización | MG Dermalab",
    description: "Consulta disponibilidad y cotización de Tirzepatida 60 mg con MG Dermalab. Información comercial y atención directa en México.",
    intro: "Tirzepatida en presentación de 60 mg. Esta página ofrece únicamente información comercial y disponibilidad sujeta a confirmación.",
    image: "assets/mg-tirzepatida-vial-alpha.png", width: 1122, height: 1402,
    note: "Comparte la cantidad requerida y tu ciudad para recibir atención comercial personalizada.",
    related: [["retatrutida", "Retatrutida"], ["", "Catálogo MG Dermalab"]]
  },
  {
    slug: "retatrutida", name: "Retatrutida", category: "Línea especializada", presentation: "60 mg",
    title: "Retatrutida 60 mg | Consulta comercial | MG Dermalab",
    description: "Consulta información comercial y disponibilidad de Retatrutida 60 mg con MG Dermalab. Cotización sujeta a confirmación.",
    intro: "Retatrutida en presentación de 60 mg para consulta comercial directa, con disponibilidad sujeta a confirmación.",
    note: "Recibe atención comercial directa para consultar existencias, cantidad y condiciones de envío.",
    related: [["tirzepatida", "Tirzepatida"], ["", "Catálogo MG Dermalab"]]
  }
];

const restylaneVariants = [
  ["restylane-kysse", "Restylane Kysse", "Kysse", "Consulta disponibilidad de Restylane Kysse con MG Dermalab. Atención comercial especializada para médicos y clínicas."],
  ["restylane-lyft", "Restylane Lyft", "Lyft", "Solicita cotización de Restylane Lyft con MG Dermalab. Disponibilidad sujeta a confirmación para médicos y clínicas."],
  ["restylane-refyne", "Restylane Refyne", "Refyne", "Consulta Restylane Refyne con MG Dermalab. Cotización directa y envíos nacionales sujetos a confirmación."],
  ["restylane-defyne", "Restylane Defyne", "Defyne", "Cotiza Restylane Defyne con MG Dermalab. Atención comercial para médicos y clínicas en México."],
  ["restylane-contour", "Restylane Contour", "Contour", "Consulta disponibilidad de Restylane Contour con MG Dermalab. Cotización profesional y atención directa."],
  ["restylane-eyelight", "Restylane Eyelight", "Eyelight", "Solicita disponibilidad de Restylane Eyelight con MG Dermalab. Atención a médicos y clínicas en México."],
  ["restylane-skinboosters-vital", "Restylane Skinboosters Vital", "Skinboosters Vital", "Consulta Restylane Skinboosters Vital con MG Dermalab. Cotización y disponibilidad para profesionales."],
  ["restylane-skinboosters-vital-light", "Restylane Skinboosters Vital Light", "Skinboosters Vital Light", "Consulta Restylane Skinboosters Vital Light con MG Dermalab. Disponibilidad y cotización profesional."]
];

for (const [slug, name, variant, description] of restylaneVariants) {
  pages.push({
    slug, name, category: "Medicina estética · Restylane", presentation: variant,
    title: `${name} | Cotización | MG Dermalab`, description,
    intro: `${name} forma parte de la familia Restylane. MG Dermalab confirma disponibilidad y condiciones comerciales para cada solicitud.`,
    note: `Consulta la variante ${variant} con atención comercial directa para médicos y clínicas.`,
    related: [["restylane", "Ver familia Restylane"], ["dysport", "Dysport"], ["sculptra", "Sculptra"]]
  });
}

const hubs = [
  {
    slug: "isotretinoina", name: "Isotretinoína", category: "Dermatología", title: "Isotretinoína: marcas y presentaciones | MG Dermalab",
    description: "Explora Neotrex, Epuris, Vastionin y Oratane con presentaciones confirmadas. Consulta disponibilidad con MG Dermalab.",
    intro: "Consulta las marcas y concentraciones de isotretinoína que maneja MG Dermalab. Cada disponibilidad se confirma antes de cotizar.",
    image: "assets/mg-dermalab-linea-dermatologia-1200.jpg", width: 1200, height: 800,
    items: [["neotrex", "Neotrex", "10 mg · 20 mg"], ["epuris", "Epuris", "10 mg · 20 mg"], ["vastionin", "Vastionin", "10 mg · 20 mg"], ["oratane", "Oratane", "5 mg · 10 mg · 20 mg"]],
    note: "La información es comercial. No sustituye valoración, indicación ni seguimiento de un profesional de la salud."
  },
  {
    slug: "restylane", name: "Restylane", category: "Medicina estética", title: "Familia Restylane | Línea disponible | MG Dermalab",
    description: "Conoce la familia Restylane: Kysse, Lyft, Refyne, Defyne, Contour, Eyelight y Skinboosters. Cotiza con MG Dermalab.",
    intro: "Explora la familia Restylane disponible para cotización profesional. Cada variante cuenta con una página comercial específica.",
    image: "assets/restylane-family.avif", width: 1200, height: 800,
    items: restylaneVariants.map(([slug, name, variant]) => [slug, name, variant]),
    note: "Selecciona una variante para consultar su ficha comercial y solicitar disponibilidad."
  }
];

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function href(prefix, slug) {
  return slug ? `${prefix}${slug}` : `${prefix}index.html#catalogo`;
}

function faqFor(page) {
  const first = !page.presentation
    ? [`¿Cómo consulto disponibilidad de ${page.name}?`, "Comparte la cantidad requerida y tu ciudad por WhatsApp. Un asesor revisará la solicitud y responderá con la información comercial disponible."]
    : [`¿Qué presentación de ${page.name} manejan?`, `Manejamos ${page.presentation.replace(/ · /g, ", ")}. La disponibilidad se confirma al momento de cotizar.`];
  return [first, ...commonFaq];
}

function head(page, prefix, type, faq) {
  const url = `${site}/${page.slug}`;
  const image = page.image ? `${site}/${page.image}` : `${site}/assets/hero-mg-dermalab-grafito-1600.jpg`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: {"@id": `${site}/#website`}, about: {"@id": `${url}#subject`}},
      type === "hub"
        ? {"@type": "CollectionPage", "@id": `${url}#subject`, name: page.name, description: page.intro, url, hasPart: page.items.map(([slug, name]) => ({"@type": "WebPage", name, url: `${site}/${slug}`}))}
        : {"@type": "Product", "@id": `${url}#subject`, name: page.name, category: page.category, description: page.intro, url, ...(page.image ? {image} : {})},
      {"@type": "BreadcrumbList", itemListElement: [{"@type": "ListItem", position: 1, name: "Inicio", item: `${site}/`}, {"@type": "ListItem", position: 2, name: page.name, item: url}]},
      {"@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}}))}
    ]
  };
  return `<!doctype html>
<html lang="es-MX">
  <head>
    <script>
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(${json({event: "page_view", page_type: type === "hub" ? "seo_category" : "seo_product", product_name: page.name, category: page.category, presentation: type === "hub" ? page.items.map((i) => i[1]).join(", ") : page.presentation})});
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer","GTM-T9MFWNKW");
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(page.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${url}" />
    <link rel="icon" href="${prefix}favicon.ico" sizes="any" />
    <link rel="icon" href="${prefix}favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="${prefix}apple-touch-icon.png" />
    <meta name="theme-color" content="#16181B" />
    <meta property="og:site_name" content="MG Dermalab" />
    <meta property="og:title" content="${esc(page.title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:type" content="${type === "hub" ? "website" : "product"}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="${esc(page.name)} — MG Dermalab" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(page.title)}" />
    <meta name="twitter:description" content="${esc(page.description)}" />
    <meta name="twitter:image" content="${image}" />
    <title>${esc(page.title)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet" />
    ${page.image ? `<link rel="preload" as="image" href="${prefix}${page.image}" />` : ""}
    <link rel="stylesheet" href="${prefix}styles.css?v=20260922-seo-premium" />
    <script type="application/ld+json">${json(schema)}</script>
  </head>`;
}

function header(prefix, page) {
  return `<body class="seo-page">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9MFWNKW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <header class="site-header" data-header>
      <a class="brand" href="${prefix}index.html" aria-label="MG Dermalab inicio"><span class="brand-mark">MG</span><span>Dermalab</span></a>
      <nav class="main-nav" id="main-nav" aria-label="Navegación principal"><a href="${prefix}index.html#catalogo">Productos</a><a href="${prefix}index.html#laboratorios">Laboratorios</a><a href="${prefix}index.html#nosotros">Nosotros</a><a href="${prefix}index.html#faq">FAQ</a></nav>
      <button class="mobile-menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-nav" data-menu-toggle><span></span><span></span></button>
      <a class="nav-cta" href="${prefix}index.html?producto=${page.slug}#contacto">Solicitar cotización</a>
    </header>`;
}

function visual(page, prefix) {
  if (page.image) return `<figure class="seo-product-visual"><img src="${prefix}${page.image}" alt="${esc(page.name)} disponible para cotización con MG Dermalab" width="${page.width}" height="${page.height}" fetchpriority="high" /></figure>`;
  return `<div class="seo-product-visual seo-product-signature" role="img" aria-label="${esc(page.name)} — ${esc(page.category)} — MG Dermalab"><span>MG Dermalab</span><p>${esc(page.category)}</p><strong>${esc(page.name)}</strong><small>${page.presentation ? esc(page.presentation) : "Distribución especializada"}</small></div>`;
}

function footer(prefix) {
  return `<footer class="site-footer seo-footer"><div class="footer-column footer-identity"><div class="footer-brand"><span class="brand-mark">MG</span><p>Dermalab</p></div><span>Distribución especializada para profesionales de la salud en México.</span></div><nav class="footer-column" aria-label="Líneas"><strong>Explorar</strong><a href="${prefix}isotretinoina">Isotretinoína</a><a href="${prefix}dysport">Dysport</a><a href="${prefix}restylane">Restylane</a><a href="${prefix}sculptra">Sculptra</a></nav><div class="footer-column"><strong>Contacto</strong><a href="https://wa.me/525654434495" target="_blank" rel="noopener">WhatsApp: 56 5443 4495</a><a href="mailto:mgdermalab@gmail.com">mgdermalab@gmail.com</a><a href="${prefix}privacidad.html">Aviso de privacidad</a></div></footer>
    <script src="${prefix}seo-pages.js" defer></script>
  </body>
</html>
`;
}

function productHtml(page, prefix) {
  const faq = faqFor(page);
  const waText = encodeURIComponent(`Hola, quiero consultar disponibilidad de ${page.name}${page.presentation ? ` (${page.presentation})` : ""} con MG Dermalab.`);
  const presentationLine = page.presentation ? `<p class="seo-presentation">${esc(page.presentation)}</p>` : "";
  const primaryFact = page.presentation
    ? `<div><span>Presentación</span><strong>${esc(page.presentation)}</strong></div>`
    : `<div><span>Cotización</span><strong>Atención personalizada</strong></div>`;
  return `${head(page, prefix, "product", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb"><a href="${prefix}index.html">Inicio</a><span aria-hidden="true">/</span><a href="${page.category.includes("Restylane") ? `${prefix}restylane` : `${prefix}index.html#catalogo`}">${esc(page.category)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span></nav>
      <section class="seo-hero">
        <div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)}</p><h1>${esc(page.name)}</h1>${presentationLine}<p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.presentation)}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">Consultar disponibilidad por WhatsApp</a><a class="seo-back-link" href="${prefix}index.html#catalogo">Volver al catálogo</a></div></div>
        ${visual(page, prefix)}
      </section>
      <section class="seo-facts" aria-label="Información comercial">${primaryFact}<div><span>Atención</span><strong>Médicos, clínicas y farmacias</strong></div><div><span>Disponibilidad</span><strong>Sujeta a confirmación</strong></div></section>
      <section class="seo-info-band"><div><p class="seo-kicker">Cotización directa</p><h2>La información necesaria, sin rodeos.</h2></div><p>${esc(page.note)} Comparte tu ciudad y cantidad requerida por WhatsApp para que nuestro equipo revise disponibilidad y condiciones de envío.</p></section>
      <section class="seo-faq" aria-labelledby="faq-title"><div class="seo-section-heading"><p class="seo-kicker">Antes de cotizar</p><h2 id="faq-title">Preguntas frecuentes</h2></div><div class="seo-faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
      <section class="seo-related" aria-labelledby="related-title"><div><p class="seo-kicker">También puede interesarte</p><h2 id="related-title">Explora productos relacionados</h2></div><nav class="seo-related-links" aria-label="Productos relacionados">${page.related.map(([slug, label]) => `<a href="${href(prefix, slug)}">${esc(label)}<span aria-hidden="true">→</span></a>`).join("")}</nav></section>
    </main>
    ${footer(prefix)}`;
}

function hubFaq(page) {
  return [
    [`¿Qué opciones incluye la categoría ${page.name}?`, `Esta página reúne ${page.items.map((i) => i[1]).join(", ")}. Consulta cada ficha para ver la presentación confirmada.`],
    ["¿La disponibilidad es inmediata?", "La disponibilidad se revisa al recibir cada solicitud y puede variar por producto y presentación."],
    ...commonFaq.slice(1)
  ];
}

function hubHtml(page, prefix) {
  const faq = hubFaq(page);
  const waText = encodeURIComponent(`Hola, quiero consultar la línea ${page.name} con MG Dermalab.`);
  return `${head(page, prefix, "hub", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb"><a href="${prefix}index.html">Inicio</a><span aria-hidden="true">/</span><span>${esc(page.category)}</span><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span></nav>
      <section class="seo-hero seo-hub-hero"><div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)} · Guía de línea</p><h1>${esc(page.name)}</h1><p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.items.map((i) => i[1]).join(", "))}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">Consultar la línea por WhatsApp</a><a class="seo-back-link" href="${prefix}index.html#catalogo">Volver al catálogo</a></div></div>${visual(page, prefix)}</section>
      <section class="seo-family" aria-labelledby="family-title"><div class="seo-section-heading"><p class="seo-kicker">Opciones disponibles</p><h2 id="family-title">Encuentra la ficha que buscas</h2><p>${esc(page.note)}</p></div><div class="seo-family-grid">${page.items.map(([slug, name, presentation], index) => `<a href="${prefix}${slug}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(name)}</strong><small>${esc(presentation)}</small><i aria-hidden="true">→</i></a>`).join("")}</div></section>
      <section class="seo-info-band"><div><p class="seo-kicker">Atención especializada</p><h2>Cotiza la opción correcta.</h2></div><p>Comparte el nombre del producto o variante, presentación, cantidad y ciudad. Nuestro equipo confirmará disponibilidad antes de continuar.</p></section>
      <section class="seo-faq" aria-labelledby="faq-title"><div class="seo-section-heading"><p class="seo-kicker">Información comercial</p><h2 id="faq-title">Preguntas frecuentes</h2></div><div class="seo-faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
    </main>
    ${footer(prefix)}`;
}

for (const page of [...pages, ...hubs]) {
  const isHub = hubs.includes(page);
  const render = isHub ? hubHtml : productHtml;
  const flat = render(page, "").replace(/[ \t]+$/gm, "");
  const nested = render(page, "../").replace(/[ \t]+$/gm, "");
  fs.writeFileSync(`${root}/${page.slug}.html`, flat);
  fs.mkdirSync(`${root}/${page.slug}`, {recursive: true});
  fs.writeFileSync(`${root}/${page.slug}/index.html`, nested);
}

console.log(`Generated ${pages.length + hubs.length} SEO pages in flat and directory forms.`);
