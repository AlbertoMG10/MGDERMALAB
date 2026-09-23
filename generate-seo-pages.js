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
    slug: "retatrutida", name: "Retatrutida", category: "Línea especializada", presentation: "",
    title: "Retatrutida: estatus de investigación | MG Dermalab",
    description: "Conoce el estatus regulatorio actual de retatrutida, una molécula investigacional que no está aprobada ni disponible para uso público.",
    intro: "Información responsable sobre el estatus de retatrutida como molécula investigacional. No se presenta como medicamento aprobado ni como tratamiento comercial disponible.",
    note: "No se ofrece retatrutida como medicamento comercial. Esta sección se limita a aclarar su estatus público y regulatorio.",
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

const productContent = {
  neotrex: {
    subtitle: "Isotretinoína oral para atención dermatológica especializada.",
    what: "Neotrex es una marca de isotretinoína en cápsulas. Pertenece al grupo de los retinoides y su uso requiere prescripción y seguimiento por un profesional de la salud.",
    use: "La isotretinoína oral se utiliza en formas graves de acné que no han respondido adecuadamente a tratamientos convencionales. La valoración, indicación y seguimiento corresponden al médico tratante.",
    mechanism: "La isotretinoína actúa sobre procesos relacionados con la actividad de las glándulas sebáceas. El mecanismo completo es complejo, por lo que esta página no sustituye la información para prescribir ni la valoración médica.",
    faq: [
      ["¿Qué presentaciones de Neotrex maneja MG Dermalab?", "Manejamos Neotrex de 10 mg y 20 mg, sujeto a disponibilidad."],
      ["¿Neotrex requiere receta y seguimiento médico?", "Sí. La isotretinoína oral debe utilizarse únicamente bajo prescripción y seguimiento profesional."],
      ["¿Puedo consultar varias piezas de Neotrex?", "Sí. Comparte presentación, cantidad y ciudad para revisar disponibilidad y condiciones comerciales."],
      ["¿Cómo se confirma el envío de Neotrex?", "El equipo confirma cobertura, costo y plazo estimado al preparar la cotización."]
    ],
    source: ["Información de isotretinoína", "https://www.safetyandquality.gov.au/medicine-finder/oratane"]
  },
  epuris: {
    subtitle: "Isotretinoína en cápsulas para solicitudes profesionales.",
    what: "Epuris es isotretinoína oral en cápsulas y forma parte de los retinoides sistémicos utilizados en dermatología.",
    use: "Su documentación oficial describe el uso de isotretinoína en acné grave. No se publican pautas de tratamiento: la selección de paciente y el seguimiento son responsabilidad médica.",
    mechanism: "La isotretinoína reduce la actividad de las glándulas sebáceas y modifica procesos implicados en el acné. Su utilización exige control profesional por su perfil de seguridad.",
    faq: [
      ["¿Epuris está disponible en 10 mg y 20 mg?", "MG Dermalab consulta ambas presentaciones, siempre sujetas a existencia vigente."],
      ["¿Epuris es isotretinoína?", "Sí. La documentación oficial identifica isotretinoína como ingrediente medicinal."],
      ["¿Atienden solicitudes de clínicas y farmacias?", "Sí. El equipo comercial revisa cada solicitud y los requisitos aplicables."],
      ["¿Cómo cotizo Epuris?", "Indica 10 mg o 20 mg, cantidad y ciudad por WhatsApp."]
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
      ["¿Publican el precio de Vastionin?", "No. Las condiciones dependen de disponibilidad, cantidad y envío."]
    ],
    source: ["Información farmacológica de isotretinoína", "https://www.safetyandquality.gov.au/medicine-finder/oratane"]
  },
  oratane: {
    subtitle: "Tres concentraciones confirmadas para cotización dermatológica.",
    what: "Oratane contiene isotretinoína, un retinoide relacionado con la vitamina A disponible en cápsulas.",
    use: "La información oficial de Oratane describe su uso para formas graves de acné. Es un medicamento de prescripción y no debe utilizarse sin valoración médica.",
    mechanism: "La isotretinoína disminuye la producción de sebo al actuar sobre las glándulas sebáceas. Su uso requiere vigilancia profesional, especialmente por sus riesgos durante el embarazo.",
    faq: [
      ["¿Qué presentaciones de Oratane cotizan?", "MG Dermalab consulta Oratane de 5 mg, 10 mg y 20 mg."],
      ["¿Oratane contiene isotretinoína?", "Sí. La información oficial identifica isotretinoína como ingrediente activo."],
      ["¿Oratane es un medicamento de prescripción?", "Sí. Debe ser indicado y supervisado por un profesional de la salud."],
      ["¿Qué datos necesito para cotizar?", "Concentración, cantidad y ciudad de entrega."]
    ],
    source: ["Oratane · información oficial", "https://www.safetyandquality.gov.au/medicine-finder/oratane"]
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
    subtitle: "Información comercial limitada a la presentación identificada por MG Dermalab.",
    what: "La tirzepatida es una molécula agonista de los receptores GIP y GLP-1. La presentación de 60 mg mostrada en esta página no debe interpretarse como equivalente a una marca o presentación aprobada distinta.",
    use: "Las indicaciones dependen del medicamento, la presentación y la autorización regulatoria correspondiente. MG Dermalab no atribuye a esta presentación las indicaciones de productos de tirzepatida de otras marcas.",
    mechanism: "Como molécula, la tirzepatida activa los receptores GIP y GLP-1. Esta explicación no confirma formulación, equivalencia ni autorización de la presentación comercial mostrada.",
    faq: [
      ["¿La presentación de 60 mg equivale a Mounjaro o Zepbound?", "No debe asumirse equivalencia. Son productos y presentaciones con documentación propia."],
      ["¿Esta página ofrece una pauta de uso?", "No. No se publican dosis, esquemas ni recomendaciones médicas."],
      ["¿Qué información debo solicitar antes de cotizar?", "Solicita al asesor la documentación comercial disponible para el producto específico."],
      ["¿La disponibilidad está garantizada?", "No. Cualquier disponibilidad está sujeta a confirmación individual."]
    ],
    source: ["FDA · tirzepatida, información de referencia", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/215866s039lbl.pdf"]
  },
  retatrutida: {
    subtitle: "Molécula investigacional en desarrollo clínico.",
    what: "Retatrutida es una molécula investigacional desarrollada como agonista de los receptores GIP, GLP-1 y glucagón.",
    use: "No está aprobada por la FDA ni disponible para uso público. Lilly indica que solo está disponible para participantes de sus ensayos clínicos; esta página no la presenta como tratamiento comercial establecido.",
    mechanism: "En investigación clínica se describe como un agonista triple de los receptores GIP, GLP-1 y glucagón. Su seguridad y eficacia continúan en evaluación regulatoria.",
    faq: [
      ["¿Retatrutida está aprobada?", "No. Lilly la describe actualmente como una molécula investigacional no aprobada por ninguna agencia regulatoria."],
      ["¿Retatrutida está disponible para uso público?", "No. La información oficial indica que solo está disponible dentro de ensayos clínicos patrocinados por Lilly."],
      ["¿La presentación mostrada confirma un medicamento autorizado?", "No. No debe interpretarse como prueba de aprobación, pureza, seguridad o equivalencia."],
      ["¿MG Dermalab publica una pauta de uso?", "No. No se publican dosis, esquemas ni recomendaciones de tratamiento."]
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
  source: ["Oratane · información oficial", "https://www.safetyandquality.gov.au/medicine-finder/oratane"]
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
  return slug ? `${prefix}${slug}` : `${prefix}index.html#catalogo`;
}

function faqFor(page) {
  if (page.faq) return page.faq;
  const first = !page.presentation
    ? [`¿Cómo consulto disponibilidad de ${page.name}?`, "Comparte la cantidad requerida y tu ciudad por WhatsApp. Un asesor revisará la solicitud y responderá con la información comercial disponible."]
    : [`¿Qué presentación de ${page.name} manejan?`, `Manejamos ${page.presentation.replace(/ · /g, ", ")}. La disponibilidad se confirma al momento de cotizar.`];
  return [first, ...commonFaq];
}

function storySections(page) {
  const sections = [
    [`¿Qué es ${page.name}?`, page.what],
    ["¿Para qué se utiliza?", page.use],
    ["¿Cómo funciona?", page.mechanism]
  ];
  return `<section class="seo-story-stack" aria-label="Información de ${esc(page.name)}">${sections.map(([title, copy], index) => `<article class="seo-story"><span class="seo-story-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h2>${esc(title)}</h2><p>${esc(copy)}</p></div></article>`).join("")}<p class="seo-source">Fuente principal: <a href="${esc(page.source[1])}" target="_blank" rel="noopener noreferrer">${esc(page.source[0])}</a></p></section>`;
}

function presentations(page) {
  if (page.slug === "retatrutida") {
    return `<section class="seo-presentations" aria-labelledby="presentations-title"><div class="seo-section-heading"><p class="seo-kicker">Estatus regulatorio</p><h2 id="presentations-title">Sin presentación comercial aprobada</h2><p>Retatrutida continúa en investigación clínica. No se publica una presentación comercial porque no está aprobada ni disponible para uso público.</p></div><div class="seo-presentation-list"><span>Molécula investigacional</span></div></section>`;
  }
  const isRestylane = page.category.includes("Restylane");
  const items = page.presentation ? page.presentation.split(" · ") : [];
  const labels = isRestylane ? [] : items;
  return `<section class="seo-presentations" aria-labelledby="presentations-title"><div class="seo-section-heading"><p class="seo-kicker">Información comercial</p><h2 id="presentations-title">Presentaciones disponibles</h2><p>Mostramos únicamente las presentaciones confirmadas en nuestro catálogo. La existencia se valida al solicitar cotización.</p></div><div class="seo-presentation-list">${labels.length ? labels.map((item) => `<span>${esc(item)}</span>`).join("") : `<span>La presentación comercial se confirma al cotizar</span>`}</div></section>`;
}

function distribution(page) {
  if (page.slug === "retatrutida") {
    return `<section class="seo-distribution" aria-labelledby="distribution-title"><div><p class="seo-kicker">Información responsable</p><h2 id="distribution-title">No disponible para distribución comercial</h2><p>Retatrutida no está aprobada por ninguna agencia regulatoria y Lilly informa que solo está disponible para participantes de sus ensayos clínicos.</p></div><dl><div><dt>Estatus</dt><dd>Molécula investigacional en desarrollo clínico.</dd></div><div><dt>Disponibilidad</dt><dd>No disponible para uso público.</dd></div><div><dt>Alcance</dt><dd>Esta página no ofrece venta, dosis ni recomendaciones de tratamiento.</dd></div></dl></section>`;
  }
  return `<section class="seo-distribution" aria-labelledby="distribution-title"><div><p class="seo-kicker">MG Dermalab</p><h2 id="distribution-title">Distribución profesional en México</h2><p>${esc(page.note)} Atendemos solicitudes de profesionales de la salud, clínicas y farmacias cuando corresponde.</p></div><dl><div><dt>Cotización</dt><dd>Condiciones comerciales según producto y volumen.</dd></div><div><dt>Cobertura</dt><dd>Envíos nacionales sujetos a validación de destino.</dd></div><div><dt>Disponibilidad</dt><dd>Existencia y presentación se confirman antes de continuar.</dd></div></dl></section>`;
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
  const signature = page.slug === "retatrutida" ? "Investigación clínica" : page.presentation ? esc(page.presentation) : "Distribución especializada";
  return `<div class="seo-product-visual seo-product-signature" role="img" aria-label="${esc(page.name)} — ${esc(page.category)} — MG Dermalab"><span>MG Dermalab</span><p>${esc(page.category)}</p><strong>${esc(page.name)}</strong><small>${signature}</small></div>`;
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
  const isInvestigational = page.slug === "retatrutida";
  const waText = encodeURIComponent(isInvestigational ? `Hola, quiero consultar información sobre el estatus de ${page.name}.` : `Hola, quiero consultar disponibilidad de ${page.name}${page.presentation ? ` (${page.presentation})` : ""} con MG Dermalab.`);
  const heroCta = isInvestigational ? "Consultar información por WhatsApp" : "Consultar disponibilidad por WhatsApp";
  const presentationLine = page.presentation ? `<p class="seo-presentation">${esc(page.presentation)}</p>` : "";
  return `${head(page, prefix, "product", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb"><a href="${prefix}index.html">Inicio</a><span aria-hidden="true">/</span><a href="${page.category.includes("Restylane") ? `${prefix}restylane` : `${prefix}index.html#catalogo`}">${esc(page.category)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span></nav>
      <section class="seo-hero seo-hero-premium">
        <div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)}</p><h1>${esc(page.name)}</h1>${presentationLine}<p class="seo-subtitle">${esc(page.subtitle)}</p><p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.presentation || "No especificada")}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">${heroCta}</a><a class="seo-back-link" href="${prefix}index.html#catalogo">Volver al catálogo</a></div></div>
        ${visual(page, prefix)}
      </section>
      ${storySections(page)}
      ${presentations(page)}
      ${distribution(page)}
      <section class="seo-faq" aria-labelledby="faq-title"><div class="seo-section-heading"><p class="seo-kicker">Antes de cotizar</p><h2 id="faq-title">Preguntas frecuentes</h2></div><div class="seo-faq-list">${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>
      <section class="seo-related" aria-labelledby="related-title"><div><p class="seo-kicker">También puede interesarte</p><h2 id="related-title">Explora productos relacionados</h2></div><nav class="seo-related-links" aria-label="Productos relacionados">${page.related.map(([slug, label]) => `<a href="${href(prefix, slug)}">${esc(label)}<span aria-hidden="true">→</span></a>`).join("")}</nav></section>
      ${finalCta(page, waText)}
    </main>
    ${footer(prefix)}`;
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
  return `${head(page, prefix, "hub", faq)}
  ${header(prefix, page)}
    <main class="seo-main" id="contenido">
      <nav class="seo-breadcrumb" aria-label="Breadcrumb"><a href="${prefix}index.html">Inicio</a><span aria-hidden="true">/</span><span>${esc(page.category)}</span><span aria-hidden="true">/</span><span aria-current="page">${esc(page.name)}</span></nav>
      <section class="seo-hero seo-hub-hero seo-hero-premium"><div class="seo-hero-copy"><p class="seo-kicker">${esc(page.category)} · Guía de línea</p><h1>${esc(page.name)}</h1><p class="seo-subtitle">${esc(page.subtitle)}</p><p class="seo-intro">${esc(page.intro)}</p><div class="seo-actions"><a class="primary-button" data-seo-whatsapp data-product-name="${esc(page.name)}" data-category="${esc(page.category)}" data-presentation="${esc(page.items.map((i) => i[1]).join(", "))}" href="https://wa.me/525654434495?text=${waText}" target="_blank" rel="noopener">Consultar la línea por WhatsApp</a><a class="seo-back-link" href="${prefix}index.html#catalogo">Volver al catálogo</a></div></div>${visual(page, prefix)}</section>
      ${storySections(page)}
      <section class="seo-family" aria-labelledby="family-title"><div class="seo-section-heading"><p class="seo-kicker">Opciones disponibles</p><h2 id="family-title">Encuentra la ficha que buscas</h2><p>${esc(page.note)}</p></div><div class="seo-family-grid">${page.items.map(([slug, name, presentation], index) => `<a href="${prefix}${slug}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(name)}</strong><small>${esc(presentation)}</small><i aria-hidden="true">→</i></a>`).join("")}</div></section>
      ${distribution(page)}
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
