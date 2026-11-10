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
  const viewer = document.querySelector('.newsletter-viewer');
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
    // Keep vertical scrolling native and ignore incidental sideways movement.
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    ignoreClickUntil = Date.now() + 500;
    show(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  viewer.addEventListener('click', event => {
    if (Date.now() < ignoreClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  show(0);
})();
