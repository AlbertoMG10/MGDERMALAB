const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const timeline = document.querySelector("[data-timeline]");
const leadForms = document.querySelectorAll(".contact-form, .individual-form");
const heroImage = document.querySelector(".hero-image");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");

const WHATSAPP_NUMBER = "525523348746";
const WHATSAPP_MESSAGE =
  "Hola, me interesa solicitar disponibilidad y cotización de productos de MG Dermalab.";
const LEADS_ENDPOINT = "https://mgdermalab-backend.onrender.com/api/leads";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 980px)");

let ticking = false;

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

const buildContactPayload = (data) => {
  const tipoCliente = normalizeValue(data.get("tipo_cliente"));
  const producto = normalizeValue(data.get("producto_linea"));
  const cantidad = normalizeValue(data.get("volumen"));

  return {
    nombre: normalizeValue(data.get("nombre")),
    whatsapp: normalizeValue(data.get("whatsapp")),
    tipoCliente,
    producto,
    cantidad,
    receta: "",
    mensaje: `Solicitud desde formulario de cotización. Tipo de cliente: ${tipoCliente}. Producto o línea: ${producto}. Cantidad aproximada: ${cantidad}.`,
    ...getTrackingParams(),
  };
};

const buildIndividualPayload = (data) => {
  const producto = normalizeValue(data.get("producto_individual"));
  const receta = normalizeValue(data.get("receta"));

  return {
    nombre: normalizeValue(data.get("nombre_individual")),
    whatsapp: normalizeValue(data.get("whatsapp_individual")),
    tipoCliente: "Compra individual",
    producto,
    cantidad: "1",
    receta,
    mensaje: `Compra individual. Producto de interés: ${producto}. Receta médica: ${receta}.`,
    ...getTrackingParams(),
  };
};

const buildPayload = (form, data) => {
  if (form.matches(".individual-form")) {
    return buildIndividualPayload(data);
  }

  return buildContactPayload(data);
};

const setFormStatus = (form, message, state = "") => {
  const status = form.querySelector(".form-status");
  if (!status) return;

  status.textContent = message;
  status.dataset.state = state;
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

  if (button) {
    button.disabled = true;
    button.textContent = "Enviando...";
  }
  setFormStatus(form, "Enviando...", "loading");

  try {
    const response = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Lead endpoint responded with ${response.status}`);
    }

    form.reset();
    setFormStatus(form, "Solicitud enviada correctamente.", "success");
    trackEvent("lead_form_submit", {
      form_name: form.getAttribute("name") || "lead",
      tipo_cliente: payload.tipoCliente,
      producto: payload.producto,
    });
  } catch (error) {
    setFormStatus(
      form,
      "No fue posible enviar la solicitud. Inténtalo nuevamente o contáctanos por WhatsApp.",
      "error"
    );
    trackEvent("lead_form_error", {
      form_name: form.getAttribute("name") || "lead",
      message: error.message,
    });
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
};

leadForms.forEach((form) => {
  form.addEventListener("submit", (event) => submitLeadForm(form, event));
});

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
scrollToHash();
