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
    slug: "neotrex", name: "Neotrex", category: "Dermatología", presentation: "10 mg · 20 mg", includeProductSchema: false,
    title: "Neotrex 10 mg y 20 mg (isotretinoína) | Distribuidor en México",
    description: "Neotrex isotretinoína 10 y 20 mg para médicos y farmacias. Envío a CDMX, Guadalajara, Monterrey y toda la República. Consulta disponibilidad por WhatsApp.",
    intro: "Neotrex en presentaciones de 10 mg y 20 mg, disponible mediante cotización y confirmación directa con nuestro equipo comercial.",
    image: "assets/neotrex-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Confirma la concentración y cantidad que necesitas para recibir una respuesta precisa.",
    imageAlt: "Neotrex isotretinoína 20 mg",
    related: [["isotretinoina", "Ver otras opciones de isotretinoína"], ["epuris", "Epuris"], ["vastionin", "Vastionin"]]
  },
  {
    slug: "epuris", name: "Epuris", category: "Dermatología", presentation: "10 mg · 20 mg", includeProductSchema: false,
    title: "Epuris 10 mg y 20 mg (isotretinoína) | Distribuidor en México",
    description: "Epuris isotretinoína 10 y 20 mg para médicos y farmacias. Envío a CDMX, Guadalajara, Monterrey y toda la República. Consulta disponibilidad por WhatsApp.",
    intro: "Epuris en 10 mg y 20 mg para solicitudes comerciales de profesionales y establecimientos de salud, sujeto a disponibilidad.",
    image: "assets/epuris-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Indica 10 mg o 20 mg al escribirnos; así podremos revisar existencias para la presentación correcta.",
    imageAlt: "Epuris isotretinoína 20 mg",
    related: [["isotretinoina", "Ver otras opciones de isotretinoína"], ["neotrex", "Neotrex"], ["vastionin", "Vastionin"]]
  },
  {
    slug: "vastionin", name: "Vastionin", category: "Dermatología", presentation: "10 mg · 20 mg", includeProductSchema: false,
    title: "Vastionin 10 mg y 20 mg (isotretinoína) | Distribuidor en México",
    description: "Vastionin isotretinoína 10 y 20 mg para médicos y farmacias. Envío a CDMX, Guadalajara, Monterrey y toda la República. Consulta disponibilidad por WhatsApp.",
    intro: "Vastionin en concentraciones de 10 mg y 20 mg, con atención comercial directa y disponibilidad sujeta a confirmación.",
    image: "assets/vastionin-20-premium-optimized.jpg", width: 900, height: 640,
    note: "Comparte concentración, número de piezas y destino para preparar tu cotización.",
    imageAlt: "Vastionin isotretinoína 20 mg",
    related: [["isotretinoina", "Ver otras opciones de isotretinoína"], ["neotrex", "Neotrex"], ["epuris", "Epuris"]]
  },
  {
    slug: "dysport", name: "Dysport", category: "Medicina estética", presentation: "300 U · 500 U",
    title: "Dysport 300 U y 500 U: precio para médicos en México | MG Dermalab",
    description: "Cotiza Dysport 300 U y 500 U (abobotulinumtoxinA, Galderma) con precio profesional para médicos y clínicas. Lote y caducidad verificados, envío nacional.",
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
    slug: "tirzepatida", name: "Tirzepatida", h1: "Tirzepatida 60 mg", category: "Línea especializada", presentation: "60 mg", includeProductSchema: false,
    title: "Tirzepatida 60 mg | Disponibilidad en México | MG Dermalab",
    description: "Consulta disponibilidad y cotización de Tirzepatida 60 mg con MG Dermalab. Atención a médicos, clínicas, farmacias y pacientes en todo México.",
    intro: "Información sobre la molécula tirzepatida y la presentación comercial de 60 mg que MG Dermalab maneja mediante cotización y confirmación de disponibilidad en México.",
    image: "assets/mg-tirzepatida-vial-alpha.png", width: 1122, height: 1402,
    note: "Comparte la cantidad requerida y tu ciudad para recibir atención comercial personalizada.",
    imageAlt: "Tirzepatida 60 mg MG Dermalab",
    related: [["retatrutida", "Retatrutida"], ["", "Catálogo MG Dermalab"]]
  },
  {
    slug: "retatrutida", name: "Retatrutida", category: "Línea especializada", presentation: "",
    title: "Retatrutida: agonista triple en investigación | MG Dermalab",
    description: "Conoce qué es la retatrutida, cómo activa los receptores GIP, GLP-1 y glucagón y cuál es su estatus actual de investigación clínica.",
    intro: "Una molécula investigacional que reúne actividad sobre tres sistemas receptores y se estudia dentro del desarrollo cardiometabólico de Lilly.",
    note: "Contenido educativo basado en información oficial de Lilly sobre su programa de investigación clínica.",
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
    slug: "isotretinoina", name: "Isotretinoína", category: "Dermatología", title: "Isotretinoína 10 mg y 20 mg: Neotrex, Epuris y Vastionin | MG Dermalab",
    description: "Compara las marcas de isotretinoína en México: Neotrex, Epuris y Vastionin en 10 y 20 mg. Distribución a médicos y farmacias con envío a todo el país.",
    intro: "Página temática de isotretinoína con las marcas y concentraciones que maneja MG Dermalab. Consulta cada ficha y confirma disponibilidad antes de cotizar.",
    image: "assets/mg-dermalab-linea-dermatologia-1200.jpg", width: 1200, height: 800,
    items: [["neotrex", "Neotrex", "10 mg · 20 mg"], ["epuris", "Epuris", "10 mg · 20 mg"], ["vastionin", "Vastionin", "10 mg · 20 mg"]],
    note: "Compara Neotrex, Vastionin y Epuris en 10 mg y 20 mg y abre la ficha específica de cada marca.",
    imageAlt: "Línea de isotretinoína de MG Dermalab",
    familyTitle: "Marcas disponibles",
    familyKicker: "Presentaciones de 10 mg y 20 mg"
  },
  {
    slug: "restylane", name: "Restylane", category: "Medicina estética", title: "Restylane en México: Kysse, Lyft, Refyne, Defyne y más | MG Dermalab",
    description: "Línea completa Restylane de Galderma para médicos: Kysse para labios, Lyft, Contour, Eyelight y Skinboosters. Lote verificado y envío nacional. Cotiza hoy.",
    intro: "Explora la familia Restylane disponible para cotización profesional. Cada variante cuenta con una página comercial específica.",
    image: "assets/restylane-family.avif", width: 1200, height: 800,
    items: restylaneVariants.map(([slug, name, variant]) => [slug, name, variant]),
    note: "Selecciona una variante para consultar su ficha comercial y solicitar disponibilidad."
  }
];

