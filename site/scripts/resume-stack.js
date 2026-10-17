(() => {
  const stack = document.querySelector('.resume-stack');
  if (!stack) return;
  const cards = [...stack.querySelectorAll('[data-resume-card]')];
  let switching = false;

  function activate(next) {
    stack.dataset.activeCard = next.dataset.resumeCard;
    for (const card of cards) {
      const front = card === next;
      card.classList.toggle('is-front', front);
      card.setAttribute('aria-pressed', String(front));
      card.setAttribute('aria-hidden', String(!front));
      card.tabIndex = front ? 0 : -1;
      card.inert = !front;
    }
  }

  function switchCard(card) {
    if (switching || !card.classList.contains('is-front')) return;
    switching = true;
    const next = cards.find(candidate => candidate !== card);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    stack.classList.add('is-switching');
    setTimeout(() => {
      stack.classList.remove('is-switching');
      activate(next);
      next.focus({ preventScroll: true });
      setTimeout(() => { switching = false; }, reducedMotion ? 0 : 580);
    }, reducedMotion ? 0 : 230);
  }

  for (const card of cards) {
    card.addEventListener('click', () => switchCard(card));
    card.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      switchCard(card);
    });
  }
})();
