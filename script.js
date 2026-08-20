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
const FORM_MIN_SUBMIT_MS = 2500;

let ticking = false;
let turnstileWidgetId = null;
let lastProductTrigger = null;

const PRODUCT_DETAILS = {
  "neotrex-10": {
    category: "Dermatología",
    name: "Neotrex 10 mg",
    active: "Isotretinoína",
    image: "assets/neotrex-10-premium-optimized.jpg",
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
    image: "assets/neotrex-20-premium-optimized.jpg",
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
    image: "assets/epuris-20-premium-optimized.jpg",
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
    image: "assets/vastionin-20-premium-optimized.jpg",
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
    image: "assets/tirzepatida-nythera-60mg.jpg",
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

if (mobileViewport.matches) {
  reveals.forEach((element) => element.classList.add("is-visible"));
} else if (revealObserver) {
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
  if (!heroImage) return;
  heroImage.style.transform = "";
};

const jumpToSectionInstant = (target, extraOffset = 18) => {
  if (!target) return;

  const headerHeight = header ? header.getBoundingClientRect().height : 96;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - headerHeight - extraOffset);
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo({ top, behavior: "auto" });

  window.setTimeout(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  }, 80);
};

const jumpToContactInstant = () => {
  const contactSection = document.querySelector("#contacto");
  if (!contactSection) return;
  forceRevealVisible(contactSection);
  jumpToSectionInstant(contactSection, 14);
};

const scrollToHash = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const target = document.querySelector(hash);
  if (!target) return;

  window.setTimeout(() => {
    jumpToSectionInstant(target);
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
  const leadStartedAt = normalizeValue(data.get("lead_started_at"));

  return {
    nombre: normalizeValue(data.get("nombre")),
    whatsapp: normalizeValue(data.get("whatsapp")),
    tipoCliente,
    producto,
    cantidad,
    receta,
    "bot-field": normalizeValue(data.get("bot-field")),
    lead_started_at: leadStartedAt,
    lead_elapsed_ms: leadStartedAt ? String(Math.max(0, Date.now() - Number(leadStartedAt))) : "",
    "cf-turnstile-response": normalizeValue(data.get("cf-turnstile-response")) || getTurnstileToken(),
    mensaje: `Solicitud desde formulario de cotización. Tipo de cliente: ${tipoCliente}. Producto o línea: ${producto}. Cantidad aproximada: ${cantidad}.${recetaMessage}`,
    ...getTrackingParams(),
  };
};

const buildPayload = (form, data) => {
  return buildContactPayload(data);
};

const setLeadStartedAt = (form) => {
  const leadStartedAtField = form.querySelector("[data-lead-started-at]");
  if (leadStartedAtField) {
    leadStartedAtField.value = String(Date.now());
  }
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

  const leadStartedAt = Number(form.querySelector("[data-lead-started-at]")?.value || 0);
  if (leadStartedAt && Date.now() - leadStartedAt < FORM_MIN_SUBMIT_MS) {
    setFormStatus(form, "Espera un momento y vuelve a enviar la solicitud.", "error");
    return;
  }

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
    setLeadStartedAt(form);
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
  setLeadStartedAt(form);
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
let lastOpenedProductId = null;

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
  const figureElement = productModal.querySelector(".product-modal-figure");
  const gridElement = productModal.querySelector(".product-modal-grid");

  if (details.image) {
    if (image) {
      image.src = details.image;
      image.alt = details.name;
    }
    if (figureElement) figureElement.hidden = false;
    if (gridElement) gridElement.classList.remove("no-image");
  } else {
    if (image) {
      image.removeAttribute("src");
      image.alt = "";
    }
    if (figureElement) figureElement.hidden = true;
    if (gridElement) gridElement.classList.add("no-image");
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
  lastOpenedProductId = productId;

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

/* CTA dinámico: identifica el producto de interés en el formulario de cotización */
const PRODUCT_TO_QUOTE_OPTION = {
  "neotrex-10": "Dermatología: Neotrex, Epuris o Vastionin",
  "neotrex-20": "Dermatología: Neotrex, Epuris o Vastionin",
  "epuris-10": "Dermatología: Neotrex, Epuris o Vastionin",
  "epuris-20": "Dermatología: Neotrex, Epuris o Vastionin",
  "vastionin-10": "Dermatología: Neotrex, Epuris o Vastionin",
  "vastionin-20": "Dermatología: Neotrex, Epuris o Vastionin",
  "dysport-300": "Dysport 300 U / 500 U",
  "dysport-500": "Dysport 300 U / 500 U",
  sculptra: "Sculptra",
  "restylane-kysse": "Línea Restylane",
  "restylane-lyft": "Línea Restylane",
  "restylane-refyne": "Línea Restylane",
  "restylane-defyne": "Línea Restylane",
  "restylane-contour": "Línea Restylane",
  "restylane-eyelight": "Línea Restylane",
  "restylane-skinboosters-vital": "Restylane Skinboosters",
  "restylane-skinboosters-vital-light": "Restylane Skinboosters",
  tirzepatida: "Tirzepatida 60 mg",
};

const CATEGORY_TO_DEFAULT_PRODUCT = {
  "catalogo-medicina-estetica": "dysport-300",
  "catalogo-dermatologia": "neotrex-10",
  "catalogo-control-peso": "tirzepatida",
};

const preselectProductoLinea = (productId) => {
  const optionText = PRODUCT_TO_QUOTE_OPTION[productId];
  const select = document.querySelector('select[name="producto_linea"]');
  if (!optionText || !select) return;

  const matchingOption = Array.from(select.options).find((option) => option.textContent.trim() === optionText);
  if (!matchingOption) return;

  select.value = matchingOption.value;
  trackEvent("cta_product_preselect", { product: productId, option: optionText });
};

document.querySelectorAll(".product-card").forEach((card) => {
  const cotizarLink = card.querySelector(".product-actions .text-button");
  if (!cotizarLink) return;

  cotizarLink.addEventListener("click", () => {
    preselectProductoLinea(card.dataset.product);
  });
});

document.querySelectorAll("[data-product-quote]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const productId = link.dataset.productQuote;
    preselectProductoLinea(productId);

    if (mobileViewport.matches) {
      jumpToContactInstant();
      return;
    }

    const panel = link.closest("[data-line-preview]");
    const status = panel ? panel.querySelector("[data-line-quote-status]") : null;
    const label = link.querySelector("strong")?.textContent?.trim() || "Producto";

    if (status) {
      status.hidden = false;
      const message = status.querySelector("span");
      if (message) {
        message.textContent = `${label} seleccionado para cotización. Puedes solicitarlo por WhatsApp o continuar al formulario cuando quieras.`;
      }
    }
  });
});

