const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const timeline = document.querySelector("[data-timeline]");
const leadForms = document.querySelectorAll(".contact-form");
const heroImage = document.querySelector(".hero-image");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const contactForm = document.querySelector(".contact-form");
const clientTypeSelect = document.querySelector("[data-client-type]");
const recetaField = document.querySelector("[data-receta-field]");
const recetaSelect = document.querySelector("[data-receta-select]");

const WHATSAPP_NUMBER = "525523348746";
const WHATSAPP_MESSAGE =
  "Hola, me interesa solicitar disponibilidad y cotización de productos de MG Dermalab.";
const LEADS_ENDPOINT = "https://mgdermalab-backend.onrender.com/api/leads";
const TURNSTILE_SITE_KEY = "";
const TURNSTILE_SITE_KEY_ENDPOINT = "https://mgdermalab-backend.onrender.com/api/turnstile-site-key";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 980px)");

let ticking = false;
let turnstileWidgetId = null;
let lastProductTrigger = null;

const PRODUCT_DETAILS = {
  "neotrex-10": {
    category: "Dermatología",
    name: "Neotrex 10 mg",
    active: "Isotretinoína",
    image: "assets/neotrex-10-premium.png",
    desc: "Tratamiento sistémico indicado para el acné severo y resistente, reduciendo la producción de sebo y previniendo nuevas lesiones.",
    benefits: ["Reduce la producción de sebo", "Actúa sobre las lesiones inflamatorias", "Ayuda a prevenir cicatrices por acné"],
    indications: ["Acné severo", "Acné resistente a otros tratamientos"],
    presentations: "Caja con cápsulas de 10 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "neotrex-20": {
    category: "Dermatología",
    name: "Neotrex 20 mg",
    active: "Isotretinoína",
    image: "assets/neotrex-20-premium.png",
    desc: "Tratamiento sistémico indicado para el acné severo y resistente, reduciendo la producción de sebo y previniendo nuevas lesiones.",
    benefits: ["Reduce la producción de sebo", "Actúa sobre las lesiones inflamatorias", "Ayuda a prevenir cicatrices por acné"],
    indications: ["Acné severo", "Acné resistente a otros tratamientos"],
    presentations: "Caja con cápsulas de 20 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "epuris-10": {
    category: "Dermatología",
    name: "Epuris 10 mg",
    active: "Isotretinoína",
    image: "assets/epuris-10.webp",
    desc: "Isotretinoína de absorción optimizada para el tratamiento del acné severo bajo supervisión médica.",
    benefits: ["Absorción optimizada", "Reduce la producción de sebo", "Previene nuevas lesiones"],
    indications: ["Acné severo"],
    presentations: "Caja con cápsulas de 10 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "epuris-20": {
    category: "Dermatología",
    name: "Epuris 20 mg",
    active: "Isotretinoína",
    image: "assets/epuris-20-premium.png",
    desc: "Isotretinoína de absorción optimizada para el tratamiento del acné severo bajo supervisión médica.",
    benefits: ["Absorción optimizada", "Reduce la producción de sebo", "Previene nuevas lesiones"],
    indications: ["Acné severo"],
    presentations: "Caja con cápsulas de 20 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "vastionin-10": {
    category: "Dermatología",
    name: "Vastionin 10 mg",
    active: "Isotretinoína",
    image: "assets/vastionin-10.webp",
    desc: "Isotretinoína indicada para pacientes con acné moderado a severo resistente a tratamientos convencionales.",
    benefits: ["Indicada en casos resistentes", "Reduce la producción de sebo", "Previene nuevas lesiones"],
    indications: ["Acné moderado a severo", "Acné resistente a tratamientos convencionales"],
    presentations: "Caja con cápsulas de 10 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "vastionin-20": {
    category: "Dermatología",
    name: "Vastionin 20 mg",
    active: "Isotretinoína",
    image: "assets/vastionin-20-premium.png",
    desc: "Isotretinoína indicada para pacientes con acné moderado a severo resistente a tratamientos convencionales.",
    benefits: ["Indicada en casos resistentes", "Reduce la producción de sebo", "Previene nuevas lesiones"],
    indications: ["Acné moderado a severo", "Acné resistente a tratamientos convencionales"],
    presentations: "Caja con cápsulas de 20 mg",
    conservation: "Conservar a temperatura ambiente, en lugar seco y protegido de la luz.",
    receta: "Sí",
  },
  "dysport-300": {
    category: "Medicina estética",
    name: "Dysport 300 U",
    active: "Toxina botulínica tipo A",
    image: "assets/dysport-300.jpg",
    desc: "Toxina botulínica tipo A utilizada para disminuir temporalmente las líneas de expresión mediante la relajación muscular.",
    benefits: ["Relajación muscular localizada", "Disminuye líneas de expresión", "Resultado temporal y progresivo"],
    indications: ["Líneas de expresión", "Arrugas dinámicas del tercio superior facial"],
    presentations: "Vial de 300 U",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "dysport-500": {
    category: "Medicina estética",
    name: "Dysport 500 U",
    active: "Toxina botulínica tipo A",
    image: "assets/dysport-500.webp",
    desc: "Toxina botulínica tipo A utilizada para disminuir temporalmente las líneas de expresión mediante la relajación muscular.",
    benefits: ["Relajación muscular localizada", "Disminuye líneas de expresión", "Ideal para tratamientos de mayor cobertura"],
    indications: ["Líneas de expresión", "Arrugas dinámicas del tercio superior facial"],
    presentations: "Vial de 500 U",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  sculptra: {
    category: "Medicina estética",
    name: "Sculptra",
    active: "Ácido poli-L-láctico",
    image: "assets/sculptra-2pack.avif",
    desc: "Bioestimulador de colágeno que restaura volumen y mejora progresivamente la firmeza y calidad de la piel.",
    benefits: ["Estimula la producción natural de colágeno", "Resultado progresivo y natural", "Mejora firmeza y calidad de piel"],
    indications: ["Pérdida de volumen facial", "Flacidez"],
    presentations: "Caja con 2 viales",
    conservation: "Conservar a temperatura ambiente, en lugar seco.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-kysse": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Kysse",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Especializado para aumento y definición de labios, proporcionando resultados naturales, suaves y con movimiento.",
    benefits: ["Resultado natural y con movimiento", "Define y aumenta volumen labial", "Textura suave"],
    indications: ["Labios"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-lyft": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Lyft",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Diseñado para restaurar volumen facial y mejorar la proyección de pómulos y mentón.",
    benefits: ["Restaura volumen facial", "Mejora la proyección de pómulos y mentón", "Resultado duradero"],
    indications: ["Pómulos", "Mentón"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-refyne": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Refyne",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Indicado para corregir arrugas moderadas conservando las expresiones naturales del rostro.",
    benefits: ["Flexibilidad natural del gel", "Conserva expresiones faciales", "Corrige arrugas moderadas"],
    indications: ["Arrugas moderadas", "Líneas de expresión"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-defyne": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Defyne",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Corrige pliegues profundos y líneas marcadas manteniendo flexibilidad facial.",
    benefits: ["Corrige pliegues profundos", "Mantiene flexibilidad facial", "Resultado duradero"],
    indications: ["Pliegues profundos", "Líneas marcadas"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-contour": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Contour",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Recupera y define el volumen de los pómulos con un aspecto natural.",
    benefits: ["Define contorno facial", "Aspecto natural", "Recupera volumen en pómulos"],
    indications: ["Pómulos"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-eyelight": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Eyelight",
    active: "Ácido hialurónico",
    image: "assets/restylane-family.avif",
    desc: "Especializado para mejorar el surco lagrimal y reducir el aspecto de las ojeras hundidas.",
    benefits: ["Mejora el surco lagrimal", "Reduce el aspecto de ojeras hundidas", "Resultado sutil y natural"],
    indications: ["Ojeras", "Surco lagrimal"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-skinboosters-vital": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Skinboosters Vital",
    active: "Ácido hialurónico no reticulado",
    image: "assets/restylane-family.avif",
    desc: "Mejora la hidratación profunda, elasticidad y calidad de la piel.",
    benefits: ["Hidratación profunda", "Mejora elasticidad de la piel", "Mejora calidad y luminosidad de piel"],
    indications: ["Hidratación profunda", "Calidad de piel"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  "restylane-skinboosters-vital-light": {
    category: "Medicina estética · Línea Restylane",
    name: "Restylane Skinboosters Vital Light",
    active: "Ácido hialurónico no reticulado",
    image: "assets/restylane-family.avif",
    desc: "Hidratación profunda para pieles jóvenes y zonas delicadas.",
    benefits: ["Formulación ligera", "Ideal para zonas delicadas", "Hidratación profunda"],
    indications: ["Piel joven", "Zonas delicadas"],
    presentations: "Jeringa prellenada",
    conservation: "Conservar en refrigeración (2-8 °C). No congelar.",
    receta: "Sí (aplicación por profesional autorizado)",
  },
  tirzepatida: {
    category: "Control de peso y metabolismo",
    name: "Tirzepatida 60 mg",
    active: "Agonista DUAL — GLP-1 / GIP (2 hormonas)",
    image: "assets/tirzepatida-vial-60mg.jpg",
    desc: "Actúa sobre 2 receptores de incretinas (GLP-1 y GIP). Es el tratamiento indicado específicamente para diabetes mellitus tipo 2, con efecto asociado en el control de peso. Contamos con presentación de 60 mg.",
    benefits: [
      "Actúa sobre dos receptores de incretinas (GLP-1 y GIP)",
      "Ayuda a regular la glucosa en sangre",
      "Dosis ajustable según respuesta y tolerancia del paciente",
    ],
    indications: ["Diabetes mellitus tipo 2", "Apoyo en control de peso"],
    presentations: "Vial de 60 mg. Vía de administración subcutánea. Dosis inicial recomendada de 2.5 mg una vez por semana, ajustable a 5 mg, 10 mg o 15 mg semanales según indicación médica.",
    conservation: "Refrigerar a 2 °C - 8 °C. No congelar.",
    receta: "Sí. Uso exclusivo en adultos, bajo supervisión médica.",
  },
  retatrutida: {
    category: "Control de peso y metabolismo",
    name: "Retatrutida 60 mg",
    active: "Agonista TRIPLE — GLP-1 / GIP / Glucagón (3 hormonas)",
    image: "assets/retatrutida-vial-60mg.png",
    desc: "Actúa sobre 3 receptores (GLP-1, GIP y glucagón), sumando el efecto del glucagón para aumentar el uso de energía corporal. Es el tratamiento enfocado principalmente en pérdida de peso, con beneficio adicional en control glucémico. Contamos con presentación de 60 mg.",
    benefits: [
      "Actúa sobre tres receptores: GLP-1, GIP y glucagón",
      "Promueve la secreción de insulina y mejora el control glucémico",
      "Aumenta la utilización de energía y facilita la pérdida de peso",
    ],
    indications: ["Sobrepeso y obesidad", "Pérdida de peso sostenida", "Control glucémico en diabetes tipo 2"],
    presentations: "Vial de 60 mg de retatrutida. Inyección subcutánea una vez por semana; dosis inicial y titulación determinadas por un profesional de la salud según las características del paciente.",
    conservation: "Refrigerar a 2 °C - 8 °C. No congelar.",
    receta: "Sí. Para uso médico profesional únicamente.",
  },
};

const normalizeValue = (value) => String(value || "").trim();

const configureWhatsApp = () => {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  whatsappLinks.forEach((link) => {
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
};

const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, params);
  }
};

const pushGenerateLeadEvent = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
  });
};

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 28);
};

const closeMobileMenu = () => {
  if (!menuToggle || !mainNav) return;

  document.body.classList.remove("nav-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
};

const toggleMobileMenu = () => {
  if (!menuToggle || !mainNav) return;

  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
};

const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

if (revealObserver) {
  reveals.forEach((element) => revealObserver.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("is-visible"));
}

const updateTimeline = () => {
  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const total = rect.height + viewportHeight * 0.55;
  const visible = viewportHeight * 0.82 - rect.top;
  const progress = Math.max(0, Math.min(1, visible / total));

  timeline.style.setProperty("--progress", `${progress * 100}%`);
};

const updateHeroParallax = () => {
  if (!heroImage || prefersReducedMotion.matches || mobileViewport.matches) {
    if (heroImage) heroImage.style.transform = "";
    return;
  }

  const offset = Math.min(window.scrollY * 0.035, 18);
  heroImage.style.transform = `scale(1.045) translate3d(0, ${offset}px, 0)`;
};

const scrollToHash = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  window.setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
};

const getTrackingParams = () => {
  const params = new URLSearchParams(window.location.search);

  return {
    paginaOrigen: window.location.href,
    utm_source: normalizeValue(params.get("utm_source")),
    utm_medium: normalizeValue(params.get("utm_medium")),
    utm_campaign: normalizeValue(params.get("utm_campaign")),
    utm_content: normalizeValue(params.get("utm_content")),
    utm_term: normalizeValue(params.get("utm_term")),
    fbclid: normalizeValue(params.get("fbclid")),
    gclid: normalizeValue(params.get("gclid")),
  };
};

const getTurnstileWidget = () => document.querySelector("[data-turnstile-widget]");

const setTurnstileError = (message) => {
  const widget = getTurnstileWidget();
  if (!widget) return;

  widget.dataset.state = "error";
  widget.textContent = message;
};

const getTurnstileSiteKey = async () => {
  if (TURNSTILE_SITE_KEY) return TURNSTILE_SITE_KEY;

  const response = await fetch(TURNSTILE_SITE_KEY_ENDPOINT, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Turnstile site key endpoint responded with ${response.status}`);
  }

  const data = await response.json();
  return normalizeValue(data.siteKey || data.site_key);
};

const waitForTurnstile = () =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();

    const check = () => {
      if (window.turnstile && typeof window.turnstile.render === "function") {
        resolve(window.turnstile);
        return;
      }

      if (Date.now() - startedAt > 8000) {
        reject(new Error("Cloudflare Turnstile no cargó a tiempo."));
        return;
      }

      window.setTimeout(check, 120);
    };

    check();
  });

const initTurnstile = async () => {
  const widget = getTurnstileWidget();
  if (!widget || turnstileWidgetId !== null) return;

  try {
    const [siteKey, turnstile] = await Promise.all([getTurnstileSiteKey(), waitForTurnstile()]);

    if (!siteKey) {
      throw new Error("No se recibió la Site Key de Turnstile.");
    }

    turnstileWidgetId = turnstile.render(widget, {
      sitekey: siteKey,
      theme: "light",
    });
  } catch (error) {
    setTurnstileError("No se pudo cargar la verificación de seguridad. Inténtalo nuevamente o contáctanos por WhatsApp.");
    trackEvent("turnstile_load_error", { message: error.message });
  }
};

const getTurnstileToken = () => {
  if (!window.turnstile || turnstileWidgetId === null) return "";
  return normalizeValue(window.turnstile.getResponse(turnstileWidgetId));
};

const resetTurnstile = () => {
  if (window.turnstile && turnstileWidgetId !== null) {
    window.turnstile.reset(turnstileWidgetId);
  }
};

const buildContactPayload = (data) => {
  const tipoCliente = normalizeValue(data.get("tipo_cliente"));
  const producto = normalizeValue(data.get("producto_linea"));
  const cantidad = normalizeValue(data.get("volumen"));
  const receta = tipoCliente === "Compra individual" ? normalizeValue(data.get("receta")) : "";
  const recetaMessage = receta ? ` Receta médica: ${receta}.` : "";

  return {
    nombre: normalizeValue(data.get("nombre")),
    whatsapp: normalizeValue(data.get("whatsapp")),
    tipoCliente,
    producto,
    cantidad,
    receta,
    "cf-turnstile-response": normalizeValue(data.get("cf-turnstile-response")) || getTurnstileToken(),
    mensaje: `Solicitud desde formulario de cotización. Tipo de cliente: ${tipoCliente}. Producto o línea: ${producto}. Cantidad aproximada: ${cantidad}.${recetaMessage}`,
    ...getTrackingParams(),
  };
};

const buildPayload = (form, data) => {
  return buildContactPayload(data);
};

const updateRecetaField = () => {
  if (!clientTypeSelect || !recetaField || !recetaSelect) return;

  const shouldShow = clientTypeSelect.value === "Compra individual";
  recetaField.hidden = !shouldShow;
  recetaSelect.required = shouldShow;

  if (!shouldShow) {
    recetaSelect.value = "";
  }
};

const setFormStatus = (form, message, state = "") => {
  const status = form.querySelector(".form-status");
  if (!status) return;

  status.textContent = message;
  status.dataset.state = state;

  if (message) {
    status.setAttribute("tabindex", "-1");
    status.focus({ preventScroll: true });
  } else {
    status.removeAttribute("tabindex");
  }
};

const submitLeadForm = async (form, event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const button = form.querySelector('button[type="submit"]');
  const originalText = button ? button.textContent : "";
  const data = new FormData(form);
  const payload = buildPayload(form, data);

  if (!payload["cf-turnstile-response"]) {
    setFormStatus(form, "Completa la verificación de seguridad antes de enviar.", "error");
    return;
  }

  if (button) {
    button.disabled = true;
    button.textContent = "Enviando...";
  }
  form.setAttribute("aria-busy", "true");
  setFormStatus(form, "Enviando...", "loading");

  try {
    const response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "omit",
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.ok === false) {
      throw new Error(result.message || `Lead endpoint responded with ${response.status}`);
    }

    form.reset();
    updateRecetaField();
    resetTurnstile();
    setFormStatus(form, "Solicitud enviada correctamente.", "success");
    pushGenerateLeadEvent();
    trackEvent("lead_form_submit", {
      form_name: form.getAttribute("name") || "lead",
      tipo_cliente: payload.tipoCliente,
      producto: payload.producto,
    });
  } catch (error) {
    const visibleMessage =
      error && error.message && !/Lead endpoint|Failed to fetch|NetworkError/i.test(error.message)
        ? error.message
        : "No fue posible enviar la solicitud. Inténtalo nuevamente o contáctanos por WhatsApp.";

    setFormStatus(
      form,
      visibleMessage,
      "error"
    );
    resetTurnstile();
    trackEvent("lead_form_error", {
      form_name: form.getAttribute("name") || "lead",
      message: error.message,
    });
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
    form.removeAttribute("aria-busy");
  }
};

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => submitLeadForm(form, event));
});

if (contactForm && clientTypeSelect) {
  clientTypeSelect.addEventListener("change", updateRecetaField);
  updateRecetaField();
}

whatsappLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("whatsapp_click", {
      location: link.className || "whatsapp_link",
    });
  });
});

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mainNav) {
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

const productModal = document.querySelector("#product-modal");

const fillList = (listElement, items) => {
  if (!listElement) return;
  listElement.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    listElement.appendChild(li);
  });
};

const openProductModal = (productId, trigger) => {
  const details = PRODUCT_DETAILS[productId];
  if (!productModal || !details) return;

  const image = productModal.querySelector("[data-modal-image]");
  if (image) {
    image.src = details.image;
    image.alt = details.name;
  }

  const setText = (selector, value) => {
    const element = productModal.querySelector(selector);
    if (element) element.textContent = value;
  };

  setText("[data-modal-category]", details.category);
  setText("[data-modal-name]", details.name);
  setText("[data-modal-active]", details.active);
  setText("[data-modal-desc]", details.desc);
  setText("[data-modal-presentations]", details.presentations);
  setText("[data-modal-conservation]", details.conservation);
  setText("[data-modal-receta]", details.receta);

  fillList(productModal.querySelector("[data-modal-benefits]"), details.benefits || []);
  fillList(productModal.querySelector("[data-modal-indications]"), details.indications || []);

  lastProductTrigger = trigger || null;

  if (typeof productModal.showModal === "function") {
    productModal.showModal();
  } else {
    productModal.setAttribute("open", "");
  }

  trackEvent("product_view_detail", { product: productId });
};

const closeProductModal = () => {
  if (!productModal) return;

  if (typeof productModal.close === "function" && productModal.open) {
    productModal.close();
  } else {
    productModal.removeAttribute("open");
  }

  if (lastProductTrigger && typeof lastProductTrigger.focus === "function") {
    lastProductTrigger.focus({ preventScroll: true });
  }
  lastProductTrigger = null;
};

if (productModal) {
  document.querySelectorAll("[data-open-product]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openProductModal(trigger.dataset.openProduct, trigger);
    });
  });

  document.querySelectorAll(".product-card figure, .product-card .product-info").forEach((area) => {
    area.style.cursor = "pointer";
    area.addEventListener("click", () => {
      const card = area.closest(".product-card");
      if (!card) return;
      openProductModal(card.dataset.product, card.querySelector("[data-open-product]"));
    });
  });

  productModal.querySelectorAll("[data-close-product-modal]").forEach((closeTrigger) => {
    closeTrigger.addEventListener("click", (event) => {
      if (closeTrigger.tagName === "A") {
        closeProductModal();
        return;
      }
      event.preventDefault();
      closeProductModal();
    });
  });

  productModal.addEventListener("click", (event) => {
    if (event.target === productModal) {
      closeProductModal();
    }
  });

  productModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProductModal();
  });
}

window.addEventListener("scroll", () => {
  if (ticking) return;

  window.requestAnimationFrame(() => {
    updateHeader();
    updateTimeline();
    updateHeroParallax();
    ticking = false;
  });

  ticking = true;
});

window.addEventListener("resize", () => {
  updateTimeline();
  updateHeroParallax();
});

window.addEventListener("hashchange", closeMobileMenu);

updateHeader();
updateTimeline();
updateHeroParallax();
configureWhatsApp();
initTurnstile();
scrollToHash();
