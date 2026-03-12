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
const insuranceSelect = document.querySelector("[data-insurance-select]");
const insuranceResult = document.querySelector("[data-insurance-result]");
const compareOptions = document.querySelectorAll("[data-compare-option]");
const comparisonTable = document.querySelector("[data-comparison-table]");

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
      if (icon) icon.textContent = expanded ? "+" : "-";
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

function bindInsuranceQuiz() {
  if (!insuranceSelect || !insuranceResult) return;

  const recommendations = {
    medicare: {
      title: "Recommended: Medicare Path",
      text: "You are likely best served in the Medicare option where ACPM billing is covered and care is handled like a standard in-network provider.",
      href: "#medicare-membership"
    },
    medicaid: {
      title: "Recommended: Medicaid Path",
      text: "You can use the Medicaid option with no out-of-pocket cost for covered services. Availability may depend on the current waitlist.",
      href: "#medicaid-membership"
    },
    commercial: {
      title: "Recommended: Hybrid Membership",
      text: "Commercial plans (United/UMR, BCBS, Aetna, Cigna, Ambetter/Wellcare) are usually best matched with the Hybrid path.",
      href: "#hybrid-membership"
    },
    none: {
      title: "Recommended: Direct Membership",
      text: "Without insurance, most patients prefer the Direct Membership path for predictable monthly pricing.",
      href: "#direct-membership"
    },
    other: {
      title: "Recommended: Start with Hybrid Review",
      text: "If you are unsure of coverage, start with the Hybrid path and call us so we can verify exact fit.",
      href: "#hybrid-membership"
    }
  };

  insuranceSelect.addEventListener("change", () => {
    const selected = insuranceSelect.value;
    const option = recommendations[selected];

    if (!option) {
      insuranceResult.textContent = "Select an option above to see your recommended path.";
      return;
    }

    insuranceResult.innerHTML = `<strong>${option.title}</strong><p>${option.text}</p><p><a href="${option.href}" data-quiz-jump>Jump to this section</a></p>`;
  });

  insuranceResult.addEventListener("click", (event) => {
    const link = event.target.closest("a[data-quiz-jump]");
    if (!link) return;

    event.preventDefault();
    const targetId = link.getAttribute("href");
    if (!targetId) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    const headerOffset = header ? header.offsetHeight + 14 : 14;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  });
}

function bindComparisonTool() {
  if (!compareOptions.length || !comparisonTable) return;

  const getCheckedValues = () =>
    Array.from(compareOptions)
      .filter((input) => input.checked)
      .map((input) => input.value);

  const syncColumns = () => {
    let checked = getCheckedValues();
    if (!checked.length) {
      compareOptions[0].checked = true;
      checked = getCheckedValues();
    }

    comparisonTable.querySelectorAll("[data-plan-col]").forEach((cell) => {
      const key = cell.getAttribute("data-plan-col");
      const isVisible = checked.includes(key);
      cell.style.display = isVisible ? "" : "none";
    });
  };

  compareOptions.forEach((input) => {
    input.addEventListener("change", syncColumns);
  });

  syncColumns();
}

updateHeaderState();
bindDrawer();
bindAccordion();
bindReveal();
setYear();
bindContactForm();
bindInsuranceQuiz();
bindComparisonTool();

window.addEventListener("scroll", updateHeaderState, { passive: true });
