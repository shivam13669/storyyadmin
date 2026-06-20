const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.storiesbyfoot.com';

// 1. Static Pages Meta Configuration
const staticPagesSEO = {
  '/': {
    title: "Stories by Foot | Epic Ladakh Motorcycle Tour Packages & Himalayan Expeditions 2026",
    description: "Conquer the mighty Himalayas with Stories by Foot. Premium Leh Ladakh bike trip packages 2026, Hanle, Umling La, and Zanskar loops with backup support, mechanics, and oxygen. Book your ultimate adventure ride today.",
    keywords: "stories by foot, ladakh bike trip, leh ladakh bike trip package 2026, ladakh packages, manali to leh bike tour, srinagar to leh bike trip, umling la pass ride, zanskar loop, motorcycle tour price, motorbiking himalayas",
    body: `<h1>Stories by Foot</h1><p>Premium Himalayan Expeditions and Motorcycle Tours 2026.</p>`
  },
  '/destinations': {
    title: "Himalayan Adventure Tour Packages & Bike Expeditions 2026 | Stories by Foot",
    description: "Browse all Himalayan adventure tour packages by Stories by Foot. Premium motorcycle expeditions in Ladakh, Zanskar, Bhutan, Meghalaya, and Nepal. Choose your epic road trip today!",
    keywords: "himalayan tour packages, adventure tours, bike trip package, stories by foot destinations, motorbiking in india, ladakh packages, tawang bike trip, bhutan tour",
    body: `<h1>Our Destinations</h1><p>Conquer Ladakh, Zanskar, Spiti, Bhutan, Nepal, Meghalaya, and Tawang.</p>`
  },
  '/about': {
    title: "About Us | Our Story & Vision | Stories by Foot",
    description: "Learn the story of Stories by Foot. Founded in 2020, we curate premium motorcycle tour packages and adventure expeditions across Ladakh, Zanskar, Bhutan and Spiti.",
    keywords: "about stories by foot, stories by foot founder, ladakh tour company, adventure travel agency, motorcycle tour operator",
    body: `<h1>About Stories by Foot</h1><p>Every great adventure begins with a simple idea: to create meaningful stories that stay with you forever.</p>`
  },
  '/contact': {
    title: "Contact Us | Get in Touch | Stories by Foot",
    description: "Contact Stories by Foot for Ladakh bike trips, Himalayan tours, and booking inquiries. Reach us via phone, email, or our online form.",
    keywords: "contact stories by foot, stories by foot phone number, stories by foot email, ladakh bike trip booking",
    body: `<h1>Contact Us</h1><p>Let's plan your ultimate Himalayan ride. Email: contact@storiesbyfoot.com | Phone: +91 6205129118</p>`
  },
  '/services': {
    title: "Our Services | Support & Logistics | Stories by Foot",
    description: "Premium adventure logistics, backup vehicles, mechanics, medical oxygen support, and tour planning services by Stories by Foot.",
    keywords: "ladakh bike rental, ladakh logistics support, backup vehicle ladakh, oxygen support himalayas, bike trip services",
    body: `<h1>Our Services</h1><p>Providing premium logistics support, mechanic back-up, and oxygen cylinders on high altitude treks and rides.</p>`
  },
  '/support': {
    title: "Support & FAQ | Tour Preparation | Stories by Foot",
    description: "Find answers about packing lists, physical fitness, bike options, permits, and refund policies for Ladakh and Himalayan expeditions.",
    keywords: "ladakh faq, packing list ladakh, leh ladakh permits, altitude sickness ladakh, refund policy stories by foot",
    body: `<h1>Support & FAQ</h1><p>Learn how to prepare for your high altitude bike trip, what gear to carry, and permit requirements.</p>`
  },
  '/testimonials': {
    title: "Testimonials & Rider Stories | Stories by Foot",
    description: "Read reviews and experiences from riders who conquered Leh Ladakh, Zanskar, Spiti, and Bhutan with Stories by Foot.",
    keywords: "stories by foot reviews, ladakh bike trip reviews, leh tour reviews, customer testimonials",
    body: `<h1>Testimonials</h1><p>Hear from our community of riders who walked the road and lived the story.</p>`
  },
  '/careers': {
    title: "Careers | Join Our Adventure Team | Stories by Foot",
    description: "Join Stories by Foot. Work as an adventure lead, mechanic, logistics manager, or content creator in the Himalayas.",
    keywords: "careers stories by foot, travel jobs india, tour guide jobs, travel content creator jobs",
    body: `<h1>Careers at Stories by Foot</h1><p>Join the team that operates on the highest motorable roads in the world.</p>`
  },
  '/blog': {
    title: "Himalayan Travel Blog & Riding Guides | Stories by Foot",
    description: "Read expert travel guides, riding tips, route maps, and preparation guides for Leh Ladakh, Zanskar, and Spiti bike trips.",
    keywords: "himalayan travel blog, ladakh riding tips, leh travel guides, bike trip blog",
    body: `<h1>Himalayan Travel Blog</h1><p>Expert tips, packing guides, and route maps for your Leh Ladakh motorcycle expeditions.</p>`
  },
  '/terms-and-condition': {
    title: "Terms and Conditions | Stories by Foot",
    description: "Read the terms and conditions for booking adventure tours, motorcycle expeditions, and other travel arrangements with Stories by Foot.",
    keywords: "terms and conditions, booking terms, trip rules, liability waiver, travel terms",
    body: `<h1>Terms & Conditions</h1><p>Read terms for cancellations, payments, and tour safety rules.</p>`
  },
  '/privacy-policy': {
    title: "Privacy Policy | Stories by Foot",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information on Stories by Foot.",
    keywords: "privacy policy, personal data, cookie policy, data protection, travel security",
    body: `<h1>Privacy Policy</h1><p>Learn how we handle your personal information securely.</p>`
  },
  '/cookie-policy': {
    title: "Cookie Policy | Stories by Foot",
    description: "Read our cookie policy to understand how we use cookies and tracking technologies to improve your experience on Stories by Foot.",
    keywords: "cookie policy, cookies, user tracking, site settings, browsing preference",
    body: `<h1>Cookie Policy</h1><p>Understanding tracking and cookies on Stories by Foot.</p>`
  }
};

