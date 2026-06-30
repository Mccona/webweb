const header = document.querySelector("[data-header]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const originalLink = document.querySelector("[data-original-link]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
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
window.addEventListener("scroll", updateHeader, { passive: true });
