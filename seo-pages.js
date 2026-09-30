(() => {
  const attributionKeys = ["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  try {
    const params = new URLSearchParams(window.location.search);
    attributionKeys.forEach((key) => {
      const storageKey = `mg_first_touch_${key}`;
      if (sessionStorage.getItem(storageKey) === null && params.get(key)) {
        sessionStorage.setItem(storageKey, params.get(key));
      }
    });

    if (sessionStorage.getItem("mg_first_touch_landing_url") === null) {
      sessionStorage.setItem("mg_first_touch_landing_url", window.location.href);
    }
  } catch {
    // Attribution must never block product-page interactions.
  }

  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.getElementById("main-nav");

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  updateHeader();
  window.addEventListener("scroll", updateHeader, {passive: true});

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    toggle.setAttribute("aria-label", expanded ? "Abrir menú" : "Cerrar menú");
    menu?.classList.toggle("is-open", !expanded);
  });

  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
  }));

  document.querySelectorAll("[data-seo-whatsapp]").forEach((link) => {
    link.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "whatsapp_click",
        product_name: link.dataset.productName || "",
        category: link.dataset.category || "",
        presentation: link.dataset.presentation || "",
        location: "product-whatsapp"
      });
    });
  });
})();
