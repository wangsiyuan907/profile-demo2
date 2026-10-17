(() => {
  const app = document.getElementById('mobile-app');
  const navLinks = [...document.querySelectorAll('.mobile-nav a')];
  const copyright = '© 2026 王思远。本网站为个人非商业作品集，仅用于展示本人参与或负责的已公开项目及专业能力。品牌名称、商标及项目素材的相关权利归各自权利人所有。未经许可，请勿转载或用于商业用途。如有权利问题，请通过本站联系方式联系。';
  const core = [
    { slug: 'givenchy', title: '纪梵希 2026中国新年', role: '项目视觉主导 / 节点整合', cover: './asset/hdskin/other-givenchy.png' },
    { slug: 'hdskin', title: '玫珂菲HD Skin丝绒粉饼', role: '核心视觉主导 / 产品资产构建', cover: './asset/givenchy/cover-hdskin.png' },
    { slug: 'benefit', title: '贝玲妃2023双11大促', role: '独立创意与全案视觉设计', cover: './asset/givenchy/cover-benefit.png' },
    { slug: 'mufe-cny', title: '玫珂菲2025中国新年', role: '场景概念提案与全案视觉', cover: './asset/givenchy/cover-mufe.png' },
  ];
  const collaboration = [
    { slug: 'aupres', title: 'AUPRES 双泵精华', role: '产品建模 / 结构视觉资产', cover: './asset/shared/recommend-aupres-mastergo-3x.jpg' },
    { slug: 'aqualabel', title: '水之印系列产品视觉构建', role: '产品效果图 / 系列视觉资产', cover: './asset/flora/recommend-aqualabel.jpg' },
    { slug: 'flora', title: 'Flora香水动态视觉探索', role: '产品建模 / 前段动画', cover: './asset/aqualabel/original-recommend-gucci.jpg' },
    { slug: 'dabao', title: '麻将礼盒开盒动画', role: '礼盒三维 / 开盒动画', cover: './asset/aqualabel/original-recommend-dabao.jpg' },
    { slug: 'ip', title: '公司 IP 视觉探索与三维延展', role: '独立提案 / 三维五视图', cover: './asset/aqualabel/original-recommend-ip.jpg' },
  ];
  const allCases = [...core, ...collaboration];
  let renderNumber = 0;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }
  function photo(src, alt, eager = false) {
    const image = element('img');
    image.src = src;
    image.alt = alt || '';
    image.loading = eager ? 'eager' : 'lazy';
    image.decoding = 'async';
    return image;
  }
  function card(item, index) {
    const link = element('a', 'mobile-case-card');
    link.href = `#case/${item.slug}`;
    link.dataset.slug = item.slug;
    link.append(photo(item.cover, item.title));
    const copy = element('span', 'mobile-card-copy');
    copy.append(element('span', 'mobile-card-index', String(index + 1).padStart(2, '0')));
    copy.append(element('strong', 'mobile-card-title', item.title));
    copy.append(element('span', 'mobile-card-role', item.role));
    link.append(copy);
    return link;
  }
  function cards(items) {
    const list = element('div', 'mobile-card-list');
    items.forEach((item, index) => list.append(card(item, index)));
    return list;
  }
  function page(className, view) {
    const container = element('div', `mobile-page ${className}`);
    container.dataset.mobileView = view;
    return container;
  }
  function title(kicker, heading) {
    const wrap = element('div');
    wrap.append(element('p', 'mobile-eyebrow', kicker));
    wrap.append(element('h1', '', heading));
    return wrap;
  }
  function show(node, view, documentTitle) {
    app.replaceChildren(node);
    const current = view === 'case' ? (core.some(item => location.hash === `#case/${item.slug}`) ? 'cases' : 'collaboration') : view;
    navLinks.forEach(link => {
      if (link.dataset.route === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = `${documentTitle}｜王思远の作品集`;
    window.scrollTo(0, 0);
  }
  function renderHome() {
    const container = page('mobile-home', 'home');
    const art = element('div', 'mobile-hero-art');
    const portrait = photo('./asset/images/portrait-upscaled.png', '王思远抱着猫的个人插画', true);
    portrait.srcset = './asset/optimized/images/portrait-upscaled-1200.webp 1200w, ./asset/optimized/images/portrait-upscaled-2048.webp 2048w, ./asset/images/portrait-upscaled.png 2625w';
    portrait.sizes = '90vw';
    art.append(portrait);
    container.append(art);
    container.append(title('PORTFOLIO / 2026', '让复杂的需求，变成清楚又好看的答案。'));
    container.append(element('p', 'mobile-lead', '10年美妆奢品电商视觉设计'));
    const actions = element('div', 'mobile-home-actions');
    const caseLink = element('a', 'mobile-action primary', '查看案例');
    caseLink.href = '#cases';
    const contactLink = element('a', 'mobile-action', '联系我');
    contactLink.href = '#contact';
    actions.append(caseLink, contactLink);
    container.append(actions);
    show(container, 'home', '首页');
  }
  function renderList(kind) {
    const isCore = kind === 'cases';
    const container = page('mobile-list', kind);
    container.append(title(isCore ? 'SELECTED WORK' : 'COLLABORATION', isCore ? '核心案例' : '协作项目'));
    container.append(element('p', 'mobile-list-intro', isCore ? '从视觉判断到多触点交付。' : '具体工作范围与协作边界，详见每个案例。'));
    container.append(cards(isCore ? core : collaboration));
    show(container, kind, isCore ? '核心案例' : '协作项目');
  }
  function renderAbout() {
    const container = page('mobile-about', 'about');
    container.append(title('2026 RESUME', '关于我'));
    const card = element('article', 'mobile-about-card');
    const top = element('div', 'mobile-about-top');
    top.append(photo('./asset/about/resume-portrait-peace.png', '王思远人物插画'));
    const intro = element('div');
    intro.append(element('h2', '', '王思远'));
    intro.append(element('p', '', '北京｜10年电商视觉经验'));
    intro.append(element('p', '', '高端美妆｜3–4人团队管理'));
    top.append(intro);
    card.append(top);
    const facts = element('div', 'mobile-about-facts');
    for (const [label, value] of [
      ['最近经历', '2020.05–2026.04　上海鲲驰贸易发展有限公司北京分公司｜设计主管'],
      ['工作方向', '奢侈美妆、电商品牌视觉；GIVENCHY、MAKE UP FOR EVER、BENEFIT'],
      ['管理与交付', '常态管理3–4人设计小组，累计带教10名设计师；负责需求拆解、排期、审核与视觉交付。'],
      ['教育背景', '长江大学｜艺术设计专业｜本科'],
    ]) {
      const row = element('div');
      row.append(element('strong', '', label), element('span', '', value));
      facts.append(row);
    }
    card.append(facts);
    container.append(card);
    show(container, 'about', '关于');
  }
  function renderContact() {
    const container = page('mobile-contact', 'contact');
    container.append(title('CONTACT', '联系我'));
    const art = element('div', 'mobile-contact-visual');
    const contactArt = photo('./asset/contact/contact-sit-highres.png', '', true);
    contactArt.srcset = './asset/optimized/contact/contact-sit-highres-1200.webp 1200w, ./asset/optimized/contact/contact-sit-highres-2560.webp 2560w, ./asset/contact/contact-sit-highres.png 6144w';
    contactArt.sizes = '85vw';
    art.append(contactArt);
    container.append(art);
    const list = element('div', 'mobile-contact-list');
    for (const [label, value] of [['微信', 'CU_Nextday'], ['电话', '13522972710'], ['邮箱', '987685224@qq.com']]) {
      const button = element('button', '', `${label}　${value}`);
      button.type = 'button';
      button.dataset.copy = value;
      button.append(element('small', '', '点击复制'));
      list.append(button);
    }
    const resume = element('a', 'mobile-resume-link', '下载PDF简历　↗');
    resume.href = './asset/documents/王思远_设计主管版.pdf';
    resume.download = '王思远_设计主管版.pdf';
    list.append(resume);
    container.append(list);
    container.append(photo('./asset/contact/wechat-qrcode-black.svg', '微信二维码'));
    container.lastElementChild.className = 'mobile-qr';
    container.append(element('p', 'mobile-copyright', copyright));
    show(container, 'contact', '联系');
  }
  function resolvedAsset(value, sourceUrl) {
    return new URL(value, sourceUrl).href;
  }
  function media(source, sourceUrl, caption) {
    const figure = element('figure', 'mobile-case-media');
    if (source.tagName === 'IMG') {
      const src = resolvedAsset(source.getAttribute('src'), sourceUrl);
      const image = photo(src, source.getAttribute('alt') || '');
      const srcset = source.getAttribute('srcset');
      if (srcset) {
        image.srcset = srcset.split(',').map(candidate => {
          const [url, descriptor] = candidate.trim().split(/\s+/, 2);
          return `${resolvedAsset(url, sourceUrl)} ${descriptor}`;
        }).join(', ');
        image.sizes = '100vw';
      }
      if (source.getAttribute('width')) image.width = Number(source.getAttribute('width'));
      if (source.getAttribute('height')) image.height = Number(source.getAttribute('height'));
      if (src.includes('/asset/ip/')) {
        const fullSize = element('a');
        fullSize.href = src;
        fullSize.target = '_blank';
        fullSize.rel = 'noopener';
        fullSize.setAttribute('aria-label', `查看原图：${image.alt}`);
        fullSize.append(image);
        figure.append(fullSize);
        caption = caption ? `${caption.trim()} · 点按查看原图` : '点按查看原图';
      } else figure.append(image);
    } else {
      const video = element('video');
      const src = source.getAttribute('src') || source.querySelector('source')?.getAttribute('src');
      if (!src) return null;
      video.src = resolvedAsset(src, sourceUrl);
      if (source.getAttribute('poster')) video.poster = resolvedAsset(source.getAttribute('poster'), sourceUrl);
      video.controls = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-label', source.getAttribute('aria-label') || '案例视频');
      figure.append(video);
    }
    if (caption) figure.append(element('figcaption', '', caption.trim()));
    return figure;
  }
  function facts(source) {
    const list = element('dl', 'mobile-case-facts');
    for (const entry of source.querySelectorAll(':scope > div')) {
      const row = element('div');
      row.append(element('dt', '', entry.querySelector('dt')?.textContent.trim() || ''));
      row.append(element('dd', '', entry.querySelector('dd')?.textContent.trim() || ''));
      list.append(row);
    }
    return list;
  }
  function renderSection(source, sourceUrl, slug) {
    const section = element('section', 'mobile-case-section');
    function walk(node) {
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName;
      if (node.matches('dl.case-facts')) { section.append(facts(node)); return; }
      if (tag === 'FIGURE') {
        const original = node.querySelector('img, video');
        if (original) {
          const rendered = media(original, sourceUrl, node.querySelector('figcaption')?.textContent || '');
          if (rendered) section.append(rendered);
        }
        return;
      }
      if (tag === 'H2') { section.append(element('h2', '', node.innerText.replace(/\s+/g, ' ').trim())); return; }
      if (tag === 'P') { section.append(element('p', '', node.innerText.replace(/\s+/g, ' ').trim())); return; }
      if (tag === 'IMG') {
        if (node.getAttribute('aria-hidden') === 'true' || (!node.getAttribute('alt') && !node.className.includes('logo'))) return;
        if (node.className.includes('logo')) {
          const logo = photo(resolvedAsset(node.getAttribute('src'), sourceUrl), node.getAttribute('alt') || '');
          if (node.getAttribute('width')) logo.width = Number(node.getAttribute('width'));
          if (node.getAttribute('height')) logo.height = Number(node.getAttribute('height'));
          logo.className = 'mobile-case-logo';
          section.append(logo);
        } else section.append(media(node, sourceUrl));
        return;
      }
      if (tag === 'VIDEO') { const rendered = media(node, sourceUrl); if (rendered) section.append(rendered); return; }
      for (const child of node.children) walk(child);
    }
    if (slug === 'ip' && source.classList.contains('ip-direction-two')) {
      for (const child of source.querySelectorAll('h2, p')) walk(child);
      for (const child of source.children) if (!child.querySelector('h2, p') && !child.matches('h2, p')) walk(child);
    } else for (const child of source.children) walk(child);
    return section.children.length ? section : null;
  }
  async function renderCase(slug, currentRender) {
    const meta = allCases.find(item => item.slug === slug);
    if (!meta) { renderHome(); return; }
    app.replaceChildren(element('p', 'mobile-error', '案例载入中…'));
    try {
      const sourceUrl = new URL(`./pages/${slug}.html`, location.href);
      const response = await fetch(sourceUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const source = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (currentRender !== renderNumber) return;
      const sidebar = source.querySelector('.case-sidebar');
      const originalSections = source.querySelectorAll('.case-body-inner > section');
      if (!sidebar || !originalSections.length) throw new Error('案例正文缺失');
      const container = page('mobile-case', 'case');
      const back = element('a', 'mobile-back', '← 返回查看更多案例');
      back.href = core.includes(meta) ? '#cases' : '#collaboration';
      container.append(back);
      const hero = element('header', 'mobile-case-hero');
      hero.append(element('h1', '', sidebar.querySelector('h1')?.textContent.trim() || meta.title));
      hero.append(element('p', 'mobile-case-year', sidebar.querySelector('.case-brand-year')?.textContent.trim() || ''));
      hero.append(element('p', 'mobile-case-summary', sidebar.querySelector('.case-summary')?.textContent.trim() || ''));
      container.append(hero);
      const content = element('div', 'mobile-case-content');
      originalSections.forEach(original => {
        const section = renderSection(original, sourceUrl, slug);
        if (section) content.append(section);
      });
      container.append(content);
      const recommendations = element('section', 'mobile-recommendations');
      recommendations.append(element('h2', '', '更多案例'));
      const recommended = [...source.querySelectorAll('.other-cases-grid a')].map(link => {
        const name = link.getAttribute('href')?.match(/([\w-]+)\.html/)?.[1];
        const fallback = allCases.find(item => item.slug === name);
        if (!fallback) return null;
        return {
          ...fallback,
          title: link.querySelector('strong')?.textContent.trim() || fallback.title,
          role: link.querySelector('.other-caption span')?.textContent.trim() || fallback.role,
          cover: resolvedAsset(link.querySelector('.other-cover')?.getAttribute('src') || link.querySelector('.other-cover')?.getAttribute('data-src') || fallback.cover, sourceUrl),
        };
      }).filter(Boolean);
      recommendations.append(cards(recommended));
      container.append(recommendations, element('p', 'mobile-copyright', copyright));
      show(container, 'case', sidebar.querySelector('h1')?.textContent.trim() || meta.title);
    } catch (error) {
      if (currentRender !== renderNumber) return;
      const fail = page('mobile-error', 'error');
      fail.append(element('h1', '', '案例暂时无法载入'));
      fail.append(element('p', '', '请稍后重试，或返回案例目录。'));
      const back = element('a', 'mobile-action', '返回案例目录');
      back.href = core.includes(meta) ? '#cases' : '#collaboration';
      fail.append(back);
      show(fail, 'error', '无法载入');
      console.error('Mobile case load failed:', error);
    }
  }
  function render() {
    const currentRender = ++renderNumber;
    const route = decodeURIComponent(location.hash.slice(1));
    if (route.startsWith('case/')) return renderCase(route.slice(5), currentRender);
    if (route === 'cases' || route === 'collaboration') return renderList(route);
    if (route === 'about') return renderAbout();
    if (route === 'contact') return renderContact();
    renderHome();
  }
  app.addEventListener('click', async event => {
    const button = event.target.closest('button[data-copy]');
    if (!button) return;
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.querySelector('small').textContent = '已复制';
    } catch {
      button.querySelector('small').textContent = '请长按复制';
    }
  });
  addEventListener('hashchange', render);
  render();
})();
