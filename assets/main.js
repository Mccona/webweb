const header = document.querySelector("[data-header]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const originalLink = document.querySelector("[data-original-link]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
let lightboxRequestId = 0;

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

const showLightboxImage = ({ src, original, originalVisible }) => {
  if (!lightbox || !lightbox.showModal) {
    window.open(src, "_blank", "noopener");
    return;
  }

  const requestId = ++lightboxRequestId;

  lightbox.classList.add("is-loading");
  lightboxImage.removeAttribute("src");
  originalLink.hidden = true;
  if (!lightbox.open) lightbox.showModal();
  document.body.classList.add("lightbox-open");

  const nextImage = new Image();
  nextImage.onload = () => {
    if (requestId !== lightboxRequestId) return;

    lightboxImage.src = src;
    originalLink.href = original || "#";
    originalLink.hidden = !originalVisible;
    lightbox.classList.remove("is-loading");
  };
  nextImage.onerror = () => {
    if (requestId !== lightboxRequestId) return;
    lightbox.classList.remove("is-loading");
  };
  nextImage.src = src;
};

document.querySelectorAll(".work-thumb").forEach((button) => {
  button.addEventListener("click", () => {
    showLightboxImage({
      src: button.dataset.full,
      original: button.dataset.original,
      originalVisible: true,
    });
  });
});

document.querySelectorAll(".qr-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    showLightboxImage({
      src: button.dataset.qr,
      originalVisible: false,
    });
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
    lightboxRequestId += 1;
    lightbox.classList.remove("is-loading");
    lightboxImage.removeAttribute("src");
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
