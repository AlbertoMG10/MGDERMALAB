const fs = require("fs");

const lastmod = new Date().toISOString().slice(0, 10);
const urls = [
  ["https://mgdermalab.mx/", "weekly", "1.0"],
  ["https://mgdermalab.mx/#catalogo", "weekly", "0.8"],
  ["https://mgdermalab.mx/#laboratorios", "weekly", "0.8"],
  ["https://mgdermalab.mx/#medicos", "weekly", "0.8"],
  ["https://mgdermalab.mx/#farmacias", "weekly", "0.8"],
  ["https://mgdermalab.mx/#faq", "monthly", "0.6"],
  ["https://mgdermalab.mx/#contacto", "weekly", "0.9"],
  ["https://mgdermalab.mx/privacidad.html", "yearly", "0.3"],
  ["https://mgdermalab.mx/terminos.html", "yearly", "0.3"],
  ["https://mgdermalab.mx/devoluciones.html", "yearly", "0.3"],
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ([loc, changefreq, priority]) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync("sitemap.xml", xml);
console.log(`sitemap.xml actualizado con ${urls.length} URLs.`);
