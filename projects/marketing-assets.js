const slides = [...document.querySelectorAll("[data-gallery-slide]")];
const controls = [...document.querySelectorAll("[data-gallery-direction]")];
const counters = [...document.querySelectorAll("[data-gallery-counter]")];
const label = document.querySelector("[data-gallery-label]");

let activeIndex = 0;

const showSlide = (index) => {
  activeIndex = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  counters.forEach((counter) => {
    counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  });

  label.textContent = slides[activeIndex].dataset.label;
};

controls.forEach((control) => {
  control.addEventListener("click", () => {
    showSlide(activeIndex + Number(control.dataset.galleryDirection));
  });

  const cursor = control.querySelector(".marketing-assets-cursor");
  if (cursor) {
    control.addEventListener("pointermove", (event) => {
      const bounds = control.getBoundingClientRect();
      cursor.style.left = `${event.clientX - bounds.left}px`;
      cursor.style.top = `${event.clientY - bounds.top}px`;
    });
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showSlide(activeIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showSlide(activeIndex + 1);
  }
});

const viewer = document.querySelector('.marketing-assets-viewer');
let touchStart = null;
let ignoreClickUntil = 0;

viewer.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : null;
}, { passive: true });

viewer.addEventListener('touchmove', event => {
  if (event.touches.length !== 1) touchStart = null;
}, { passive: true });

viewer.addEventListener('touchcancel', () => { touchStart = null; });

viewer.addEventListener('touchend', event => {
  if (!touchStart || event.touches.length) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  touchStart = null;
  // Preserve vertical gestures and prevent a swipe from also triggering a click.
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  ignoreClickUntil = Date.now() + 500;
  showSlide(activeIndex + (dx < 0 ? 1 : -1));
}, { passive: true });

viewer.addEventListener('click', event => {
  if (Date.now() < ignoreClickUntil) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

showSlide(0);
