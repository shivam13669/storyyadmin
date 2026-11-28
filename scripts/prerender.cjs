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

  const writePage = (routePath, data) => {
    const canonical = data.url || `${DOMAIN}${routePath === '/' ? '' : routePath}`;
    const image = data.image || seo.DEFAULT_IMAGE;
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
      <h1>Stories by Foot – India's Premier Travel Company</h1>
      <p>Book guided domestic and international tour packages, group trips, bike trips, and road trips with verified stays and 24/7 support.</p>
      <h2>Popular Destinations</h2>
      <ul>${destinations
        .map((d) => `<li><a href="/destinations/${d.slug}"><strong>${esc(d.name)}</strong></a> – ${esc(d.tagline)}. ${esc(d.summary)}</li>`)
        .join('')}</ul>
      <h2>Tour Packages</h2>
      <ul>${allPackages
        .map(({ d, p }) => `<li><a href="/destinations/${d.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(d.name)}, ${esc(p.duration)}, from ${esc(p.price)}</li>`)
        .join('')}</ul>
      <h2>About Stories by Foot</h2>
      <p>Stories by Foot is India's premier travel company committed to bringing travelers the best in value, safety, and quality travel arrangements. Founded in 2020, our team plans guided domestic and international tour packages, group departures, bike trips, and road trips designed for solo explorers, friends, and families alike.</p>
      <h2>Why Choose Stories by Foot</h2>
      <ul>
        <li><strong>Personalized Trip Matching</strong> – Every route, vehicle, and stay is tailored to match your travel style, pace, and comfort.</li>
        <li><strong>Wide Variety of Tour Packages</strong> – Explore domestic and international itineraries, weekend getaways, backpacking trips, and multi-day road trips.</li>
        <li><strong>Trusted Safety Standards</strong> – Experienced road captains, dedicated backup vehicles, emergency medical oxygen support, and vetted local mechanics on mountain routes.</li>
        <li><strong>24/7 On-Trip Support</strong> – Round-the-clock coordination and dedicated ground assistance from booking to return.</li>
        <li><strong>Handpicked Verified Stays</strong> – Boutique mountain lodges, camps, and comfortable hotels selected for warmth, hygiene, and local hospitality.</li>
        <li><strong>Transparent Pricing</strong> – Clear package inclusions with zero hidden fees, flexible batch dates, and multi-currency support.</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <h3>How do I book a tour package with Stories by Foot?</h3>
      <p>Browse our upcoming trips or destination packages, select your preferred departure date and travel option, and complete your reservation online in minutes. You can also request a callback to speak directly with our travel specialists.</p>
      <h3>Are solo travelers welcome on group trips?</h3>
      <p>Yes, a large share of our travelers join solo. Our small-group community departures make it easy to meet fellow explorers while enjoying full logistical support and verified accommodations.</p>
      <h3>Can I customize a private or family itinerary?</h3>
      <p>Absolutely. If fixed group departure dates do not match your schedule, our travel planners will customize dates, stays, and transport for your private group or family holiday.</p>
      <h2>Contact</h2>
      <p>Phone: ${esc(seo.ORG.phone)} | Email: ${esc(seo.ORG.email)}</p>
      <p>${esc(seo.ORG.address.streetAddress)}, ${esc(seo.ORG.address.addressLocality)}, ${esc(seo.ORG.address.addressRegion)} ${esc(seo.ORG.address.postalCode)}</p>
      <nav><a href="/destinations">All destinations</a> · <a href="/services">Services</a> · <a href="/support">Support &amp; FAQ</a> · <a href="/blog">Blog</a> · <a href="/testimonials">Testimonials</a> · <a href="/about">About</a> · <a href="/careers">Careers</a> · <a href="/contact">Contact</a> · <a href="/privacy-policy">Privacy Policy</a> · <a href="/cookie-policy">Cookie Policy</a></nav>
      <p>Follow us: <a href="https://www.instagram.com/storiesbyfoot/" rel="noopener noreferrer">Instagram</a> · <a href="https://www.facebook.com/planyortrip/" rel="noopener noreferrer">Facebook</a> · <a href="https://www.linkedin.com/company/plan-yor-trip/" rel="noopener noreferrer">LinkedIn</a></p>
    `,
  });

  /* ---------- 2. /destinations ---------- */
  const listing = seo.buildListingSEO(destinations);
  writePage('/destinations', {
    ...listing,
    body: `
      <h1>Upcoming Community Trips &amp; Tour Packages</h1>
      <p>${esc(listing.description)}</p>
      <p>Filter upcoming group departures by region, price range, departure month, and trip duration to find the itinerary that fits your travel schedule. Each package includes verified accommodations, transparent pricing, and dedicated trip coordination.</p>
      <p>Whether you are planning a solo community trip, a motorbike circuit, or a scenic family holiday, compare routes and inclusions across all destinations below.</p>
      ${destinations
        .map(
          (d) => `<h2><a href="/destinations/${d.slug}">${esc(d.name)} Tour Packages</a></h2>
          <p>${esc(d.summary)}</p>
          <ul>${d.packages
            .map((p) => `<li><a href="/destinations/${d.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(p.duration)} – from ${esc(p.price)}</li>`)
            .join('')}</ul>`
        )
        .join('')}
      <nav><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/support">Support &amp; FAQ</a> · <a href="/blog">Blog</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy-policy">Privacy Policy</a> · <a href="/cookie-policy">Cookie Policy</a></nav>
    `,
  });

  const SITE_NAV = `<nav><a href="/">Home</a> · <a href="/destinations">Destinations</a> · <a href="/services">Services</a> · <a href="/support">Support &amp; FAQ</a> · <a href="/blog">Blog</a> · <a href="/testimonials">Testimonials</a> · <a href="/about">About</a> · <a href="/careers">Careers</a> · <a href="/contact">Contact</a> · <a href="/terms-and-condition">Terms</a> · <a href="/privacy-policy">Privacy Policy</a> · <a href="/cookie-policy">Cookie Policy</a></nav>`;
  const BLOG_LINKS = `<ul>${Object.entries(blogsSEO)
    .map(([slug, post]) => `<li><a href="/blog/${slug}">${esc(post.title.replace(/\s*\|\s*Stories by Foot$/, ''))}</a></li>`)
    .join('')}</ul>`;

  /* ---------- 3. Static pages ---------- */
  for (const [route, page] of Object.entries(staticPagesSEO)) {
    const extraBlogList = route === '/blog' ? `<h2>All Travel Guides</h2>${BLOG_LINKS}` : '';
    writePage(route, {
      ...page,
      body: `${SITE_NAV}\n${page.body}\n${extraBlogList}\n${SITE_NAV}`,
      url: `${DOMAIN}${route}`,
    });
  }

  /* ---------- 4. Blog posts ---------- */
  for (const [slug, post] of Object.entries(blogsSEO)) {
    writePage(`/blog/${slug}`, {
      ...post,
      body: `${SITE_NAV}\n${post.body}\n<h2>More Travel Guides</h2>${BLOG_LINKS}`,
      type: 'article',
      url: `${DOMAIN}/blog/${slug}`,
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
        <h2>Why Book ${esc(dest.name)} Trips with Stories by Foot</h2>
        <p>For the ${seo.seasonYear()} season, Stories by Foot operates guided ${esc(dest.name)} group trips and customized tour packages starting from ${esc(dest.quickFacts.startPoint)}. Every departure includes verified accommodations, transparent per-person pricing, experienced local trip leaders, and 24/7 on-ground support throughout your journey.</p>
        <p>Whether you are traveling solo, with friends, or planning a private group holiday, our ${esc(dest.name)} ${seo.seasonYear()} itineraries balance scenic highlights, comfortable stays, and flexible departure dates.</p>
        <h2>Explore more destinations</h2>
        <ul>${others.map((d) => `<li><a href="/destinations/${d.slug}">${esc(d.name)} tour packages</a></li>`).join('')}</ul>
        ${SITE_NAV}
      `,
    });
  }

  /* ---------- 6. Package pages ---------- */
  for (const dest of destinations) {
    for (const pkg of dest.packages) {
      const data = seo.buildPackageSEO(dest, pkg);
      const kind = seo.packageKind(pkg);
      const siblings = dest.packages.filter((p) => p.slug !== pkg.slug);
      const hasDestInName = new RegExp(dest.name, 'i').test(pkg.name);
      const h1Text = hasDestInName
        ? `${pkg.name} – ${pkg.duration} Tour Package`
        : `${pkg.name} – ${pkg.duration} ${dest.name} Trip`;

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
          <h1>${esc(h1Text)}</h1>
          <h2>${esc(dest.name)} ${esc(kind.label)} ${seo.seasonYear()}</h2>
          <p><strong>Duration:</strong> ${esc(pkg.duration)} | <strong>Price:</strong> ${esc(pkg.price)} per person</p>
          <p>${esc(pkg.description)}</p>
          <h2>Trip Highlights</h2>
          <ul>${pkg.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
          ${itinerary ? `<h2>Day-by-Day Itinerary</h2>${itinerary}` : ''}
          ${pkg.inclusions && pkg.inclusions.length ? `<h2>Inclusions</h2><ul>${pkg.inclusions.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
          ${pkg.exclusions && pkg.exclusions.length ? `<h2>Exclusions</h2><ul>${pkg.exclusions.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : ''}
          <h2>Booking &amp; Trip Overview</h2>
          <p>Reserve your spot on ${esc(pkg.name)}, a ${esc(pkg.duration)} ${esc(dest.name)} itinerary priced at ${esc(pkg.price)} per person and departing from ${esc(dest.quickFacts.startPoint)}. Ideal travel window is ${esc(dest.quickFacts.bestTime)} with ${esc(dest.quickFacts.travelStyle)} pacing.</p>
          <p>Key highlights on this ${esc(dest.name)} departure include ${esc(pkg.highlights.slice(0, 3).join(', '))}, backed by verified stays, transparent pricing, and dedicated ground coordination from Stories by Foot.</p>
          ${siblings.length ? `<h2>More ${esc(dest.name)} packages</h2><ul>${siblings.map((p) => `<li><a href="/destinations/${dest.slug}/${p.slug}">${esc(p.name)}</a> – ${esc(p.duration)} – from ${esc(p.price)}</li>`).join('')}</ul>` : ''}
          ${SITE_NAV}
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