document.querySelectorAll('a[href="#contacto"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const modalTrigger = link.closest("[data-close-product-modal]");
    if (modalTrigger && typeof closeProductModal === "function") {
      closeProductModal();
    }

    jumpToContactInstant();
  });
});

if (productModal) {
  productModal.querySelectorAll(".product-modal-cta").forEach((ctaLink) => {
    ctaLink.addEventListener("click", () => {
      preselectProductoLinea(lastOpenedProductId);
    });
  });
}

/* Selector de líneas y tabs del catálogo: paneles dinámicos por categoría */
const catalogFamilies = document.querySelectorAll(".catalog-family");
const catalogTabTriggers = document.querySelectorAll("[data-catalog-target]");
const lineProductsPreview = document.querySelector("[data-line-products-preview]");
const linePreviewPanels = document.querySelectorAll("[data-line-preview]");

const forceRevealVisible = (root) => {
  if (!root) return;
  root.classList.add("is-visible");
  root.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
};

const scrollToCatalogProducts = (targetPanel, behavior = "auto") => {
  const scrollTarget = targetPanel.querySelector(".product-grid") || targetPanel;
  if (!scrollTarget) return;

  const headerHeight = header ? header.getBoundingClientRect().height : 96;
  const top = Math.max(0, window.scrollY + scrollTarget.getBoundingClientRect().top - headerHeight - 22);

  window.scrollTo({
    top,
    behavior: prefersReducedMotion.matches ? "auto" : behavior,
  });
};

