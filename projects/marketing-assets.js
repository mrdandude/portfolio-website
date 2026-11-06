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

showSlide(0);
