// Prefixes an absolute internal path with the configured base path (see
// astro.config.mjs `base`), so links keep working when the site is deployed
// under a subpath (e.g. GitHub Pages project sites like /portfolio/).
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
