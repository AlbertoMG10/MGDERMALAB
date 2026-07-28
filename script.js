const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const timeline = document.querySelector("[data-timeline]");
const leadForms = document.querySelectorAll(".contact-form, .individual-form");
const heroImage = document.querySelector(".hero-image");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("#main-nav");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const WHATSAPP_NUMBER = "525523348746";
const WHATSAPP_MESSAGE = "Hola, me interesa solicitar disponibilidad y cotización de productos de MG Dermalab.";
// Pega aquí la URL de webhook de Airtable Automation, Make o Zapier.
const AIRTABLE_WEBHOOK_URL = "";
let ticking = false;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileViewport = window.matchMedia("(max-width: 980px)");

const configureWhatsApp = () => {
  if (!WHATSAPP_NUMBER) {
    whatsappLinks.forEach((link) => {
      link.hidden = true;
      link.setAttribute("aria-hidden", "true");
    });
    return;
  }

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  whatsappLinks.forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.hidden = false;
    link.removeAttribute("aria-hidden");
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
  header.classList.toggle("is-scrolled", window.scrollY > 28);
};

const closeMobileMenu = () => {
  document.body.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menú");
};

const toggleMobileMenu = () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

reveals.forEach((element) => revealObserver.observe(element));

const updateTimeline = () => {
  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height * 0.75)));
  timeline.style.setProperty("--progress", `${progress * 100}%`);
};

const updateHeroParallax = () => {
  if (!heroImage) return;
  if (mobileViewport.matches || prefersReducedMotion.matches) {
    heroImage.style.transform = "";
    return;
  }
  const offset = Math.min(window.scrollY * 0.035, 18);
  heroImage.style.transform = `scale(1.025) translateY(${offset}px)`;
};

const scrollToHash = () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;

  window.setTimeout(() => {
    target.scrollIntoView({ block: "start" });
  }, 80);
};

const buildPayload = (form, data) => {
  if (form.name === "compra_individual") {
    return {
      nombre: data.get("nombre_individual"),
      tipo_cliente: "Compra individual",
      whatsapp: data.get("whatsapp_individual"),
      producto_linea: data.get("producto_individual"),
      volumen: "Compra individual",
      receta: data.get("receta"),
      origen: "Compra individual MG Dermalab",
      fecha: new Date().toISOString()
    };
  }

  return {
    nombre: data.get("nombre"),
    tipo_cliente: data.get("tipo_cliente"),
    whatsapp: data.get("whatsapp"),
    producto_linea: data.get("producto_linea"),
    volumen: data.get("volumen"),
    origen: "Sitio web MG Dermalab",
    fecha: new Date().toISOString()
  };
};

const submitLeadForm = (form, event) => {
  event.preventDefault();
  const button = form.querySelector("button");
  const status = form.querySelector(".form-status");
  const data = new FormData(form);
  const idleButtonText = button.textContent;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const payload = buildPayload(form, data);

  const finishSubmit = () => {
    button.textContent = "Solicitud recibida";
    button.disabled = false;
    if (status) status.textContent = "Solicitud recibida. Te contactaremos por WhatsApp.";
    form.classList.add("is-submitted");
    form.reset();
    trackEvent("lead_form_submit", {
      form_name: form.name,
      tipo_cliente: payload.tipo_cliente,
      producto_linea: payload.producto_linea
    });
  };

  const openWhatsAppFallback = () => {
    const recetaText = payload.receta ? ` Cuento con receta médica: ${payload.receta}.` : "";
    const message = `Hola, soy ${payload.tipo_cliente || "cliente"} y me gustaría cotizar ${payload.producto_linea || "productos de MG Dermalab"}. Cantidad aproximada: ${payload.volumen || "por definir"}. Mi nombre es ${payload.nombre || ""}.${recetaText}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    trackEvent("whatsapp_lead", {
      form_name: form.name,
      tipo_cliente: payload.tipo_cliente,
      producto_linea: payload.producto_linea
    });
  };

  button.textContent = "Enviando...";
  button.disabled = true;
  if (status) status.textContent = "Enviando solicitud...";

  if (AIRTABLE_WEBHOOK_URL) {
    fetch(AIRTABLE_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload)
    })
      .then(() => {
        finishSubmit();
      })
      .catch(() => {
        button.disabled = false;
        button.textContent = idleButtonText;
        if (status) status.textContent = "No pudimos guardar la solicitud. Abriremos WhatsApp para continuar.";
        openWhatsAppFallback();
      });
    return;
  }

  if (form.dataset.netlify !== undefined && window.location.protocol !== "file:") {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    })
      .then(() => {
        finishSubmit();
      })
      .catch(() => {
        button.disabled = false;
        button.textContent = idleButtonText;
        if (status) status.textContent = "No pudimos guardar la solicitud. Abriremos WhatsApp para continuar.";
        openWhatsAppFallback();
      });
    return;
  }

  finishSubmit();
  openWhatsAppFallback();
};

leadForms.forEach((leadForm) => {
  leadForm.addEventListener("submit", (event) => submitLeadForm(leadForm, event));
});

whatsappLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("whatsapp_click", { location: link.textContent.trim() || link.getAttribute("aria-label") || "WhatsApp" });
  });
});

menuToggle?.addEventListener("click", toggleMobileMenu);

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileMenu();
});

window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateHeader();
    updateTimeline();
    updateHeroParallax();
    ticking = false;
  });
}, { passive: true });

window.addEventListener("resize", () => {
  if (!mobileViewport.matches) closeMobileMenu();
  updateHeader();
  updateTimeline();
  updateHeroParallax();
});
window.addEventListener("hashchange", scrollToHash);

updateHeader();
updateTimeline();
updateHeroParallax();
configureWhatsApp();
scrollToHash();
