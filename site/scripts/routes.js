/* Deep links from case pages reuse existing view buttons and catalogue states. */
(() => {
  function navigate() {
    const [view, cardName] = location.hash.slice(1).split('/');
    const allowed = ['home', 'cases', 'collaboration', 'about', 'contact'];
    if (!allowed.includes(view)) return;
    document.querySelector(`[data-view-target="${view}"]`)?.click();
    if (cardName && ['cases', 'collaboration'].includes(view)) {
      const panel = document.getElementById(view);
      const card = [...panel.querySelectorAll('[data-case]')].find(item => item.dataset.case === cardName);
      if (card) card.focus({ preventScroll: true });
    }
  }
  addEventListener('hashchange', navigate);
  navigate();
})();