// 2. Static Blogs Content & Meta Data
const blogsSEO = {
  'leh-ladakh-bike-trip-guide': {
    title: "The Ultimate Guide to Your Leh Ladakh Bike Trip 2026: Routes, Costs, and the New Frontier | Stories by Foot",
    description: "Planning a Leh Ladakh bike trip package 2026? Read the definitive guide on routes (Manali & Srinagar highways), costs, packing list, and road conditions by Stories by Foot.",
    keywords: "leh ladakh bike trip guide, ladakh bike tour 2026, leh ladakh bike trip cost, manali to leh road status, srinagar to leh route map",
    body: `
      <h1>The Ultimate Guide to Your Leh Ladakh Bike Trip 2026: Routes, Costs, and the New Frontier</h1>
      <p>Planning a Leh Ladakh bike trip package 2026 is an exhilarating feeling, but the difference between a legendary adventure and a difficult ordeal lies in your preparation. Ride across Khardung La or climb the 19,024ft to Umling La Pass with Stories by Foot.</p>
      <h3>Srinagar vs Manali Route</h3>
      <p>Srinagar to Leh offers better acclimatization, while Manali to Leh provides raw high-altitude passes. Choose Srinagar-Leh-Manali for the ultimate circuit.</p>
    `
  },
  'things-to-carry-in-ladakh-bike-trip': {
    title: "The Ultimate Ladakh Bike Trip Packing List 2026: Gear Up Like a Pro | Stories by Foot",
    description: "Prepare for your Ladakh motorcycle expedition with the ultimate packing list. Essential riding gear, layers, tools, spares, medicines, and documents check-list.",
    keywords: "ladakh bike trip packing list, motorcycle tour essentials, riding gear for leh, high altitude medicines diamox, spares for royal enfield",
    body: `
      <h1>The Ultimate Ladakh Bike Trip Packing List 2026: Gear Up Like a Pro</h1>
      <p>When riding through Zanskar or climbing to Umling La, packing right is critical. Here is the rider checklist:</p>
      <ul>
        <li>CE Level 2 riding armor and waterproof boots</li>
        <li>Three-layer clothing system for sub-zero temperatures</li>
        <li>Riding gloves (one thermal, one breathable)</li>
        <li>Spares: clutch cables, accelerator cable, chain lube</li>
        <li>Medical kit with ORS, Diamox, and sunscreen</li>
      </ul>
    `
  },
  'petrol-pump-guide-of-ladakh': {
    title: "Fuel Guide Ladakh: Where to Find Petrol Stations in Ladakh for Your Bike Trip | Stories by Foot",
    description: "Learn where petrol pumps are located in Leh, Nubra, Karu, and Tangtse. Understand the 440km fuel dead zone from Pangong to Hanle and Umling La pass.",
    keywords: "petrol pumps in ladakh, fuel availability leh, petrol in hanle, nyoma petrol station, emergency fuel ladakh, fuel dead zones",
    body: `
      <h1>Fuel Guide Ladakh: Where to Find Petrol Stations in Ladakh for Your Bike Trip</h1>
      <p>Fuel planning is a survival skill in the trans-Himalayas. Know the locations of petrol stations:</p>
      <ul>
        <li>Leh: Multiple petrol pumps (primary fill up point)</li>
        <li>Karu: Indian Oil pump (last main stop before Manali highway or Pangong)</li>
        <li>Diskit: Only official pump in Nubra Valley</li>
        <li>Tangtse: Pump located 40km before Pangong Lake</li>
        <li><strong>Hanle to Umling La:</strong> 440km fuel dead zone. Carry 5-10L jerry cans.</li>
      </ul>
    `
  },
  'zanskar-the-hidden-gem': {
    title: "Zanskar Unveiled: The Ultimate Guide to the Kingdom of High Passes | Stories by Foot",
    description: "Explore the remote Zanskar Valley. Learn how to reach Padum over Shinku La Pass or the new Nimmu-Padum highway. Visit Phugtal Gompa, Gonbo Rangjon, and Drang-Drung Glacier.",
    keywords: "zanskar valley guide, padum travel packages, shinku la pass route, phugtal monastery trek, gonbo rangjon monolith, drang drung glacier",
    body: `
      <h1>Zanskar Unveiled: The Ultimate Guide to the Kingdom of High Passes</h1>
      <p>Explore Zanskar, the most remote sub-region of Ladakh, home to Phugtal Monastery, the mighty Pensi La pass, Drang-Drung glacier, and the monolith Gonbo Rangjon.</p>
      <h3>Routes into Zanskar:</h3>
      <p>1. Kargil to Padum via Pensi La. 2. Manali to Darcha over Shinku La. 3. Leh to Padum via Nimmu-Padum road along the Zanskar River.</p>
    `
  },
  'ladakh-the-land-of-high-passes': {
    title: "Ladakh: The Land of High Passes – The Ultimate 2026 Biking Guide | Stories by Foot",
    description: "The complete guide to motorbiking in Ladakh. Learn about Khardung La, Tanglang La, and the world's highest Umling La Pass. Plan your route, permits, and acclimatization.",
    keywords: "land of high passes, ladakh travel guide, umling la pass height, baralacha la road status, inner line permits leh, acclimitization rule",
    body: `
      <h1>Ladakh: The Land of High Passes – The Ultimate 2026 Biking Guide</h1>
      <p>Conquer the highest passes of the trans-Himalayas. Ride across Khardung La, Tanglang La, Chang La, and Umling La (19,024 ft) with Stories by Foot.</p>
      <h3>Safety Protocol:</h3>
      <p>A 48-hour mandatory acclimatization is required in Leh before traveling to higher regions.</p>
    `
  },
  'aryan-s-village-of-india-in-ladakh': {
    title: "The Lost Tribe of Alexander: A Journey into the Aryan Valley with Stories by Foot | Stories by Foot",
    description: "Discover the Brokpa community in the Aryan Valley (Dah, Hanu, Beama). Explore the Flower Women, Balti orchards, and the legend of Alexander the Great's lost soldiers.",
    keywords: "aryan valley ladakh, brokpa tribe brokpa people, alexander the great descendants, flower women brokpa, dah hanu villages, batalik sector",
    body: `
      <h1>The Lost Tribe of Alexander: A Journey into the Aryan Valley with Stories by Foot</h1>
      <p>Visit the Brokpa tribe in the warm Aryan valley of Dah and Hanu. Known as the Flower People, they claim descent from Alexander the Great's army.</p>
    `
  },
  'pregnancy-tourism-in-ladakh': {
    title: "The Myth of \"Pregnancy Tourism\" in Ladakh: Setting the Record Straight | Stories by Foot",
    description: "Addressing the internet rumors about pregnancy tourism in the Brokpa villages of Ladakh. Separating anthropology facts from sensationalist tabloid myths.",
    keywords: "pregnancy tourism ladakh, brokpa bloodline myths, alexander lost soldiers myth, aryan valley rumors, cultural respect brokpa",
    body: `
      <h1>The Myth of "Pregnancy Tourism" in Ladakh: Setting the Record Straight</h1>
      <p>Addressing the sensationalist rumors regarding pregnancy tourism in the Aryan Valley. Fact check: modern genetics show complex mixed Dardic lineage, not isolated Greek bloodlines.</p>
    `
  }
};

