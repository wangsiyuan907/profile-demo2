(() => {
  const videos = [...document.querySelectorAll('.flora-video video')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting, intersectionRatio }) => {
        if (isIntersecting && intersectionRatio >= .45) target.play().catch(() => {});
        else target.pause();
      });
    }, { threshold: [.45] });
    videos.forEach(video => observer.observe(video));
  }
  videos.forEach(video => {
    video.tabIndex = 0;
    video.addEventListener('click', () => video.paused ? video.play().catch(() => {}) : video.pause());
    video.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      video.click();
    });
  });
})();