const activateCatalogPanel = (targetId, { scroll = true, scrollBehavior = "auto" } = {}) => {
  if (!targetId || !catalogFamilies.length) return;

  const targetPanel = Array.from(catalogFamilies).find((panel) => panel.id === targetId);
  if (!targetPanel) return;

  catalogFamilies.forEach((panel) => {
    if (panel === targetPanel) return;

    if (!panel.classList.contains("is-hidden")) {
      // Panel visible actualmente: se desvanece antes de ocultarse (crossfade)
      panel.classList.add("is-fading");
      window.setTimeout(() => {
        panel.classList.add("is-hidden");
        panel.classList.remove("is-fading");
      }, prefersReducedMotion.matches ? 0 : 200);
    } else {
      panel.classList.add("is-hidden");
    }
  });

  targetPanel.classList.remove("is-hidden", "is-fading");
  forceRevealVisible(document.querySelector("#catalogo"));
  forceRevealVisible(targetPanel);

  catalogTabTriggers.forEach((trigger) => {
    const isMatch = trigger.dataset.catalogTarget === targetId;
    trigger.classList.toggle("is-active", isMatch);
    if (trigger.closest(".catalog-tabs")) {
      trigger.setAttribute("aria-current", isMatch ? "true" : "false");
    }
    if (trigger.getAttribute("role") === "tab") {
      trigger.setAttribute("aria-selected", isMatch ? "true" : "false");
    }
  });

  if (scroll) {
    window.setTimeout(() => scrollToCatalogProducts(targetPanel, scrollBehavior), 30);
  }
};

if (catalogFamilies.length && catalogTabTriggers.length) {
  catalogTabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const targetId = trigger.dataset.catalogTarget;
      if (!targetId) return;

      event.preventDefault();
      trackEvent("catalog_category_select", { category: targetId });

      if (window.history && typeof window.history.replaceState === "function") {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }

      if (trigger.closest(".line-grid")) {
        activateCatalogPanel(targetId, { scroll: false });

        if (mobileViewport.matches) {
          if (lineProductsPreview) lineProductsPreview.hidden = true;
          preselectProductoLinea(CATEGORY_TO_DEFAULT_PRODUCT[targetId]);
          jumpToContactInstant();
          return;
        }

        if (lineProductsPreview) lineProductsPreview.hidden = false;
        linePreviewPanels.forEach((panel) => {
          panel.hidden = panel.dataset.linePreview !== targetId;
        });
        forceRevealVisible(lineProductsPreview);
        return;
      }

      activateCatalogPanel(targetId, { scroll: false });
    });
  });

  const initialHash = window.location.hash.replace("#", "");
  const initialTargetExists = Array.from(catalogFamilies).some((panel) => panel.id === initialHash);

  if (initialTargetExists) {
    // Llegó directo a un link de categoría específica: mostrar solo esa
    activateCatalogPanel(initialHash, { scroll: false });
    document.body.classList.add("catalog-view-active");
    forceRevealVisible(document.querySelector("#catalogo"));
  } else {
    // Entrada normal a la página: no mostrar ninguna categoría hasta que el usuario elija
    catalogFamilies.forEach((panel) => panel.classList.add("is-hidden"));
  }
}

/* Enlace "Volver al inicio": sale de la vista dedicada de categoría */
const catalogBackLink = document.querySelector("[data-catalog-back]");
if (catalogBackLink) {
  catalogBackLink.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.remove("catalog-view-active");

    // Restablece el catálogo a su estado vacío: ninguna categoría seleccionada
    catalogFamilies.forEach((panel) => {
      panel.classList.add("is-hidden");
      panel.classList.remove("is-fading");
    });
    catalogTabTriggers.forEach((trigger) => {
      trigger.classList.remove("is-active");
      if (trigger.closest(".catalog-tabs")) {
        trigger.setAttribute("aria-current", "false");
      }
      if (trigger.getAttribute("role") === "tab") {
        trigger.setAttribute("aria-selected", "false");
      }
    });

    if (window.history && typeof window.history.replaceState === "function") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.setTimeout(() => {
      const heroSection = document.querySelector("#inicio");
      if (heroSection) {
        heroSection.scrollIntoView({
          behavior: prefersReducedMotion.matches ? "auto" : "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
      }
    }, 10);
  });
}

/* Si el usuario navega a una sección normalmente oculta en la vista de categoría, sal de ese modo primero */
const SECTIONS_HIDDEN_IN_CATALOG_VIEW = [
  "inicio",
  "lineas",
  "laboratorios",
  "medicos",
  "farmacias",
  "nosotros",
  "faq",
];

