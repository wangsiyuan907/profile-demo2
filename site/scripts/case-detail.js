/* The foreground, including the sticky sidebar, covers the fixed footer.
   The sidebar only leaves with its containing sheet at the end of the case. */
(() => {
  const sheet = document.querySelector('.detail-foreground');
  const footer = document.querySelector('.other-cases');
  let pending = false;
  function update() {
    pending = false;
    footer.inert = sheet.getBoundingClientRect().bottom > footer.getBoundingClientRect().top + 1;
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  update();
})();
