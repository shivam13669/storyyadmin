/**
 * Static prerender for SEO.
 *
 * After `vite build`, this writes a real HTML file for EVERY public route
 * (dist/destinations/ladakh/index.html, ...) containing the final <title>,
 * meta description, canonical, Open Graph, JSON-LD structured data and
 * crawlable text + internal links. Google can therefore index every page
 * from the first HTML response, without waiting for JavaScript rendering.
 *
 * Titles / descriptions / keywords / JSON-LD for the home page, /destinations,
 * destination pages and package pages come from src/lib/seoShared.js — the SAME
 * functions the React pages call at runtime, so both always match.
 */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { DOMAIN, loadDestinations, loadBlogs, staticPagesSEO } = require('./seo-data.cjs');

const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/* ---------- helpers ---------- */
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// Safe inside <script type="application/ld+json">
const jsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');

const stripExistingSeoTags = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, '')
    .replace(/<meta\s+(?:name|property)=["'](?:description|keywords|robots|og:[^"']*|twitter:[^"']*)["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '');

const main = async () => {
  const distDir = path.resolve(__dirname, '../dist');
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Build template not found at ${templatePath}. Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = stripExistingSeoTags(fs.readFileSync(templatePath, 'utf8'));
  const destinations = loadDestinations();
  const blogsSEO = await loadBlogs(destinations);
  const seo = await import(pathToFileURL(path.resolve(__dirname, '../src/lib/seoShared.js')).href);
  console.log(`✅ Loaded ${destinations.length} destinations for prerendering (season year ${seo.seasonYear()}).`);

  const problems = [];

  // Site-wide links on EVERY prerendered page → no orphan pages in the first HTML pass.
  const staticLinks = [
    ['/about', 'About us'], ['/services', 'Services'], ['/contact', 'Contact'], ['/testimonials', 'Testimonials'],
    ['/support', 'Support'], ['/careers', 'Careers'], ['/blog', 'Blog'],
    ['/terms-and-condition', 'Terms and Conditions'], ['/privacy-policy', 'Privacy Policy'], ['/cookie-policy', 'Cookie Policy'],
  ];
  const siteNav = `<nav aria-label="Site"><h2>Explore Stories by Foot</h2><ul>
    <li><a href="/">Home</a></li><li><a href="/destinations">All Destinations</a></li>
    ${destinations.map((d) => `<li><a href="/destinations/${d.slug}">${esc(d.name)} tour packages</a></li>`).join('')}
    ${staticLinks.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
  </ul></nav>`;
  const blogLinks = (except) =>
    `<h2>Travel Guides</h2><ul>${Object.entries(blogsSEO)
      .filter(([slug]) => slug !== except)
      .map(([slug, b]) => `<li><a href="/blog/${slug}">${esc(b.title.replace(/\s*\|\s*Stories by Foot( Blog)?$/, ''))}</a></li>`)
      .join('')}</ul>`;

  const writePage = (routePath, data) => {
    const canonical = data.url || `${DOMAIN}${routePath === '/' ? '' : routePath}`;
    const image = seo.ogImage(data.image);
    const ogType = data.type === 'article' ? 'article' : 'website';

    const head = `
    <title>${esc(data.title)}</title>
    <meta name="description" content="${esc(data.description)}" />
    ${data.keywords ? `<meta name="keywords" content="${esc(data.keywords)}" />` : ''}
    <meta name="robots" content="${ROBOTS}" />
    <link rel="canonical" href="${esc(canonical)}" />
    <meta property="og:title" content="${esc(data.title)}" />
    <meta property="og:description" content="${esc(data.description)}" />
    <meta property="og:url" content="${esc(canonical)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="${esc(seo.SITE_NAME)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:alt" content="${esc(data.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(data.title)}" />
    <meta name="twitter:description" content="${esc(data.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />
    ${data.schema ? `<script type="application/ld+json" id="jsonld-schema">${jsonLd(data.schema)}</script>` : ''}
    `;

    let html = baseHtml;
    // Insert AFTER <meta charset> so the charset stays inside the first 1024 bytes.
    if (/<meta\s+charset=[^>]*>/i.test(html)) html = html.replace(/(<meta\s+charset=[^>]*>)/i, `$1${head}`);
    else html = html.replace(/<head[^>]*>/i, (m) => `${m}${head}`);

    // Crawlable text for the first HTML response. React replaces it on hydration.
    const staticBody = `<div id="root"><div style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">${data.body}
${siteNav}
<hr /><footer><p>&copy; ${new Date().getFullYear()} ${esc(seo.SITE_NAME)}. Walk the Road. Live the Story. | www.storiesbyfoot.com</p></footer></div></div>`;
    html = html.replace(/<div id="root"><\/div>/i, staticBody);

    // Safety net: fail the build loudly if SEO is broken.
    const count = (re) => (html.match(re) || []).length;
    const checks = [
      ['<title>', count(/<title>/gi), 1],
      ['meta description', count(/<meta\s+name="description"/gi), 1],
      ['canonical', count(/<link\s+rel="canonical"/gi), 1],
      ['og:title', count(/<meta\s+property="og:title"/gi), 1],
      ['h1', count(/<h1[\s>]/gi), 1],
    ];
    for (const [label, got, want] of checks) {
      if (got !== want) problems.push(`${routePath}: expected ${want} × ${label}, found ${got}`);
    }
    if (data.title.length > 75) problems.push(`${routePath}: title too long (${data.title.length})`);
    if (data.description.length > 165) problems.push(`${routePath}: description too long (${data.description.length})`);

    const targetDir = routePath === '/' ? distDir : path.join(distDir, routePath);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`Prerendered: ${routePath === '/' ? '/' : routePath}`);
  };

  /* ---------- 1. Home ---------- */
  const home = seo.buildHomeSEO(destinations);
  const allPackages = destinations.flatMap((d) => d.packages.map((p) => ({ d, p })));
  writePage('/', {
    ...home,
    body: `
      <h1>Ultimate Adventure &amp; Motorbike Tours – Conquer The Himalayas</h1>
      <p>Ladakh, Spiti, Zanskar, Bhutan, Nepal, Sikkim &amp; Tawang. Expert guides and trusted safety standards.</p>
      <h2>Popular Destinations</h2>
      <ul>${destinations
        .map((d) => `<li><a href="/destinations/${d.slug}"><strong>${esc(d.name)}</strong></a> – ${esc(d.tagline)}. ${esc(d.summary)}</li>`)
        .join('')}</ul>
      <h2>Tour Packages</h2>
      <ul>${allPackages
        .map(({ d, p }) => `<li><a href="/destinations/${d.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(d.name)}, ${esc(p.duration)}, from ${esc(p.price)}</li>`)
        .join('')}</ul>
      ${blogLinks()}
      <h2>About Stories by Foot</h2>
      <p>Stories by Foot is committed to bringing our clients the best in value and quality travel arrangements. We are passionate about travel and sharing the world's wonders with you.</p>
      <h2>Contact</h2>
      <p>Phone: ${esc(seo.ORG.phone)} | Email: ${esc(seo.ORG.email)}</p>
      <p>${esc(seo.ORG.address.streetAddress)}, ${esc(seo.ORG.address.addressLocality)}, ${esc(seo.ORG.address.addressRegion)} ${esc(seo.ORG.address.postalCode)}</p>
      <nav><a href="/destinations">All destinations</a> · <a href="/blog">Blog</a> · <a href="/about">About</a> · <a href="/contact">Contact</a></nav>
    `,
  });

  /* ---------- 2. /destinations ---------- */
  const listing = seo.buildListingSEO(destinations);
  writePage('/destinations', {
    ...listing,
    body: `
      <h1>Himalayan Adventure Tour Packages</h1>
      <p>${esc(listing.description)}</p>
      ${destinations
        .map(
          (d) => `<h2><a href="/destinations/${d.slug}">${esc(d.name)} Tour Packages</a></h2>
          <p>${esc(d.summary)}</p>
          <ul>${d.packages
            .map((p) => `<li><a href="/destinations/${d.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(p.duration)} – from ${esc(p.price)}</li>`)
            .join('')}</ul>`
        )
        .join('')}
    `,
  });

  /* ---------- 3. Static pages ---------- */
  for (const [route, page] of Object.entries(staticPagesSEO)) {
    writePage(route, { ...page, url: `${DOMAIN}${route}`, body: route === '/blog' ? page.body + blogLinks() : page.body });
  }

  /* ---------- 4. Blog posts ---------- */
  for (const [slug, post] of Object.entries(blogsSEO)) {
    writePage(`/blog/${slug}`, {
      ...post,
      type: 'article',
      url: `${DOMAIN}/blog/${slug}`,
      image: post.img,
      body: post.body + blogLinks(slug),
      schema: seo.buildArticleSchema({ slug, title: post.title, description: post.description, image: post.img, date: post.date }),
    });
  }

  /* ---------- 5. Destination pages ---------- */
  for (const dest of destinations) {
    const data = seo.buildDestinationSEO(dest);
    const others = destinations.filter((d) => d.slug !== dest.slug);
    writePage(`/destinations/${dest.slug}`, {
      ...data,
      body: `
        <nav><a href="/">Home</a> › <a href="/destinations">Destinations</a> › ${esc(dest.name)}</nav>
        <h1>${esc(dest.name)} Tour Packages ${seo.seasonYear()}</h1>
        <p><em>${esc(dest.tagline)}</em></p>
        <p>${esc(dest.summary)}</p>
        <p><strong>Best time:</strong> ${esc(dest.quickFacts.bestTime)} | <strong>Start point:</strong> ${esc(dest.quickFacts.startPoint)} | <strong>Travel style:</strong> ${esc(dest.quickFacts.travelStyle)}</p>
        <h2>${esc(dest.name)} Packages</h2>
        ${dest.packages
          .map(
            (p) => `<h3><a href="/destinations/${dest.slug}/${p.slug}">${esc(p.name)}</a></h3>
            <p>${esc(p.duration)} · from ${esc(p.price)}</p>
            <p>${esc(p.description)}</p>
            <ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>`
          )
          .join('')}
        <h2>Explore more destinations</h2>
        <ul>${others.map((d) => `<li><a href="/destinations/${d.slug}">${esc(d.name)} tour packages</a></li>`).join('')}</ul>
      `,
    });
  }

  /* ---------- 6. Package pages ---------- */
  for (const dest of destinations) {
    for (const pkg of dest.packages) {
      const data = seo.buildPackageSEO(dest, pkg);
      const kind = seo.packageKind(pkg);
      const siblings = dest.packages.filter((p) => p.slug !== pkg.slug);

      const itinerary = (pkg.itinerary || [])
        .map(
          (day) => `<h3>Day ${day.day}: ${esc(day.title)}</h3>
          <p>${esc(day.description)}</p>
          ${day.highlights && day.highlights.length ? `<ul>${day.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>` : ''}`
        )
        .join('');

      writePage(`/destinations/${dest.slug}/${pkg.slug}`, {
        ...data,
        body: `
          <nav><a href="/">Home</a> › <a href="/destinations">Destinations</a> › <a href="/destinations/${dest.slug}">${esc(dest.name)}</a> › ${esc(pkg.name)}</nav>
          <h1>${esc(pkg.name)}</h1>
          <h2>${esc(dest.name)} ${esc(kind.label)} ${seo.seasonYear()}</h2>
          <p><strong>Duration:</strong> ${esc(pkg.duration)} | <strong>Price:</strong> ${esc(pkg.price)} per person</p>
          <p>${esc(pkg.description)}</p>
          <h2>Trip Highlights</h2>
          <ul>${pkg.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          ${itinerary ? `<h2>Day-by-Day Itinerary</h2>${itinerary}` : ''}
          ${pkg.inclusions && pkg.inclusions.length ? `<h2>Inclusions</h2><ul>${pkg.inclusions.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
          ${pkg.exclusions && pkg.exclusions.length ? `<h2>Exclusions</h2><ul>${pkg.exclusions.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
          ${siblings.length ? `<h2>More ${esc(dest.name)} packages</h2><ul>${siblings.map((p) => `<li><a href="/destinations/${dest.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(p.duration)} – from ${esc(p.price)}</li>`).join('')}</ul>` : ''}
        `,
      });
    }
  }

  if (problems.length) {
    console.error('\n❌ SEO verification failed:\n - ' + problems.join('\n - '));
    process.exit(1);
  }
  console.log('🎉 Static HTML prerendering completed and verified.');
};

main().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
