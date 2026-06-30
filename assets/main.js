const header = document.querySelector("[data-header]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const originalLink = document.querySelector("[data-original-link]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const revealTargets = [
  ...document.querySelectorAll(
    ".section-heading, .work-thumb, .price-card, .notice-list, .event-card, .contact-panel"
  ),
];

const setupReveals = () => {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");

    if (element.classList.contains("work-thumb")) {
      element.style.transitionDelay = `${Math.min(index % 8, 7) * 35}ms`;
    }
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.08,
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
};

const closeLightbox = () => {
  if (!lightbox || !lightbox.open) return;

  lightbox.close();
  document.body.classList.remove("lightbox-open");
};

document.querySelectorAll(".work-thumb").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightbox.showModal) {
      window.open(button.dataset.full, "_blank", "noopener");
      return;
    }

    lightboxImage.src = button.dataset.full;
    originalLink.href = button.dataset.original;
    originalLink.hidden = false;
    if (!lightbox.open) lightbox.showModal();
    document.body.classList.add("lightbox-open");
  });
});

document.querySelectorAll(".qr-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightbox.showModal) {
      window.open(button.dataset.qr, "_blank", "noopener");
      return;
    }

    lightboxImage.src = button.dataset.qr;
    originalLink.hidden = true;
    if (!lightbox.open) lightbox.showModal();
    document.body.classList.add("lightbox-open");
  });
});

document.querySelectorAll(".event-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!expanded));
    detail.hidden = expanded;
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.body.classList.remove("lightbox-open");
  }
});

updateHeader();
setupReveals();
requestAnimationFrame(() => document.body.classList.add("is-ready"));
window.addEventListener("scroll", updateHeader, { passive: true });