const productContent = {
  neotrex: {
    subtitle: "Isotretinoína oral para atención dermatológica especializada.",
    what: "Neotrex es una marca de isotretinoína en cápsulas. Pertenece al grupo de los retinoides y su uso requiere prescripción y seguimiento por un profesional de la salud.",
    use: "La isotretinoína oral se utiliza en formas graves de acné que no han respondido adecuadamente a tratamientos convencionales. La valoración, indicación y seguimiento corresponden al médico tratante.",
    mechanism: "La isotretinoína actúa sobre procesos relacionados con la actividad de las glándulas sebáceas. El mecanismo completo es complejo, por lo que esta página no sustituye la información para prescribir ni la valoración médica.",
    faq: [
      ["¿Qué presentaciones de Neotrex maneja MG Dermalab?", "Manejamos Neotrex de 10 mg y 20 mg, sujeto a disponibilidad."],
      ["¿Manejan Neotrex 10 mg y 20 mg?", "Sí. Puedes solicitar cotización de cualquiera de las dos presentaciones y confirmar existencia con nuestro equipo."],
      ["¿Cómo solicito una cotización de Neotrex?", "Comparte presentación, cantidad y ciudad por WhatsApp o mediante el formulario."],
      ["¿Realizan envíos nacionales de Neotrex?", "Sí. La cobertura, el costo y el plazo estimado se confirman al preparar la cotización."]
    ],
    source: ["DailyMed · isotretinoína", "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31f62a49-4c6d-4ce3-a0ca-d159562370b1"]
  },
  epuris: {
    subtitle: "Isotretinoína en cápsulas para solicitudes profesionales.",
    what: "Epuris es isotretinoína oral en cápsulas y forma parte de los retinoides sistémicos utilizados en dermatología.",
    use: "Su documentación oficial describe el uso de isotretinoína en acné grave. No se publican pautas de tratamiento: la selección de paciente y el seguimiento son responsabilidad médica.",
    mechanism: "La isotretinoína reduce la actividad de las glándulas sebáceas y modifica procesos implicados en el acné. Su utilización exige control profesional por su perfil de seguridad.",
    faq: [
      ["¿Epuris está disponible en 10 mg y 20 mg?", "MG Dermalab consulta ambas presentaciones, siempre sujetas a existencia vigente."],
      ["¿Cómo cotizo Epuris?", "Indica 10 mg o 20 mg, cantidad y ciudad por WhatsApp o mediante el formulario."],
      ["¿Atienden pacientes además de médicos y clínicas?", "Sí. Atendemos médicos, clínicas, farmacias y pacientes particulares, con los requisitos aplicables a cada producto."],
      ["¿Realizan envíos nacionales de Epuris?", "Sí. La cobertura, el costo y el plazo estimado se confirman antes de procesar el pedido."]
    ],
    source: ["Health Canada · Epuris", "https://health-products.canada.ca/noc-ac/nocInfo?no=35348"]
  },
  vastionin: {
    subtitle: "Isotretinoína de 10 mg y 20 mg con cotización directa.",
    what: "Vastionin es una marca de isotretinoína en cápsulas dentro de la línea dermatológica de MG Dermalab.",
    use: "La isotretinoína oral se reserva para formas graves de acné y requiere indicación médica. Esta página ofrece información general y comercial, no consejo médico individual.",
    mechanism: "La isotretinoína interviene en la actividad sebácea y otros procesos relacionados con el acné. El tratamiento debe individualizarse y vigilarse profesionalmente.",
    faq: [
      ["¿Qué concentraciones de Vastionin manejan?", "Se consultan presentaciones de 10 mg y 20 mg."],
      ["¿La disponibilidad de Vastionin es inmediata?", "La existencia se confirma al recibir presentación, cantidad y destino."],
      ["¿Realizan envíos nacionales de Vastionin?", "Sí, con cobertura y condiciones confirmadas en la cotización."],
      ["¿Cómo solicito una cotización de Vastionin?", "Indica 10 mg o 20 mg, cantidad y ciudad por WhatsApp o mediante el formulario."]
    ],
    source: ["DailyMed · isotretinoína", "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31f62a49-4c6d-4ce3-a0ca-d159562370b1"]
  },
  dysport: {
    subtitle: "Toxina botulínica tipo A en 300 U y 500 U.",
    what: "Dysport es abobotulinumtoxinA, una preparación de toxina botulínica tipo A para uso por profesionales de la salud capacitados.",
    use: "La documentación oficial contempla indicaciones terapéuticas y estéticas específicas. La selección de indicación, dosis y técnica corresponde exclusivamente al profesional tratante.",
    mechanism: "Actúa inhibiendo la liberación de acetilcolina en la unión neuromuscular, lo que reduce temporalmente la actividad muscular en el área tratada.",
    faq: [
      ["¿Dysport está disponible en 300 U y 500 U?", "Sí, ambas presentaciones se consultan con disponibilidad sujeta a confirmación."],
      ["¿Las unidades de Dysport equivalen a otras toxinas?", "No. La información oficial señala que sus unidades no son intercambiables con las de otros productos."],
      ["¿Quién debe administrar Dysport?", "Únicamente profesionales de la salud con capacitación y autorización aplicables."],
      ["¿Cómo cotizo Dysport para una clínica?", "Indica presentación, número de piezas y ciudad por WhatsApp."]
    ],
    source: ["Galderma · Dysport PI", "https://www.galderma.com/us/sites/default/files/2020-11/1066038%20Dysport%20PI.pdf"]
  },
  sculptra: {
    subtitle: "Bioestimulador inyectable para práctica estética profesional.",
    what: "Sculptra es un dispositivo médico inyectable basado en micropartículas de ácido poli-L-láctico, destinado a uso estético profesional.",
    use: "La documentación oficial describe su uso para aumentar volumen en áreas deprimidas y mejorar determinados pliegues y aspectos de la calidad de la piel. La indicación concreta depende de la regulación local y del profesional tratante.",
    mechanism: "El ácido poli-L-láctico actúa como estimulador de colágeno y contribuye gradualmente al soporte estructural de la piel.",
    faq: [
      ["¿Sculptra es un relleno de ácido hialurónico?", "No. Su componente principal es ácido poli-L-láctico."],
      ["¿Sculptra requiere aplicación profesional?", "Sí. Debe ser administrado por profesionales capacitados y conforme a la regulación aplicable."],
      ["¿MG Dermalab atiende clínicas que buscan Sculptra?", "Sí. La disponibilidad y las condiciones comerciales se revisan por solicitud."],
      ["¿Cómo solicito una cotización de Sculptra?", "Comparte cantidad y ciudad; la presentación comercial se confirma con el asesor."]
    ],
    source: ["Galderma · Sculptra IFU", "https://www.galderma.com/sites/default/files/2025-12/IFU_Sculptra_MDR.pdf"]
  },
  tirzepatida: {
    subtitle: "Agonismo dual GIP/GLP-1 explicado con claridad.",
    what: "La tirzepatida es una molécula agonista dual: una sola molécula se une y activa los receptores de GIP y GLP-1. Estos receptores responden a señales hormonales que participan en la regulación de la glucosa, el apetito y la ingesta de energía.",
    mechanism: "La activación de GIP y GLP-1 participa en la secreción de insulina dependiente de glucosa y en la regulación del glucagón. También interviene en circuitos relacionados con el apetito, la ingesta energética y la regulación metabólica. En términos sencillos, combina actividad sobre dos vías receptoras complementarias.",
    use: "La molécula tirzepatida forma parte de medicamentos que, cuando cuentan con la autorización correspondiente, se utilizan en indicaciones metabólicas específicas como diabetes tipo 2 o control crónico del peso. Cada uso autorizado pertenece al medicamento, presentación y registro sanitario concretos; no a la molécula de manera aislada.",
    regulatory: "Las indicaciones autorizadas dependen del medicamento, presentación y registro sanitario correspondiente. La información sobre la molécula no implica que todas las presentaciones comerciales de tirzepatida tengan las mismas autorizaciones.",
    presentationCopy: "MG Dermalab distribuye una presentación comercial identificada como tirzepatida 60 mg. Su disponibilidad se confirma directamente y no debe asumirse equivalencia con Mounjaro, Zepbound u otra marca o presentación autorizada.",
    faq: [
      ["¿Qué presentación de tirzepatida maneja MG Dermalab?", "MG Dermalab maneja una presentación comercial identificada como tirzepatida 60 mg."],
      ["¿Cómo puedo consultar disponibilidad de tirzepatida?", "Comparte la cantidad y tu ciudad por WhatsApp o mediante el formulario. La existencia se confirma de manera individual."],
      ["¿Realizan envíos de tirzepatida en México?", "MG Dermalab coordina envíos nacionales; cobertura, costo y plazo se confirman al cotizar."],
      ["¿Puedo solicitar una cotización por WhatsApp?", "Sí. Nuestro equipo revisa la solicitud y comparte la información comercial disponible para el producto específico."],
      ["¿La presentación de 60 mg equivale a Mounjaro o Zepbound?", "No debe asumirse equivalencia. Son productos y presentaciones con documentación propia."]
    ],
    source: ["FDA · tirzepatida, información para prescribir", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/217806s002lbl.pdf"]
  },
  retatrutida: {
    subtitle: "Una sola molécula, tres sistemas receptores en estudio.",
    what: "Retatrutida es una molécula investigacional de Lilly diseñada como agonista triple de los receptores GIP, GLP-1 y glucagón. A diferencia de un agonista dual, incorpora actividad sobre un tercer sistema receptor dentro de una sola molécula.",
    mechanism: "Activa los receptores de GIP y GLP-1, relacionados con señales incretínicas y regulación metabólica, y añade actividad sobre el receptor de glucagón. Esta combinación triple se investiga para comprender su efecto integrado sobre distintos procesos cardiometabólicos.",
    use: "Retatrutida se está investigando y ha sido evaluada en ensayos clínicos de Lilly en obesidad o sobrepeso, diabetes tipo 2 y otros trastornos cardiometabólicos incluidos en su programa, entre ellos resultados cardiovasculares y renales. Estos estudios evalúan su seguridad y eficacia; no constituyen una indicación aprobada.",
    regulatory: "Retatrutida continúa siendo una molécula investigacional y no debe presentarse como un medicamento aprobado para uso público.",
    faq: [
      ["¿Retatrutida está aprobada?", "No. Lilly la describe actualmente como una molécula investigacional no aprobada por ninguna agencia regulatoria."],
      ["¿Qué significa agonista triple?", "Significa que una sola molécula activa tres receptores: GIP, GLP-1 y glucagón."],
      ["¿En qué áreas se está investigando?", "Lilly informa estudios en obesidad o sobrepeso, diabetes tipo 2 y otros resultados cardiometabólicos, cardiovasculares y renales."],
      ["¿Retatrutida está disponible para uso público?", "No. Lilly indica que permanece en investigación clínica y no está aprobada por ninguna agencia regulatoria."]
    ],
    source: ["Lilly · estatus de retatrutida", "https://www.lilly.com/news/stories/what-to-know-about-retatrutide"]
  }
};

const restylaneContent = {
  "restylane-kysse": ["Ácido hialurónico diseñado para la zona labial.", "Restylane Kysse es un gel inyectable de ácido hialurónico reticulado de origen no animal con lidocaína.", "Su documentación oficial describe aumento de labios y corrección de líneas periorales superiores.", "Su gel utiliza tecnología OBT/XpresHAn, desarrollada para aportar flexibilidad y acompañar el movimiento.", "Galderma · Kysse IFU", "https://www.galderma.com/sites/default/files/2025-03/90-85207-01_IFU_Restylane_Kysse-2023.pdf"],
  "restylane-lyft": ["Ácido hialurónico de soporte dentro de la familia Restylane.", "Restylane Lyft es un gel inyectable de ácido hialurónico de tecnología NASHA.", "La documentación oficial contempla corrección de pliegues, aumento de mejillas y otras indicaciones según la autorización local.", "La tecnología NASHA produce un gel de soporte estructural para aplicación profesional.", "Galderma · Restylane", "https://www.galderma.com/mx/restylane"],
  "restylane-refyne": ["Flexibilidad para corrección profesional de pliegues faciales.", "Restylane Refyne es un relleno inyectable de ácido hialurónico de la tecnología OBT/XpresHAn.", "Su documentación oficial lo describe para la corrección de arrugas y pliegues faciales de moderados a severos.", "La reticulación OBT busca equilibrar soporte y flexibilidad en áreas con movimiento.", "Galderma · Restylane", "https://www.galderma.com/mx/restylane"],
  "restylane-defyne": ["Soporte definido dentro del portafolio Restylane.", "Restylane Defyne es un gel de ácido hialurónico inyectable de tecnología OBT/XpresHAn.", "La documentación oficial contempla pliegues faciales profundos y, en algunos mercados, aumento de la región del mentón.", "Su tecnología equilibra firmeza y flexibilidad para áreas faciales dinámicas.", "Galderma · Restylane", "https://www.galderma.com/mx/restylane"],
  "restylane-contour": ["Gel de ácido hialurónico para contorno del tercio medio.", "Restylane Contour es un relleno inyectable de ácido hialurónico de la familia Restylane.", "La documentación estadounidense lo describe para aumento de mejillas y corrección de deficiencias del contorno del tercio medio; la indicación local debe confirmarse.", "Su formulación utiliza tecnología XpresHAn para combinar soporte y movimiento.", "Galderma · Contour", "https://www.galderma.com/news/galderma-receives-fda-approval"],
  "restylane-eyelight": ["Ácido hialurónico para uso profesional en la zona infraorbitaria.", "Restylane Eyelight es un gel inyectable de ácido hialurónico de tecnología NASHA.", "La documentación estadounidense lo describe para mejorar el hundimiento infraorbitario; la indicación aplicable en México debe verificarse.", "La tecnología NASHA crea un gel firme de ácido hialurónico estabilizado.", "Galderma · Eyelight", "https://www.galderma.com/GaldermaFDAapprovalforRestylaneEyelight"],
  "restylane-skinboosters-vital": ["Skinbooster de ácido hialurónico para práctica profesional.", "Restylane Skinboosters Vital forma parte de la línea de ácido hialurónico de Galderma y aparece en el portafolio mexicano.", "Se integra en tratamientos profesionales orientados a la calidad de la piel. La indicación concreta depende de la información de uso local.", "El ácido hialurónico se administra mediante microinyecciones por profesionales capacitados; esta página no publica técnica ni pauta.", "Galderma México · Restylane", "https://www.galderma.com/mx/restylane"],
  "restylane-skinboosters-vital-light": ["Skinbooster de ácido hialurónico de la familia Restylane.", "Restylane Skinboosters Vital Light es un gel inyectable de ácido hialurónico con lidocaína en su documentación internacional.", "Se describe dentro de la línea Skinboosters para tratamientos profesionales de calidad de piel; la disponibilidad e indicación local deben confirmarse.", "Su acción se basa en la presencia de ácido hialurónico estabilizado administrado por un profesional capacitado.", "Galderma · Vital Light IFU", "https://www.galderma.com/sites/default/files/2025-03/90-95981-01_IFU_Restylane_SB_Vital_Light_Lidocaine%20-2023.pdf"]
};

for (const page of pages) {
  if (productContent[page.slug]) Object.assign(page, productContent[page.slug]);
  if (restylaneContent[page.slug]) {
    const [subtitle, what, use, mechanism, sourceName, sourceUrl] = restylaneContent[page.slug];
    Object.assign(page, {
      subtitle, what, use, mechanism, source: [sourceName, sourceUrl],
      faq: [
        [`¿Qué es ${page.name}?`, what],
        [`¿Forma parte de la familia Restylane?`, "Sí. Es una variante del portafolio de ácido hialurónico Restylane."],
        ["¿Quién debe aplicarlo?", "Exclusivamente profesionales de la salud capacitados y conforme a la regulación aplicable."],
        [`¿Cómo consulto disponibilidad de ${page.name}?`, "Comparte nombre de la variante, cantidad y ciudad por WhatsApp."]
      ]
    });
  }
}

Object.assign(hubs[0], {
  subtitle: "Guía comercial de marcas y concentraciones de isotretinoína.",
  what: "La isotretinoína es un retinoide oral relacionado con la vitamina A y sujeto a prescripción médica.",
  use: "Se utiliza en formas graves de acné que no han respondido a tratamientos convencionales. No sustituye la valoración individual del dermatólogo.",
  mechanism: "Reduce la actividad de las glándulas sebáceas y participa en otros procesos relacionados con el acné. Requiere seguimiento profesional por su perfil de seguridad.",
  source: ["DailyMed · isotretinoína", "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=31f62a49-4c6d-4ce3-a0ca-d159562370b1"],
  faq: [
    ["¿Qué marcas de isotretinoína maneja MG Dermalab?", "MG Dermalab maneja Neotrex, Vastionin y Epuris, con disponibilidad sujeta a confirmación."],
    ["¿Qué presentaciones de isotretinoína tienen disponibles?", "Se consultan presentaciones de 10 mg y 20 mg. Cada ficha indica las concentraciones correspondientes."],
    ["¿Atienden pacientes además de médicos y clínicas?", "Sí. Atendemos médicos, clínicas, farmacias y pacientes particulares, con los requisitos aplicables a cada producto."],
    ["¿Cómo consulto disponibilidad de isotretinoína?", "Selecciona la marca y comparte presentación, cantidad y ciudad por WhatsApp o mediante el formulario."]
  ]
});

Object.assign(hubs[1], {
  subtitle: "Portafolio profesional de rellenos de ácido hialurónico.",
  what: "Restylane es una familia de geles inyectables de ácido hialurónico para medicina estética profesional.",
  use: "El portafolio reúne variantes con características e indicaciones diferentes para labios, pliegues, contorno y calidad de piel, según la autorización aplicable.",
  mechanism: "Las tecnologías NASHA y OBT estabilizan y reticulan el ácido hialurónico para obtener geles con distintos niveles de soporte y flexibilidad.",
  source: ["Galderma México · Restylane", "https://www.galderma.com/mx/restylane"]
});

const esc = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function href(prefix, slug) {
  return slug ? `${prefix}${slug}` : `${prefix}${slug === "" ? "dermatologia" : slug}`;
}

function breadcrumbTrail(page, type) {
  if (["neotrex", "vastionin", "epuris"].includes(page.slug)) {
    return [
      ["Inicio", `${site}/`],
      ["Dermatología", `${site}/dermatologia`],
      ["Isotretinoína", `${site}/isotretinoina`],
      [page.name, `${site}/${page.slug}`]
    ];
  }
  if (["tirzepatida", "retatrutida"].includes(page.slug)) {
    return [["Inicio", `${site}/`], ["Control de peso", `${site}/control-de-peso`], [page.h1 || page.name, `${site}/${page.slug}`]];
  }
  if (page.category.includes("Restylane")) return [["Inicio", `${site}/`], ["Medicina estética", `${site}/medicina-estetica`], ["Restylane", `${site}/restylane`], [page.name, `${site}/${page.slug}`]];
  if (["dysport","sculptra"].includes(page.slug)) return [["Inicio", `${site}/`], ["Medicina estética", `${site}/medicina-estetica`], [page.name, `${site}/${page.slug}`]];
  return [["Inicio", `${site}/`], [page.category, `${site}/${page.category === "Dermatología" ? "dermatologia" : "medicina-estetica"}`], [page.name, `${site}/${page.slug}`]];
}

function breadcrumbHref(prefix, url) {
  if (url === `${site}/`) return `${prefix || "/"}`;
  if (url.startsWith(`${site}/#`)) return `${prefix || "/"}${url.slice(`${site}/`.length)}`;
  return url.replace(`${site}/`, prefix);
}

function faqFor(page) {
  if (page.faq) return page.faq;
  const first = !page.presentation
    ? [`¿Cómo consulto disponibilidad de ${page.name}?`, "Comparte la cantidad requerida y tu ciudad por WhatsApp. Un asesor revisará la solicitud y responderá con la información comercial disponible."]
    : [`¿Qué presentación de ${page.name} manejan?`, `Manejamos ${page.presentation.replace(/ · /g, ", ")}. La disponibilidad se confirma al momento de cotizar.`];
  return [first, ...commonFaq];
}

function storySections(page) {
  const isMetabolicFeature = page.slug === "tirzepatida" || page.slug === "retatrutida";
  const sections = isMetabolicFeature
    ? [[`¿Qué es ${page.name}?`, page.what], ["¿Cómo funciona?", page.mechanism], [page.slug === "retatrutida" ? "¿Qué se está investigando?" : "¿Para qué se utiliza la molécula?", page.use]]
    : [[`¿Qué es ${page.name}?`, page.what], ["¿Para qué se utiliza?", page.use], ["¿Cómo funciona?", page.mechanism]];
  return `<section class="seo-story-stack" aria-label="Información de ${esc(page.name)}">${sections.map(([title, copy], index) => `<article class="seo-story"><span class="seo-story-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h2>${esc(title)}</h2><p>${esc(copy)}</p></div></article>`).join("")}<p class="seo-source">Fuente principal: <a href="${esc(page.source[1])}" target="_blank" rel="noopener noreferrer">${esc(page.source[0])}</a></p></section>`;
}

function presentations(page) {
  if (page.slug === "retatrutida") {
    return `<section class="seo-presentations" aria-labelledby="presentations-title"><div class="seo-section-heading"><p class="seo-kicker">Programa clínico</p><h2 id="presentations-title">Áreas de investigación</h2><p>Lilly mantiene un programa clínico que evalúa la molécula en diferentes contextos cardiometabólicos.</p></div><div class="seo-presentation-list"><span>Obesidad y sobrepeso</span><span>Diabetes tipo 2</span><span>Resultados cardiovasculares y renales</span></div></section>`;
  }
  if (page.slug === "tirzepatida") {
    return `<section class="seo-presentations" aria-labelledby="presentations-title"><div class="seo-section-heading"><p class="seo-kicker">Presentación MG Dermalab</p><h2 id="presentations-title">Tirzepatida 60 mg</h2><p>${esc(page.presentationCopy)}</p></div><div class="seo-presentation-list"><span>60 mg</span><span>Disponibilidad sujeta a confirmación</span></div></section>`;
  }
  const isRestylane = page.category.includes("Restylane");
  const items = page.presentation ? page.presentation.split(" · ") : [];
  const labels = isRestylane ? [] : items;
  return `<section class="seo-presentations" aria-labelledby="presentations-title"><div class="seo-section-heading"><p class="seo-kicker">Información comercial</p><h2 id="presentations-title">Presentaciones disponibles</h2><p>Mostramos únicamente las presentaciones confirmadas en nuestro catálogo. La existencia se valida al solicitar cotización.</p></div><div class="seo-presentation-list">${labels.length ? labels.map((item) => `<span>${esc(item)}</span>`).join("") : `<span>La presentación comercial se confirma al cotizar</span>`}</div></section>`;
}

function distribution(page) {
  if (page.slug === "retatrutida") return "";
  return `<section class="seo-distribution" aria-labelledby="distribution-title"><div><p class="seo-kicker">MG Dermalab</p><h2 id="distribution-title">Distribución profesional en México</h2><p>${esc(page.note)} Atendemos solicitudes de profesionales de la salud, clínicas y farmacias cuando corresponde.</p></div><dl><div><dt>Cotización</dt><dd>Condiciones comerciales según producto y volumen.</dd></div><div><dt>Cobertura</dt><dd>Envíos nacionales sujetos a validación de destino.</dd></div><div><dt>Disponibilidad</dt><dd>Existencia y presentación se confirman antes de continuar.</dd></div></dl></section>`;
}

function regulatoryNote(page) {
  if (!page.regulatory) return "";
  const kicker = page.slug === "retatrutida" ? "Estatus actual" : "Aclaración regulatoria";
  const title = page.slug === "retatrutida" ? "Investigación clínica en curso" : "La molécula y la presentación no son lo mismo";
  return `\n      <aside class="seo-regulatory-note" aria-labelledby="regulatory-title"><p class="seo-kicker">${kicker}</p><div><h2 id="regulatory-title">${title}</h2><p>${esc(page.regulatory)}</p></div></aside>`;
}


function trustBlocks(page) {
  if (["tirzepatida", "retatrutida"].includes(page.slug)) return "";
  const active = page.category.includes("Restylane") ? "Ácido hialurónico" : page.slug === "dysport" ? "AbobotulinumtoxinA" : page.slug === "sculptra" ? "Ácido poli-L-láctico" : ["neotrex","epuris","vastionin"].includes(page.slug) ? "Isotretinoína" : "Dato publicado en la ficha";
  const lab = page.category.includes("Restylane") || ["dysport","sculptra"].includes(page.slug) ? "<div><dt>Laboratorio</dt><dd>Galderma</dd></div>" : "";
  return `<section class="seo-distribution" aria-labelledby="technical-title"><div><p class="seo-kicker">Información del producto</p><h2 id="technical-title">Ficha técnica</h2><p>Datos comerciales ya publicados por MG Dermalab.</p></div><dl>${lab}<div><dt>Principio activo</dt><dd>${esc(active)}</dd></div><div><dt>Presentaciones</dt><dd>${esc(page.presentation || "Confirmar al cotizar")}</dd></div></dl></section><section class="seo-story-stack"><article class="seo-story"><span class="seo-story-index">✓</span><div><h2>Cómo garantizamos producto original</h2><p>Revisamos lote, caducidad y empaque antes del envío y trabajamos con laboratorios reconocidos. <a href="${page.prefix || ""}productos-originales">Conoce nuestro proceso de revisión.</a></p></div></article><article class="seo-story"><span class="seo-story-index">MX</span><div><h2>Envíos a toda la República Mexicana</h2><p>Coordinamos cobertura, costo y tiempo antes de procesar el pedido. <a href="${page.prefix || ""}envios">Consulta cómo coordinamos los envíos.</a></p></div></article></section>`;
}

function finalCta(page, waText) {
  const isInvestigational = page.slug === "retatrutida";
  const title = isInvestigational ? "Consulta información y estatus" : "Consulta disponibilidad y cotización";
  const label = isInvestigational ? "Consultar información por WhatsApp" : "Solicitar cotización por WhatsApp";
  return `<section class="seo-final-cta"><div><p class="seo-kicker">Atención directa</p><h2>${title}</h2><p>${isInvestigational ? "Nuestro equipo puede orientarte sobre la información pública disponible. Retatrutida continúa en investigación y no se comercializa como tratamiento aprobado." : "Comparte la presentación, cantidad y ciudad. Nuestro equipo revisará tu solicitud y confirmará las opciones disponibles."}</p></div><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.presentation || "No especificada")}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">${label}</a></section>`;
}

function head(page, prefix, type, faq) {
  const url = `${site}/${page.slug}`;
  const image = page.image ? `${site}/${page.image}` : `${site}/assets/hero-mg-dermalab-grafito-1600.jpg`;
  const includeSubject = true;
  const subject = type === "hub"
    ? {"@type": "CollectionPage", "@id": `${url}#subject`, name: page.name, description: page.intro, url, hasPart: page.items.map(([slug, name]) => ({"@type": "WebPage", name, url: `${site}/${slug}`}))}
    : {"@type": "Product", "@id": `${url}#subject`, name: page.name, category: page.category, description: page.intro, url, brand: {"@type":"Brand", name: page.category.includes("Restylane") || ["dysport","sculptra"].includes(page.slug) ? "Galderma" : page.name}, ...(page.image ? {image} : {})};
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {"@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, isPartOf: {"@id": `${site}/#website`}, ...(includeSubject ? {about: {"@id": `${url}#subject`}} : {})},
      subject,
      {"@type": "BreadcrumbList", itemListElement: breadcrumbTrail(page, type).map(([name, item], index) => ({"@type": "ListItem", position: index + 1, name, item}))},
      {"@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({"@type": "Question", name: q, acceptedAnswer: {"@type": "Answer", text: a}}))}
    ].filter(Boolean)
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
  return `<body class="seo-page${page.slug === "isotretinoina" ? " seo-isotretinoina" : ""}">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9MFWNKW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
    <header class="site-header" data-header>
      <a class="brand" href="${prefix || "/"}" aria-label="MG Dermalab inicio"><span class="brand-mark">MG</span><span>Dermalab</span></a>
      <nav class="main-nav" id="main-nav" aria-label="Navegación principal"><a href="${prefix}dermatologia">Dermatología</a><a href="${prefix}medicina-estetica">Medicina estética</a><a href="${prefix}control-de-peso">Control de peso</a><a href="${prefix}profesionales">Profesionales</a><a href="${prefix}farmacias">Farmacias</a><a href="${prefix}nosotros">Nosotros</a><a href="${prefix}contacto">Contacto</a></nav>
      <button class="mobile-menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="main-nav" data-menu-toggle><span></span><span></span></button>
      <a class="nav-cta" href="${prefix || "/"}?producto=${page.slug}#contacto">Solicitar cotización</a>
    </header>`;
}

function visual(page, prefix) {
  if (page.image) return `<figure class="seo-product-visual"><img src="${prefix}${page.image}" alt="${esc(page.imageAlt || `${page.name} disponible para cotización con MG Dermalab`)}" width="${page.width}" height="${page.height}" fetchpriority="high" /></figure>`;
  const signature = page.slug === "retatrutida" ? "Investigación clínica" : page.presentation ? esc(page.presentation) : "Distribución especializada";
  return `<div class="seo-product-visual seo-product-signature" role="img" aria-label="${esc(page.name)} — ${esc(page.category)} — MG Dermalab"><span>MG Dermalab</span><p>${esc(page.category)}</p><strong>${esc(page.name)}</strong><small>${signature}</small></div>`;
}

function footer(prefix) {
  return `<footer class="site-footer seo-footer"><div class="footer-column footer-identity"><div class="footer-brand"><span class="brand-mark">MG</span><p>Dermalab</p></div><span>Distribución especializada para médicos, clínicas y farmacias en México.</span></div><nav class="footer-column" aria-label="Empresa"><strong>Empresa</strong><a href="${prefix}nosotros">Nosotros</a><a href="${prefix}contacto">Contacto</a><a href="${prefix}productos-originales">Producto original</a><a href="${prefix}envios">Envíos</a></nav><nav class="footer-column" aria-label="Clientes"><strong>Clientes</strong><a href="${prefix}profesionales">Profesionales</a><a href="${prefix}farmacias">Farmacias</a><a href="${prefix}dermatologia">Dermatología</a><a href="${prefix}medicina-estetica">Medicina estética</a></nav><div class="footer-column"><strong>Contacto</strong><a href="https://wa.me/525654434495" target="_blank" rel="noopener">WhatsApp: 56 5443 4495</a><a href="mailto:mgdermalab@gmail.com">mgdermalab@gmail.com</a><a href="${prefix}privacidad">Aviso de privacidad</a></div></footer>
    <script src="${prefix}seo-pages.js" defer></script>
  </body>
</html>
`;
}

function productHtml(page, prefix) {
  const faq = faqFor(page);
  const isInvestigational = page.slug === "retatrutida";
  const waText = encodeURIComponent(isInvestigational ? `Hola, quiero consultar información sobre el estatus de ${page.name}.` : `Hola, quiero consultar disponibilidad de ${page.name}${page.presentation ? ` (${page.presentation})` : ""} con MG Dermalab.`);
  const heroCta = isInvestigational ? "Consultar información por WhatsApp" : "Consultar disponibilidad por WhatsApp";
  const presentationLine = page.presentation && !page.h1 ? `<p class="seo-presentation">${esc(page.presentation)}</p>` : "";
  const breadcrumb = breadcrumbTrail(page, "product");
  const usesSeoBreadcrumb = true;
  const breadcrumbMarkup = usesSeoBreadcrumb
    ? breadcrumb.map(([name, url], index) => index === breadcrumb.length - 1 ? `<span aria-current="page">${esc(name)}</span>` : `<a href="${breadcrumbHref(prefix, url)}">${esc(name)}</a><span aria-hidden="true">/</span>`).join("")
    : `<a href="${prefix || "/"}">Inicio</a><span aria-hidden="true">/</span><a href="${page.category.includes("Restylane") ? `${prefix}restylane` : `${prefix || "/"}#catalogo`}">${esc(page.category)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span>`;
  return `${head(page, prefix, "product", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb">${breadcrumbMarkup}</nav>
      <section class="seo-hero seo-hero-premium">
        <div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)}</p><h1>${esc(page.h1 || page.name)}</h1>${presentationLine}<p class="seo-subtitle">${esc(page.subtitle)}</p><p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.presentation || "No especificada")}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">${heroCta}</a><a class="seo-back-link" href="${prefix}${page.category === "Dermatología" ? "dermatologia" : page.category.includes("Control") || ["tirzepatida","retatrutida"].includes(page.slug) ? "control-de-peso" : "medicina-estetica"}">Volver a la línea</a></div></div>
        ${visual(page, prefix)}
      </section>
      ${storySections(page)}
      ${presentations(page)}
      ${page.slug === "dysport" ? `<section class="seo-story-stack"><article class="seo-story"><span class="seo-story-index">$</span><div><h2>¿Cuánto cuesta Dysport?</h2><p>El precio depende de la presentación (300 U o 500 U) y del volumen solicitado. No publicamos precios porque cada cuenta profesional recibe una cotización según sus necesidades. <a href="https://wa.me/525654434495" target="_blank" rel="noopener">Solicitar cotización por WhatsApp.</a></p><p><a href="${prefix}dysport-vs-botox">Consulta la comparativa profesional entre Dysport y Botox.</a></p></div></article></section>` : ""}
      ${distribution(page)}${trustBlocks({...page, prefix})}${regulatoryNote(page)}
      <section class="seo-faq" aria-labelledby="faq-title"><div class="seo-section-heading"><p class="seo-kicker">Antes de cotizar</p><h2 id="faq-title">Preguntas frecuentes</h2></div><div class="seo-faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
      <section class="seo-related" aria-labelledby="related-title"><div><p class="seo-kicker">También puede interesarte</p><h2 id="related-title">Explora productos relacionados</h2></div><nav class="seo-related-links" aria-label="Productos relacionados">${page.related.map(([slug, label]) => `<a href="${href(prefix, slug)}">${esc(label)}<span aria-hidden="true">→</span></a>`).join("")}</nav></section>
      ${finalCta(page, waText)}
    </main>
    ${footer(prefix)}`;
}


function isotretinoinaExpansion(page, prefix) {
  if (page.slug !== "isotretinoina") return "";
  return `<section class="seo-story-stack" aria-label="Guía comercial de isotretinoína"><article class="seo-story"><span class="seo-story-index">03</span><div><h2>Cómo usar esta guía de marcas</h2><p>Esta página funciona como punto de entrada a las tres marcas publicadas por MG Dermalab. La ficha de cada marca reúne su presentación comercial, enlaces relacionados y el canal de cotización. Para evitar confusiones, la solicitud debe indicar marca y concentración; no sustituimos automáticamente una marca por otra ni asumimos equivalencias comerciales.</p></div></article><article class="seo-story"><span class="seo-story-index">04</span><div><h2>Información necesaria para una cotización</h2><p>Para preparar una respuesta útil necesitamos cuatro datos: marca, concentración de 10 mg o 20 mg, cantidad aproximada y ciudad de destino. Con esos datos el equipo puede revisar existencia, condiciones por volumen y alternativas de envío. La disponibilidad puede cambiar, por lo que siempre se confirma antes de procesar el pedido.</p></div></article><article class="seo-story"><span class="seo-story-index">05</span><div><h2>Pedidos para médicos y clínicas</h2><p>Las cuentas profesionales pueden solicitar una o varias presentaciones en una misma cotización. El equipo comercial organiza la respuesta por marca y cantidad para facilitar la revisión. Cuando existe una necesidad recurrente, la recompra se coordina por el mismo canal, manteniendo la validación de existencia y condiciones vigente en cada solicitud.</p></div></article><article class="seo-story"><span class="seo-story-index">06</span><div><h2>Pedidos para farmacias</h2><p>Las farmacias pueden consultar pedidos puntuales o recurrentes. La cotización considera la referencia solicitada y el volumen, sin publicar precios fijos. Si se requieren varias marcas, conviene listarlas por separado para evitar que una concentración o cantidad se asigne a la referencia equivocada.</p></div></article><article class="seo-story"><span class="seo-story-index">07</span><div><h2>Revisión y envío</h2><p>Antes del envío revisamos presentación, lote, caducidad y empaque. También confirmamos cobertura, costo y tiempo estimado para el destino. Consulta nuestro proceso de <a href="${prefix}productos-originales">revisión de producto original</a> y la información sobre <a href="${prefix}envios">envíos nacionales</a>.</p></div></article><article class="seo-story"><span class="seo-story-index">08</span><div><h2>Uso con receta y seguimiento médico</h2><p>La isotretinoína oral requiere receta, valoración y seguimiento médico. La información de esta página es comercial y general: no proporciona dosis, duración de tratamiento ni recomendaciones para pacientes concretos. La selección de marca y presentación debe respetar la indicación del profesional tratante y los requisitos aplicables al pedido.</p></div></article></section>`;
}

function hubFaq(page) {
  if (page.faq) return page.faq;
  return [
    [`¿Qué opciones incluye la categoría ${page.name}?`, `Esta página reúne ${page.items.map((i) => i[1]).join(", ")}. Consulta cada ficha para ver la presentación confirmada.`],
    ["¿La disponibilidad es inmediata?", "La disponibilidad se revisa al recibir cada solicitud y puede variar por producto y presentación."],
    ...commonFaq.slice(1)
  ];
}

function hubHtml(page, prefix) {
  const faq = hubFaq(page);
  const waText = encodeURIComponent(`Hola, quiero consultar la línea ${page.name} con MG Dermalab.`);
  const lineHref = page.category === "Dermatología" ? "dermatologia" : "medicina-estetica";
  return `${head(page, prefix, "hub", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb"><a href="${prefix || "/"}">Inicio</a><span aria-hidden="true">/</span><span>${esc(page.category)}</span><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span></nav>
      <section class="seo-hero seo-hub-hero seo-hero-premium"><div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)} · Guía de línea</p><h1>${esc(page.name)}</h1><p class="seo-subtitle">${esc(page.subtitle)}</p><p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.items.map((i) => i[1]).join(", "))}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">Consultar la línea por WhatsApp</a><a class="seo-back-link" href="${prefix}${lineHref}">Volver a la línea</a></div></div>${visual(page, prefix)}</section>
      ${storySections(page)}${isotretinoinaExpansion(page, prefix)}
      <section class="seo-family" aria-labelledby="family-title"><div class="seo-section-heading"><p class="seo-kicker">${esc(page.familyKicker || "Opciones disponibles")}</p><h2 id="family-title">${esc(page.familyTitle || "Encuentra la ficha que buscas")}</h2><p>${esc(page.note)}</p></div><div class="seo-family-grid">${page.items.map(([slug, name, presentation], index) => `<a href="${prefix}${slug}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(name)}</strong><small>${esc(presentation)}</small><i aria-hidden="true">→</i></a>`).join("")}</div></section>
      ${distribution(page)}${page.slug === "isotretinoina" ? `<section class="seo-story-stack"><article class="seo-story"><span class="seo-story-index">01</span><div><h2>Presentaciones de isotretinoína disponibles en México</h2><p>MG Dermalab consulta Neotrex, Epuris y Vastionin en 10 mg y 20 mg, siempre sujetos a disponibilidad. Cada ficha enlazada reúne la información comercial confirmada.</p></div></article><article class="seo-story"><span class="seo-story-index">02</span><div><h2>Para médicos y farmacias: cómo cotizar</h2><p>Indica marca, concentración, cantidad y destino. Revisamos disponibilidad, condiciones por volumen, recompra y envío antes de confirmar el pedido.</p></div></article></section><section class="seo-related"><div><p class="seo-kicker">Comparativa profesional</p><h2>Neotrex, Epuris y Vastionin</h2></div><nav class="seo-related-links"><a href="${prefix}neotrex-vs-epuris-vs-vastionin">Ver comparativa<span>→</span></a></nav></section>` : ""}
      <section class="seo-faq" aria-labelledby="faq-title"><div class="seo-section-heading"><p class="seo-kicker">Información comercial</p><h2 id="faq-title">Preguntas frecuentes</h2></div><div class="seo-faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
      ${finalCta(page, waText)}
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
