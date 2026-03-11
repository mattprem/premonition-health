const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const drawer = document.querySelector("[data-mobile-drawer]");
const drawerClose = document.querySelector("[data-menu-close]");
const drawerBackdrop = document.querySelector("[data-menu-backdrop]");
const accordionTriggers = document.querySelectorAll("[data-accordion-trigger]");
const revealItems = document.querySelectorAll("[data-reveal]");
const yearTargets = document.querySelectorAll("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setDrawerState(open) {
  if (!drawer || !menuToggle) return;
  drawer.setAttribute("aria-hidden", String(!open));
  menuToggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("nav-open", open);
}

function bindDrawer() {
  if (!menuToggle || !drawer) return;

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    setDrawerState(open);
  });

  drawerClose?.addEventListener("click", () => setDrawerState(false));
  drawerBackdrop?.addEventListener("click", () => setDrawerState(false));

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setDrawerState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDrawerState(false);
  });
}

function bindAccordion() {
  accordionTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = document.getElementById(button.getAttribute("aria-controls"));
      const icon = button.querySelector(".faq-icon");

      button.setAttribute("aria-expanded", String(!expanded));
      if (panel) panel.hidden = expanded;
      if (icon) icon.textContent = expanded ? "+" : "−";
    });
  });
}

function bindReveal() {
  if (!revealItems.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

function setYear() {
  const year = new Date().getFullYear();
  yearTargets.forEach((target) => {
    target.textContent = String(year);
  });
}

function bindContactForm() {
  if (!contactForm || !formStatus) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const firstName = formData.get("firstName")?.toString().trim();
    const lastName = formData.get("lastName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const reason = formData.get("reason")?.toString().trim();
    const preferred = formData.get("preferred")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!firstName || !lastName || !email || !reason || !message) {
      formStatus.hidden = false;
      formStatus.textContent = "Please complete the required fields before sending your message.";
      return;
    }

    const subject = encodeURIComponent(`Premonition Health inquiry: ${reason}`);
    const body = encodeURIComponent([
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Preferred contact method: ${preferred || "Not specified"}`,
      "",
      message
    ].join("\n"));

    window.location.href = `mailto:info@premonition.health?subject=${subject}&body=${body}`;
    formStatus.hidden = false;
    formStatus.textContent = "Your email app should open now. If it does not, please call or text the clinic at (316) 789-6049.";
  });
}

updateHeaderState();
bindDrawer();
bindAccordion();
bindReveal();
setYear();
bindContactForm();

window.addEventListener("scroll", updateHeaderState, { passive: true });
