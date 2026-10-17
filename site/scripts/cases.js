/* Shared catalogue controller. Detail routes remain separate from these previews. */
(() => {
  const routes = {
    givenchy: './pages/givenchy.html',
    hdskin: './pages/hdskin.html',
    benefit: './pages/benefit.html',
    'mufe-cny': './pages/mufe-cny.html',
    aupres: './pages/aupres.html',
    aqualabel: './pages/aqualabel.html',
    gucci: './pages/flora.html',
    dabao: './pages/dabao.html',
    ip: './pages/ip.html',
  };
  const backgrounds = ['home', 'about', 'contact'].map(id => document.getElementById(id));
  const controllers = new Map();
  const setLocked = locked => {
    document.documentElement.classList.toggle('cases-open', locked);
    backgrounds.forEach(element => { element.inert = locked; });
  };
  for (const id of ['cases', 'collaboration']) {
    const panel = document.getElementById(id);
    if (!panel) continue;
    const cards = [...panel.querySelectorAll('[data-case]')];
    const shadows = window.createCardShadows(panel);
    let entryFrame = 0, entryTimer = 0, ready = false;
    function resize() {
      panel.style.setProperty('--cases-scale', document.documentElement.clientWidth / 1440);
    }
    function activate(name) {
      if (name) panel.dataset.active = name;
      else delete panel.dataset.active;
      cards.forEach(card => {
        const selected = card.dataset.case === name;
        card.classList.toggle('is-active', selected);
        card.setAttribute('aria-expanded', String(selected));
        shadows.get(card.dataset.case)?.classList.toggle('is-selected', selected);
      });
    }
    function close() {
      clearTimeout(entryTimer);
      cancelAnimationFrame(entryFrame);
      ready = false;
      panel.hidden = true;
      panel.classList.remove('is-entered', 'is-ready');
      activate(null);
    }
    function open() {
      controllers.forEach(controller => controller.close());
      panel.querySelectorAll('img[data-src]').forEach(image => {
        image.src = image.dataset.src;
        delete image.dataset.src;
      });
      panel.hidden = false;
      setLocked(true);
      resize();
      void panel.offsetHeight;
      entryFrame = requestAnimationFrame(() => {
        panel.classList.add('is-entered');
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 380 + (cards.length - 1) * 65;
        entryTimer = setTimeout(() => {
          ready = true;
          panel.classList.add('is-ready');
          const hovered = cards.find(card => card.matches(':hover'));
          if (hovered) activate(hovered.dataset.case);
        }, delay);
      });
    }
    cards.forEach(card => {
      card.addEventListener('pointerenter', event => {
        if (ready && event.pointerType !== 'touch') activate(card.dataset.case);
      });
      card.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'touch' && !card.matches(':focus-visible')) activate(null);
      });
      card.addEventListener('focus', () => activate(card.dataset.case));
      card.addEventListener('blur', () => activate(null));
      card.addEventListener('click', () => {
        activate(card.dataset.case);
        window.location.href = routes[card.dataset.case];
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Escape') { card.blur(); activate(null); }
      });
    });
    controllers.set(id, { open, close });
    addEventListener('resize', resize, { passive: true });
    window.PortfolioViews.register(id, open);
  }
  document.querySelectorAll('[data-view-target]').forEach(button => {
    button.addEventListener('click', () => {
      controllers.forEach(controller => controller.close());
      setLocked(false);
    }, { capture: true });
  });
})();
