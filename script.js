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
