/**
 * Generates public/sitemap.xml (runs automatically on every `pnpm build`).
 *
 * - Every static page, blog post, destination page and package page is listed.
 * - Package pages include <image:image> entries (helps Google Images).
 * - <lastmod> = date of the latest git commit (stable between builds of the same
 *   commit — Google ignores lastmod values that change on every crawl).
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { DOMAIN, loadDestinations, loadBlogs, staticPagesSEO } = require('./seo-data.cjs');

const xmlEsc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const lastmod = (() => {
  try {
    const d = execSync('git log -1 --format=%cs', { cwd: path.resolve(__dirname, '..'), stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch (e) { /* not a git checkout */ }
  return new Date().toISOString().split('T')[0];
})();

(async () => {
const destinations = loadDestinations();
const blogsSEO = await loadBlogs(destinations);
const entries = [];

const add = (loc, priority, changefreq, images = []) => entries.push({ loc, priority, changefreq, images });

add('', '1.0', 'weekly');
add('/destinations', '0.9', 'weekly');

for (const dest of destinations) {
  add(`/destinations/${dest.slug}`, '0.9', 'weekly', dest.heroImage ? [dest.heroImage] : []);
  for (const pkg of dest.packages) {
    const imgs = [pkg.image, ...(pkg.galleryImages || [])].filter(Boolean);
    add(`/destinations/${dest.slug}/${pkg.slug}`, '0.8', 'weekly', Array.from(new Set(imgs)).slice(0, 5));
  }
}

add('/blog', '0.7', 'weekly');
for (const slug of Object.keys(blogsSEO)) add(`/blog/${slug}`, '0.7', 'monthly');

for (const route of Object.keys(staticPagesSEO)) {
  if (route === '/blog') continue;
  const legal = /terms|privacy|cookie/.test(route);
  add(route, legal ? '0.2' : route === '/about' || route === '/contact' || route === '/services' ? '0.6' : '0.4', legal ? 'yearly' : 'monthly');
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
for (const e of entries) {
  xml += '  <url>\n';
  xml += `    <loc>${xmlEsc(DOMAIN + e.loc)}</loc>\n`;
  xml += `    <lastmod>${lastmod}</lastmod>\n`;
  xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
  xml += `    <priority>${e.priority}</priority>\n`;
  for (const img of e.images) xml += `    <image:image><image:loc>${xmlEsc(img)}</image:loc></image:image>\n`;
  xml += '  </url>\n';
}
xml += '</urlset>\n';

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`✅ Sitemap generated with ${entries.length} URLs (lastmod ${lastmod}) → ${outputPath}`);
})().catch((e) => { console.error('❌ Sitemap generation failed:', e); process.exit(1); });
