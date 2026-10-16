/* Shared catalogue controller. Detail routes remain separate from these previews. */
(() => {
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
        if (card.dataset.case === 'ip') card.querySelector('.case-name').textContent = selected ? '公司IP提案' : 'IP视觉探索内部提案与3D转化';
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
        if (card.dataset.case === 'givenchy') window.location.href = './pages/givenchy.html';
        if (card.dataset.case === 'hdskin') window.location.href = './pages/hdskin.html';
        if (card.dataset.case === 'benefit') window.location.href = './pages/benefit.html';
        if (card.dataset.case === 'mufe-cny') window.location.href = './pages/mufe-cny.html';
        if (card.dataset.case === 'aupres') window.location.href = './pages/aupres.html';
        if (card.dataset.case === 'aqualabel') window.location.href = './pages/aqualabel.html';
        if (card.dataset.case === 'gucci') window.location.href = './pages/flora.html';
        if (card.dataset.case === 'dabao') window.location.href = './pages/dabao.html';
        if (card.dataset.case === 'ip') window.location.href = './pages/ip.html';
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
