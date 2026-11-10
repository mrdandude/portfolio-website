(() => {
  const slides = [...document.querySelectorAll('[data-gallery-slide]')];
  const selectors = [...document.querySelectorAll('[data-email-index]')];
  let current = 0;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    selectors.forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
  };
  selectors.forEach(button => button.addEventListener('click', () => show(Number(button.dataset.emailIndex))));
  document.querySelectorAll('[data-gallery-direction]').forEach(button => {
    button.addEventListener('click', () => show(current + Number(button.dataset.galleryDirection)));
    button.addEventListener('pointermove', event => {
      const bounds = button.getBoundingClientRect();
      const cursor = button.querySelector('.marketing-assets-cursor');
      cursor.style.left = `${event.clientX - bounds.left}px`;
      cursor.style.top = `${event.clientY - bounds.top}px`;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  show(0);
})();
