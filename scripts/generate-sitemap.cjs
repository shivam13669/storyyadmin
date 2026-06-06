const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.storiesbyfoot.com';

// Static pages
const staticPages = [
  '',
  '/destinations',
  '/contact',
  '/services',
  '/support',
  '/testimonials',
  '/about',
  '/careers',
  '/blog',
  '/terms-and-condition',
  '/privacy-policy',
  '/cookie-policy'
];

// Read destinations
const destinationsPath = path.resolve(__dirname, '../src/data/destinations.ts');
const fileContent = fs.readFileSync(destinationsPath, 'utf8');

const urls = [...staticPages];

// Regex to scan file for slugs
// For destination slugs (4 spaces indentation: `    slug: "..."`)
// For package slugs (8 spaces indentation: `        slug: "..."`)
const lines = fileContent.split('\n');
let currentDestSlug = '';

for (const line of lines) {
  // Match destination slug (4 spaces indentation followed by slug: "...")
  const destMatch = line.match(/^ {4}slug:\s*"([^"]+)"/);
  if (destMatch) {
    currentDestSlug = destMatch[1];
    urls.push(`/destinations/${currentDestSlug}`);
  }

  // Match package slug (8 spaces indentation followed by slug: "...")
  const pkgMatch = line.match(/^ {8}slug:\s*"([^"]+)"/);
  if (pkgMatch) {
    const pkgSlug = pkgMatch[1];
    if (currentDestSlug) {
      urls.push(`/destinations/${currentDestSlug}/${pkgSlug}`);
    }
  }
}

// Add blog pages
const blogSlugs = [
  'leh-ladakh-bike-trip-guide',
  'things-to-carry-in-ladakh-bike-trip',
  'petrol-pump-guide-of-ladakh',
  'zanskar-the-hidden-gem',
  'ladakh-the-land-of-high-passes',
  'aryan-s-village-of-india-in-ladakh',
  'pregnancy-tourism-in-ladakh'
];

for (const blogSlug of blogSlugs) {
  urls.push(`/blog/${blogSlug}`);
}

// Generate XML sitemap
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

const today = new Date().toISOString().split('T')[0];

for (const url of urls) {
  xml += '  <url>\n';
  xml += `    <loc>${DOMAIN}${url}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  
  // Set priority based on page type
  let priority = '0.5';
  if (url === '') priority = '1.0';
  else if (url.startsWith('/destinations/')) {
    const parts = url.split('/').filter(Boolean);
    if (parts.length > 2) {
      priority = '0.9'; // Specific package details
    } else {
      priority = '0.8'; // Destination category page
    }
  }
  else if (url.startsWith('/blog/')) priority = '0.7';
  else if (url === '/destinations' || url === '/blog') priority = '0.8';
  
  xml += `    <priority>${priority}</priority>\n`;
  xml += '  </url>\n';
}

xml += '</urlset>\n';

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`✅ Sitemap successfully generated with ${urls.length} URLs in ${outputPath}`);