const resetCatalogView = () => {
  document.body.classList.remove("catalog-view-active");
  catalogFamilies.forEach((panel) => {
    panel.classList.add("is-hidden");
    panel.classList.remove("is-fading");
  });
  catalogTabTriggers.forEach((trigger) => {
    trigger.classList.remove("is-active");
    if (trigger.closest(".catalog-tabs")) {
      trigger.setAttribute("aria-current", "false");
    }
    if (trigger.getAttribute("role") === "tab") {
      trigger.setAttribute("aria-selected", "false");
    }
  });
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const hash = link.getAttribute("href").slice(1);
  if (!SECTIONS_HIDDEN_IN_CATALOG_VIEW.includes(hash)) return;

  link.addEventListener("click", () => {
    if (document.body.classList.contains("catalog-view-active")) {
      resetCatalogView();
    }
  });
});

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

/* Spotlight de cursor: la tarjeta de producto se ilumina con el acento de
   marca justo donde está el cursor, en vez de un simple color de borde. */
if (!prefersReducedMotion.matches && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--spot-x", `${x}%`);
      card.style.setProperty("--spot-y", `${y}%`);
    });
  });
}

/* Carrusel de productos destacados: loop continuo, sutil y sin salto visual. */
document.querySelectorAll("[data-carousel-track]").forEach((track) => {
  const wrapper = track.closest(".spotlight-carousel");
  if (!wrapper) return;

  const prevBtn = wrapper.querySelector("[data-carousel-prev]");
  const nextBtn = wrapper.querySelector("[data-carousel-next]");
  if (!prevBtn || !nextBtn) return;

  const originalCards = Array.from(track.children);
  const shouldLoop = !mobileViewport.matches;

  if (shouldLoop) {
    const loopSets = 5;
    track.style.setProperty("--spotlight-loop-shift", `${100 / loopSets}%`);

    for (let setIndex = 1; setIndex < loopSets; setIndex += 1) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("a, button, input, select, textarea").forEach((element) => {
          element.setAttribute("tabindex", "-1");
          element.setAttribute("aria-hidden", "true");
        });
        clone.querySelectorAll("img").forEach((image) => {
          image.loading = "lazy";
          image.decoding = "async";
          image.removeAttribute("fetchpriority");
        });
        track.appendChild(clone);
      });
    }
    track.classList.add("is-looping");
  } else {
    track.classList.add("is-mobile-native");
  }

  const getStep = () => {
    const card = track.querySelector(".spotlight-card");
    const gap = 18;
    return card ? card.getBoundingClientRect().width + gap : 300;
  };

  const scrollByCard = (direction) => {
    track.classList.add("is-manually-paused");
    track.scrollBy({
      left: direction * getStep(),
      behavior: prefersReducedMotion.matches ? "auto" : "smooth",
    });
    window.setTimeout(() => {
      track.classList.remove("is-manually-paused");
    }, 1800);
  };

  const updateArrowState = () => {
    const hasOverflow = track.scrollWidth > track.clientWidth + 8;
    prevBtn.disabled = !hasOverflow;
    nextBtn.disabled = !hasOverflow;
  };

  prevBtn.addEventListener("click", () => scrollByCard(-1));
  nextBtn.addEventListener("click", () => scrollByCard(1));

  let scrollTicking = false;
  track.addEventListener("scroll", () => {
    if (scrollTicking) return;
    window.requestAnimationFrame(() => {
      updateArrowState();
      scrollTicking = false;
    });
    scrollTicking = true;
  });

  window.addEventListener("resize", updateArrowState);
  updateArrowState();

  wrapper.addEventListener("touchstart", () => {
    track.classList.add("is-manually-paused");
  }, { passive: true });
  wrapper.addEventListener("touchend", () => {
    window.setTimeout(() => {
      track.classList.remove("is-manually-paused");
    }, 2500);
  }, { passive: true });
  wrapper.addEventListener("focusin", () => {
    track.classList.add("is-manually-paused");
  });
  wrapper.addEventListener("focusout", () => {
    track.classList.remove("is-manually-paused");
  });
});
