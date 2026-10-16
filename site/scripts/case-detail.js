/* The foreground, including the sticky sidebar, covers the fixed footer.
   The sidebar only leaves with its containing sheet at the end of the case. */
(() => {
  const sheet = document.querySelector('.detail-foreground');
  const footer = document.querySelector('.other-cases');
  let pending = false;
  function loadFooterCovers() {
    footer.querySelectorAll('img[data-src]').forEach(image => {
      image.src = image.dataset.src;
      delete image.dataset.src;
    });
  }
  function update() {
    pending = false;
    const distance = sheet.getBoundingClientRect().bottom - footer.getBoundingClientRect().top;
    footer.inert = distance > 1;
    if (distance <= innerHeight / 2) loadFooterCovers();
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
})();