// 3. Main Prerender Execution Flow
const main = () => {
  const distDir = path.resolve(__dirname, '../dist');
  const templatePath = path.resolve(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Build template not found at ${templatePath}. Run 'vite build' first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templatePath, 'utf8');

  // Load Destinations and Packages Data
  let destinations = [];
  const tsPath = path.resolve(__dirname, '../src/data/destinations.ts');
  const tempPath = path.resolve(__dirname, './temp-destinations.cjs');

  try {
    const content = fs.readFileSync(tsPath, 'utf8');
    const lines = content.split('\n');
    const dataStartIndex = lines.findIndex(line => line.includes('export const destinations'));
    if (dataStartIndex === -1) throw new Error("Could not find destinations array");

    let cleanContent = lines.slice(dataStartIndex).join('\n')
      .replace('export const destinations: Destination[] =', 'const destinations =');

    const iconMapIndex = cleanContent.indexOf('export const destinationIconMap');
    if (iconMapIndex !== -1) {
      cleanContent = cleanContent.slice(0, iconMapIndex);
    }

    cleanContent += '\nmodule.exports = { destinations };\n';
    fs.writeFileSync(tempPath, cleanContent, 'utf8');

    const loaded = require(tempPath);
    destinations = loaded.destinations;
  } catch (e) {
    console.error("❌ Failed to parse destinations data dynamically:", e);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }

  console.log(`✅ Loaded ${destinations.length} destinations dynamically for prerendering.`);

  // Define Helper to write static html files
  const writePrerenderedPage = (routePath, seoData) => {
    let html = baseHtml;
    const fullCanonical = `${DOMAIN}${routePath === '/' ? '' : routePath}`;

    // A. Inject Title
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${seoData.title}</title>`);

    // B. Inject Meta Tags (Head)
    let metaTags = `
    <meta name="description" content="${seoData.description}" />
    <meta name="keywords" content="${seoData.keywords}" />
    <link rel="canonical" href="${fullCanonical}" />
    <meta property="og:title" content="${seoData.title}" />
    <meta property="og:description" content="${seoData.description}" />
    <meta property="og:url" content="${fullCanonical}" />
    <meta property="og:type" content="${seoData.type || 'website'}" />
    <meta property="og:site_name" content="Stories by Foot" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seoData.title}" />
    <meta name="twitter:description" content="${seoData.description}" />
    `;

    if (seoData.image) {
      metaTags += `\n    <meta property="og:image" content="${seoData.image}" />`;
      metaTags += `\n    <meta name="twitter:image" content="${seoData.image}" />`;
    }

    if (seoData.schema) {
      metaTags += `\n    <script type="application/ld+json">${JSON.stringify(seoData.schema)}</script>`;
    }

    // Inject tags right after <head> or before title
    html = html.replace(/<head>/i, `<head>${metaTags}`);

    // C. Inject static crawlable content inside <div id="root">
    const staticBody = `
      <div id="root">
        <div style="max-width: 800px; margin: 40px auto; padding: 20px; font-family: sans-serif; line-height: 1.6; color: #333;">
          ${seoData.body}
          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;" />
          <footer style="font-size: 13px; color: #777;">
            <p>&copy; ${new Date().getFullYear()} Stories by Foot. Walk the Road. Live the Story. | www.storiesbyfoot.com</p>
          </footer>
        </div>
      </div>
    `;

    html = html.replace(/<div id="root"><\/div>/i, staticBody);

    // D. Save file
    let targetDir = distDir;
    let targetFile = 'index.html';

    if (routePath !== '/') {
      targetDir = path.join(distDir, routePath);
      targetFile = 'index.html';
    }

    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, targetFile), html, 'utf8');
    console.log(`Prerendered: ${routePath === '/' ? '/' : routePath + '/index.html'}`);
  };

  // --- Prerender Execution Checklist ---

  // 1. Static Pages
  for (const [route, seo] of Object.entries(staticPagesSEO)) {
    writePrerenderedPage(route, seo);
  }

  // 2. Blog Posts
  for (const [slug, seo] of Object.entries(blogsSEO)) {
    const route = `/blog/${slug}`;
    writePrerenderedPage(route, {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      body: seo.body,
      type: 'article'
    });
  }

  // 3. Destinations Category Pages
  for (const dest of destinations) {
    const route = `/destinations/${dest.slug}`;
    const name = dest.name;
    const tagline = dest.tagline;
    const summary = dest.summary;

    let desc = `Explore premium ${name} tour packages with Stories by Foot. ${tagline}. Our guided expeditions offer full backup support, mechanic, and safety gear.`;
    if (dest.slug === "ladakh") {
      desc = `Conquer Ladakh with our expert-guided Leh Ladakh bike trip packages 2026. Ride Khardung La, Pangong Tso, and Umling La with full backup vehicle, mechanic, and oxygen support.`;
    } else if (dest.slug === "zanskar") {
      desc = `Adventure deep into Zanskar Valley with Stories by Foot. Ride Shinku La Pass, explore remote monasteries, and cross Drang-Drung Glacier on our premium motorcycle tours.`;
    }

    const keywords = `${name.toLowerCase()} packages, ${name.toLowerCase()} bike trip, stories by foot ${name.toLowerCase()}, ${name.toLowerCase()} tour, best time to visit ${name.toLowerCase()}`;

    let packagesHTML = `<h2>Available Bike Tours & Expeditions in ${name}</h2><ul>`;
    for (const pkg of dest.packages) {
      packagesHTML += `<li><strong><a href="/destinations/${dest.slug}/${pkg.slug}">${pkg.name}</a></strong> - ${pkg.duration} (${pkg.price})<br/>${pkg.description}</li>`;
    }
    packagesHTML += `</ul>`;

    const body = `
      <h1>${name} Tour Packages & Biking Expeditions 2026</h1>
      <p style="font-size: 18px; font-style: italic;">${tagline}</p>
      <p>${summary}</p>
      ${packagesHTML}
    `;

    writePrerenderedPage(route, {
      title: `${name} Tour Packages & Biking Expeditions 2026 | Stories by Foot`,
      description: desc,
      keywords: keywords,
      image: dest.heroImage,
      body: body
    });
  }

  // 4. Package Detail Pages (Product Details)
  for (const dest of destinations) {
    for (const pkg of dest.packages) {
      const route = `/destinations/${dest.slug}/${pkg.slug}`;
      const cleanPrice = pkg.price.replace(/[₹,]/g, "");

      const title = `${pkg.name} | ${dest.name} Tour Package 2026 | Stories by Foot`;
      const description = `${pkg.description.slice(0, 155)}... Book this ${pkg.duration} tour to ${dest.name} starting at ${pkg.price}. Full backup support, mechanic & road captains included.`;

      // Build target keywords similar to client
      const phrases = [
        pkg.name.toLowerCase(),
        `${pkg.name.toLowerCase()} trip`,
        `${pkg.name.toLowerCase()} tour`,
        `${dest.name.toLowerCase()} tour package`,
        `${dest.name.toLowerCase()} bike trip`,
        `stories by foot ${dest.name.toLowerCase()}`,
        `${dest.name.toLowerCase()} motorcycle expedition`
      ];
      pkg.highlights.forEach(h => {
        h.split(/[|:-]/).forEach(p => {
          const clean = p.replace(/[()]/g, "").trim().toLowerCase();
          if (clean && clean.length > 3 && clean.length < 40) {
            phrases.push(clean);
            phrases.push(`${clean} trip`);
          }
        });
      });
      const keywords = Array.from(new Set(phrases)).slice(0, 20).join(', ');

      // Build Schema JSON-LD
      const itinerarySchema = pkg.itinerary?.map((day, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": `Day ${day.day}: ${day.title}`,
          "description": day.description
        }
      })) || [];

      const schema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            "@id": `${DOMAIN}${route}#product`,
            "name": pkg.name,
            "image": pkg.image || dest.heroImage,
            "description": pkg.description,
            "offers": {
              "@type": "Offer",
              "price": cleanPrice,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "url": `${DOMAIN}${route}`
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": pkg.rating || 4.8,
              "reviewCount": pkg.reviews || 100
            }
          },
          {
            "@type": "TouristTrip",
            "@id": `${DOMAIN}${route}#trip`,
            "name": pkg.name,
            "description": pkg.description,
            "touristType": "Adventure Enthusiasts, Motorcycle Riders",
            "itinerary": {
              "@type": "ItemList",
              "numberOfItems": itinerarySchema.length,
              "itemListElement": itinerarySchema
            }
          }
        ]
      };

      // Construct crawlable body
      let itineraryHTML = `<h3>Detailed Itinerary</h3>`;
      if (pkg.itinerary) {
        pkg.itinerary.forEach(day => {
          itineraryHTML += `
            <div style="margin-bottom: 20px;">
              <h4>Day ${day.day}: ${day.title}</h4>
              <p>${day.description}</p>
              ${day.highlights ? `<strong>Highlights:</strong> <ul>${day.highlights.map(h => `<li>${h}</li>`).join('')}</ul>` : ''}
            </div>
          `;
        });
      }

      const body = `
        <h1>${pkg.name}</h1>
        <h2>${dest.name} Motorcycle Tour Package (2026 Departure)</h2>
        <p><strong>Duration:</strong> ${pkg.duration} | <strong>Price:</strong> ${pkg.price}</p>
        <p>${pkg.description}</p>
        
        <h3>Key Highlights</h3>
        <ul>
          ${pkg.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        
        ${itineraryHTML}
        
        <h3>Inclusions</h3>
        <ul>
          ${pkg.inclusions ? pkg.inclusions.map(inc => `<li>${inc}</li>`).join('') : '<li>Logistics support, mechanic, oxygen, standard accommodations.</li>'}
        </ul>
        
        <h3>Exclusions</h3>
        <ul>
          ${pkg.exclusions ? pkg.exclusions.map(exc => `<li>${exc}</li>`).join('') : '<li>Personal meals, personal expenses, GST.</li>'}
        </ul>
      `;

      writePrerenderedPage(route, {
        title: title,
        description: description,
        keywords: keywords,
        image: pkg.image || dest.heroImage,
        schema: schema,
        body: body,
        type: 'product'
      });
    }
  }

  console.log("🎉 Static HTML Prerendering successfully completed!");
};

main();
