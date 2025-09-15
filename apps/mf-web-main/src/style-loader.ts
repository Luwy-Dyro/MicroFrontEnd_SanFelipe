const loaded = new Set<string>();

export function ensureStyle(href: string) {
  if (loaded.has(href)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
  loaded.add(href);
}