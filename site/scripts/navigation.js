/* Future same-screen views can register through PortfolioViews.register(). */
window.PortfolioViews = (() => {
  const handlers = new Map();
  const buttons = [...document.querySelectorAll('[data-view-target]')];

  function select(name) {
    buttons.forEach(button => {
      const selected = button.dataset.viewTarget === name;
      button.setAttribute('aria-pressed', String(selected));
      if (selected) button.setAttribute('aria-current', 'page');
      else button.removeAttribute('aria-current');
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.viewTarget;
      select(name);
      const handler = handlers.get(name);
      if (handler) handler();
    });
  });

  const aboutPanel = document.getElementById('about');
  const contactPanel = document.getElementById('contact');
  const homePanel = document.getElementById('home');
  if (homePanel) {
    handlers.set('home', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  if (aboutPanel) {
    handlers.set('about', () => aboutPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }
  if (contactPanel) {
    handlers.set('contact', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));
  }
  if (aboutPanel || contactPanel) {
    const header = document.querySelector('.site-header');
    const portfolio = document.querySelector('.portfolio');
    addEventListener('scroll', () => {
      if (document.documentElement.classList.contains('cases-open')) return;
      const headerHeight = header.getBoundingClientRect().height;
      const aboutRect = aboutPanel?.getBoundingClientRect();
      const heroCovered = aboutRect && aboutRect.top <= headerHeight + 1;
      const contactRevealed = aboutRect && aboutRect.bottom <= headerHeight + 1;
      portfolio?.classList.toggle('is-contact-revealed', Boolean(heroCovered));
      if (contactRevealed) select('contact');
      else if (heroCovered) select('about');
      else select('home');
    }, { passive: true });
  }

  async function copyText(value) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        return;
      } catch {
        // Local file previews may not grant the Clipboard API; use the legacy fallback.
      }
    }
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  document.querySelectorAll('.copy-contact').forEach(button => {
    const tip = button.querySelector('.copy-tip');
    const defaultTip = tip.textContent;
    button.addEventListener('click', async () => {
      try {
        await copyText(button.dataset.copyText);
        tip.textContent = '已复制';
      } catch {
        tip.textContent = '复制失败';
      }
      setTimeout(() => { tip.textContent = defaultTip; }, 1400);
    });
  });

  return {
    register(name, handler) {
      if (typeof handler !== 'function') throw new TypeError('View handler must be a function');
      handlers.set(name, handler);
    },
    select
  };
})();
