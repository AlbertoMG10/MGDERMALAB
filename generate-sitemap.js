const fs=require("fs");
const lastmod="2026-10-05";
const urls=["","dermatologia","medicina-estetica","control-de-peso","profesionales","farmacias","nosotros","contacto","productos-originales","envios","neotrex-vs-epuris-vs-vastionin","dysport-vs-botox","guia-restylane","neotrex","vastionin","epuris","isotretinoina","dysport","sculptra","restylane","restylane-kysse","restylane-lyft","restylane-refyne","restylane-defyne","restylane-contour","restylane-eyelight","restylane-skinboosters-vital","restylane-skinboosters-vital-light","tirzepatida","retatrutida","privacidad","terminos","devoluciones"];
const site="https://mgdermalab.mx";
fs.writeFileSync("sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(x=>`  <url><loc>${site}/${x}</loc><lastmod>${lastmod}</lastmod></url>`).join("\n")}\n</urlset>\n`);
