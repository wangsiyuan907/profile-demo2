/* Original folder silhouettes; shadow-only filters clipped to the whole group. */
window.createCardShadows = panel => {
  const layouts = {
    cases: [
      ['givenchy', 0, 445, 720, 2, '#92292E'], ['hdskin', 720, 445, 720, 3, '#E9C7AF'],
      ['benefit', 0, 625, 640, 5, '#FE0066'], ['mufe-cny', 640, 625, 890, 7, '#251D1F']
    ],
    collaboration: [
      ['aupres', 0, 445, 720, 2, '#EABC74'], ['aqualabel', 720, 445, 720, 3, '#BB3354'],
      ['gucci', 0, 625, 467, 5, '#DC7590'], ['dabao', 467, 625, 467, 7, '#D73E3E'],
      ['ip', 934, 625, 506, 9, '#DE862E']
    ]
  };
  const node = (tag, attributes) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value);
    return el;
  };
  const shape = width => `M0 48V6C0 2.686 2.686 0 6 0H272.09781C274.63391 0 277.1048 .8035 279.15585 2.29517L342 48H${width - 6}Q${width} 48 ${width} 54V615H0Z`;
  const layout = layouts[panel.id];
  const stage = panel.querySelector('.cases-stage');
  const shadows = new Map();
  for (const [name, x, y, width, z, color] of layout) {
    const prefix = `${panel.id}-${name}-shadow`;
    const svg = node('svg', { viewBox: '0 0 1440 820', class: 'card-shadow', 'aria-hidden': 'true', focusable: 'false' });
    svg.style.zIndex = z;
    const defs = node('defs', {});
    const clip = node('clipPath', { id: prefix + '-clip', clipPathUnits: 'userSpaceOnUse' });
    layout.forEach(([, cx, cy, cw]) => clip.append(node('path', { d: shape(cw), transform: `translate(${cx} ${cy})` })));
    const filter = node('filter', { id: prefix + '-filter', x: '-30%', y: '-30%', width: '160%', height: '160%', 'color-interpolation-filters': 'sRGB' });
    filter.append(node('feGaussianBlur', { in: 'SourceAlpha', stdDeviation: '10' }), node('feOffset', { dy: '-8', result: 'blur' }), node('feFlood', { 'flood-color': color, 'flood-opacity': '.07' }), node('feComposite', { in2: 'blur', operator: 'in' }));
    defs.append(clip, filter);
    const group = node('g', { 'clip-path': `url(#${prefix}-clip)` });
    group.append(node('path', { d: shape(width), transform: `translate(${x} ${y})`, fill: color, filter: `url(#${prefix}-filter)` }));
    svg.append(defs, group);
    stage.insertBefore(svg, panel.querySelector(`[data-case="${name}"]`));
    shadows.set(name, svg);
  }
  return shadows;
};
