/**
 * New blog posts (long-tail SEO guides). Used by:
 *   - src/pages/BlogPost.tsx  (renders the post)
 *   - src/pages/Blog.tsx      (listing cards)
 *   - scripts/prerender.cjs + scripts/generate-sitemap.cjs (static HTML + sitemap)
 *
 * To add another post: append an object to `newBlogPosts` below. Slug, SEO, sitemap
 * and prerender are then automatic.  `ctx` = { destinations, year }.
 *
 * Facts about permits / road status change — keep the "check the official source"
 * wording and refresh these posts every season.
 */

import { fitTitle } from "./seoShared.js";

const SITE = "https://www.storiesbyfoot.com";
const IMG = {
  guide: "https://cdn.builder.io/api/v1/image/assets%2F055822843df249458d0500b75a6c350c%2Fc23140af56a445ddb6d97bd0aed919ef?format=webp&width=2000",
  passes: "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F453733ddde0440a4bef0de72c9b892bd?format=webp",
  zanskar: "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F6533e44a24cd46deb3001e3e3a596a36?format=webp",
  fuel: "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2Ff5582cc810f24c66bfb71cf2665a7f78?format=webp",
  packing: "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F7a35f75c7da94e7fb0ec886bd54114f8?format=webp",
  monastery: `${SITE}/cliffhanger/images/3.jpg`,
};

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
const num = (price) => parseInt(String(price || "").replace(/[^\d]/g, ""), 10) || 0;
const ladakh = (ctx) => ctx.destinations.find((d) => d.slug === "ladakh");
const link = (dest, pkg) => `<a href="/destinations/${dest.slug}/${pkg.slug}">${pkg.name}</a>`;

export const newBlogPosts = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: "ladakh-bike-trip-cost",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.guide,
    tags: ["Ladakh", "Budget", "Bike Trip"],
    authors: [0, 1],
    cardTitle: "Ladakh Bike Trip Cost",
    excerpt: "What a Ladakh bike trip really costs, what is included in the price, and how to compare quotes without getting surprised.",
    title: (c) => `Ladakh Bike Trip Cost ${c.year}: What You Really Pay and What's Included`,
    seo: (c) => ({
      title: `Ladakh Bike Trip Cost ${c.year}: Price Breakdown | Stories by Foot`,
      description: `Ladakh bike trip cost ${c.year}: package prices from ${inr(Math.min(...ladakh(c).packages.map((p) => num(p.price))))}, what is included, what is extra, and how to compare quotes.`,
      keywords: "ladakh bike trip cost, ladakh bike trip price, leh ladakh bike trip package price, ladakh bike trip budget, ladakh motorcycle tour cost",
    }),
    content: (c) => {
      const d = ladakh(c);
      const rows = d.packages
        .map((p) => {
          const ex = (p.exclusions || []).join(" | ").toLowerCase();
          const bike = /motorbike/.test(ex) ? "Not in base price" : "Included";
          const fuel = /fuel/.test(ex) ? "Not in base price" : "Included";
          const gst = /gst/.test(ex) ? "+ 5% GST" : "—";
          return `<tr><td>${link(d, p)}</td><td>${p.duration}</td><td><strong>${p.price}</strong></td><td>${bike}</td><td>${fuel}</td><td>${gst}</td></tr>`;
        })
        .join("");
      return `
      <p>The honest answer to "how much does a Ladakh bike trip cost?" is: it depends on <strong>how many days</strong>, <strong>where the trip starts</strong> and, most importantly, <strong>what the price actually includes</strong>. Two packages with a similar price can be very different once you add the bike, fuel and backup support.</p>

      <h3>Stories by Foot Ladakh bike trip prices (per person)</h3>
      <p>These are the current prices of our Ladakh bike trip packages. The table is generated from our live package data, so it always matches the package pages.</p>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse" cellpadding="8" border="1">
        <thead><tr><th>Package</th><th>Duration</th><th>Price</th><th>Motorbike</th><th>Fuel</th><th>Tax</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>

      <h3>What the Leh-start packages include</h3>
      <p>Our Leh-based loops (Khardungla Changla Loop, India's Last Turn, MigLa Throne Ride and Ultimate UmlingLa) bundle most of the things riders otherwise pay for separately:</p>
      <ul>
        <li>Motorbike with helmet (Royal Enfield Himalayan or Classic 350) and <strong>fuel for the whole trip</strong></li>
        <li>Twin-sharing accommodation and meals as listed in each itinerary</li>
        <li>Marshal cum mechanic, <strong>backup vehicle</strong> (from the Nubra day), oxygen cylinder and first-aid kit</li>
        <li>Permits and Leh airport pickup and drop</li>
      </ul>

      <h3>Why the Trans Himalayan Ride looks cheaper</h3>
      <p>The ${link(d, d.packages.find((p) => p.slug === "trans-himalayan-ride") || d.packages[0])} is a 13-day Chandigarh-to-Chandigarh expedition. Its base price does <strong>not</strong> include the motorbike or fuel, so you either bring your own bike or add a rental. Always compare "bike + fuel included" prices with "bike not included" prices on equal terms.</p>

      <h3>What is usually NOT included</h3>
      <ul>
        <li>Food and drinks outside the meals listed in the itinerary</li>
        <li>GST where shown in the package exclusions</li>
        <li>Travel to the start point (a flight to Leh, or travel to Chandigarh for the Trans Himalayan Ride)</li>
        <li>Personal riding gear, travel insurance and personal expenses</li>
        <li>Extra costs caused by natural calamities such as landslides or road closures</li>
      </ul>

      <h3>7 questions to ask before you pay any operator</h3>
      <ol>
        <li>Is the motorbike included, and which models?</li>
        <li>Is fuel included for the whole trip?</li>
        <li>Is there a backup vehicle for the entire route, and a mechanic riding with the group?</li>
        <li>Is an oxygen cylinder and first-aid kit carried?</li>
        <li>Are permits included?</li>
        <li>How many meals are included, and is accommodation twin-sharing or dormitory?</li>
        <li>Is GST included in the quoted price?</li>
      </ol>

      <h3>How to choose</h3>
      <p>If this is your first Ladakh ride, the shortest circuit is the easiest budget and the best way to test your comfort at altitude. If you want Hanle, Mig La and Umling La, look at the 8-day circuits. Read our <a href="/blog/ladakh-bike-trip-for-beginners">beginner's guide</a> and the <a href="/blog/best-time-for-ladakh-bike-trip">best time to ride Ladakh</a> before you decide.</p>
      <p><strong>Want an exact quote for your dates?</strong> See all <a href="/destinations/ladakh">Ladakh bike trip packages</a> or <a href="/contact">contact our team</a>.</p>`;
    },
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: "manali-to-leh-vs-srinagar-to-leh-bike-trip",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.passes,
    tags: ["Ladakh", "Routes", "Bike Trip"],
    authors: [1],
    cardTitle: "Manali to Leh vs Srinagar to Leh",
    excerpt: "Two classic highways to Ladakh, compared on altitude gain, road character, season and who each suits best.",
    title: () => "Manali to Leh vs Srinagar to Leh: Which Bike Route Is Better?",
    seo: () => ({
      title: "Manali to Leh vs Srinagar to Leh: Which Bike Route? | Stories by Foot",
      description: "Manali–Leh or Srinagar–Leh by bike? Compare distance, altitude gain, passes, season and difficulty to choose the right route for your Ladakh trip.",
      keywords: "manali to leh bike trip, srinagar to leh bike trip, manali leh vs srinagar leh, which route is better for ladakh bike trip, leh ladakh bike route",
    }),
    content: (c) => {
      const d = ladakh(c);
      const t = d.packages.find((p) => p.slug === "trans-himalayan-ride");
      return `
      <p>Every Ladakh rider asks the same question: <strong>Manali to Leh or Srinagar to Leh?</strong> Both are legendary highways, and both are rewarding, but they feel very different on a motorcycle. Distances and pass heights below are approximate; road status changes every season.</p>

      <h3>Manali to Leh at a glance</h3>
      <ul>
        <li><strong>Distance:</strong> roughly 480 km, normally split over two days with a night at a high-altitude camp or Sarchu/Keylong side</li>
        <li><strong>Character:</strong> a fast climb from green Himachal valleys into a high-altitude desert, crossing several passes above 4,500 m including Baralacha La, Lachung La and Tanglang La</li>
        <li><strong>Challenge:</strong> you gain a lot of height quickly with little time to acclimatise, which is why many first-timers find it harder</li>
        <li><strong>Season:</strong> typically opens later in the summer and closes earlier than the Kashmir side, depending on snow clearance</li>
      </ul>

      <h3>Srinagar to Leh at a glance</h3>
      <ul>
        <li><strong>Distance:</strong> roughly 420 km, usually two days with a night in Kargil</li>
        <li><strong>Character:</strong> starts in the Kashmir valley, crosses Zoji La, then drops into Drass and Kargil before the moonland landscapes near Lamayuru</li>
        <li><strong>Challenge:</strong> Zoji La can be rough and slow with traffic, but the altitude gain is more gradual</li>
        <li><strong>Season:</strong> usually opens earlier in the year than Manali–Leh</li>
      </ul>

      <h3>Which one should you choose?</h3>
      <ul>
        <li><strong>First Ladakh ride or worried about altitude sickness:</strong> Srinagar to Leh, because the climb is gentler.</li>
        <li><strong>Experienced rider who wants a dramatic high-pass road:</strong> Manali to Leh.</li>
        <li><strong>Short on time:</strong> fly into Leh, acclimatise for two days and ride a loop from there; our <a href="/destinations/ladakh/khardungla-changla-loop">Khardungla Changla Loop</a> is built for this.</li>
        <li><strong>Want both:</strong> ride one up and the other down.</li>
      </ul>

      <h3>The best of both: Trans Himalayan Ride</h3>
      <p>Our ${link(d, t)} is a 13-day circuit that includes the Srinagar–Leh and Leh–Manali highways, plus Nubra, Turtuk and Pangong, with a backup vehicle throughout and a mechanic cum sweep rider from Srinagar to Manali.</p>

      <h3>Tips for either route</h3>
      <ul>
        <li>Start early; afternoon river crossings and wind get stronger.</li>
        <li>Fuel up whenever you can and carry a small reserve.</li>
        <li>Spend at least two nights in Leh before going over Khardung La or Chang La.</li>
        <li>Check the latest road status the day before you ride.</li>
      </ul>
      <p>Still deciding? Read the <a href="/blog/ladakh-bike-trip-cost">cost breakdown</a> or browse our <a href="/destinations/ladakh">Ladakh bike trip packages</a>.</p>`;
    },
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: "best-time-for-ladakh-bike-trip",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.zanskar,
    tags: ["Ladakh", "Planning", "Season"],
    authors: [0],
    cardTitle: "Best Time for a Ladakh Bike Trip",
    excerpt: "A month-by-month look at weather, roads and crowds, so you can pick the right window for your ride.",
    title: (c) => `Best Time for a Ladakh Bike Trip (${c.year}): Month-by-Month Guide`,
    seo: (c) => ({
      title: `Best Time for Ladakh Bike Trip ${c.year}: Month by Month | Stories by Foot`,
      description: "When should you ride Ladakh? Month-by-month weather, road status and crowds from May to October, plus the winter Chadar trek window.",
      keywords: "best time for ladakh bike trip, best time to visit ladakh, ladakh in june, ladakh in september, ladakh bike trip season, when to go to ladakh",
    }),
    content: () => `
      <p>For most riders the <strong>best time for a Ladakh bike trip is June to September</strong>. Exact opening dates of the high passes change every year with snow clearance, so treat the months below as a guide and always check current road status before you travel.</p>

      <h3>April–May: early season</h3>
      <p>Cold nights and snow on the high passes. The Kashmir side usually opens earlier, while some routes can still be closed. Good for riders who want fewer crowds and are comfortable with cold.</p>

      <h3>June: the season opens</h3>
      <p>Roads are being cleared, weather is generally clear and daytime temperatures in Leh are pleasant. Snow walls along the passes make for dramatic photos. Passes can still see snow or slush early in the month.</p>

      <h3>July–August: peak season</h3>
      <p>Warmest weather in Ladakh and the busiest months. Ladakh itself gets little rain, but approaches from the Himachal side can face rain, landslides and water crossings, so keep a buffer day in your plan.</p>

      <h3>September: a favourite among riders</h3>
      <p>Clear skies, fewer tourists and golden light. Nights get noticeably colder, especially at Pangong, Hanle and Tso Moriri, so pack proper layers.</p>

      <h3>October: end of the season</h3>
      <p>Early winter arrives: freezing nights and a real chance of snow on the passes. Only for experienced, well-equipped riders, and plans may change at short notice.</p>

      <h3>November–March: winter</h3>
      <p>Most high-altitude bike routes are closed. Winter is instead the time for the frozen-river adventure: see our <a href="/destinations/zanskar/chadar-frozen-river-trek">Chadar Frozen River Trek</a>.</p>

      <h3>Which month for which trip?</h3>
      <ul>
        <li><strong>First ride in Ladakh:</strong> late June to mid September</li>
        <li><strong>Hanle, Mig La and Umling La:</strong> July to September, when remote roads are most reliable</li>
        <li><strong>Photography and fewer crowds:</strong> September</li>
      </ul>
      <p>Compare routes in our <a href="/blog/manali-to-leh-vs-srinagar-to-leh-bike-trip">Manali vs Srinagar guide</a>, then see departures on the <a href="/destinations/ladakh">Ladakh packages page</a>.</p>`,
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: "ladakh-inner-line-permit-guide",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.fuel,
    tags: ["Ladakh", "Permits", "Planning"],
    authors: [2],
    cardTitle: "Ladakh Inner Line Permit Guide",
    excerpt: "Do you still need an Inner Line Permit for Ladakh? What changed for Indian tourists and what foreign visitors need.",
    title: (c) => `Ladakh Inner Line Permit: Do You Still Need One in ${c.year}?`,
    seo: (c) => ({
      title: `Ladakh Inner Line Permit ${c.year}: Do You Still Need One? | Stories by Foot`,
      description: "Ladakh permit rules explained: what changed for Indian tourists, what foreign nationals need, and how to avoid outdated advice before your trip.",
      keywords: "ladakh inner line permit, ladakh permit for indians, protected area permit ladakh, nubra pangong permit, ladakh permit online",
    }),
    content: () => `
      <p><strong>Short answer:</strong> the rules have changed over the years and many websites still repeat outdated advice. This guide explains the position as we understand it today; <strong>always confirm on the official Ladakh (LAHDC / Leh administration) tourism portal before you travel</strong>, because notifications can change.</p>

      <h3>Indian tourists</h3>
      <p>In August 2021 the Union Territory administration of Ladakh issued a notification removing the Inner Line Permit requirement for Indian nationals for the protected areas that tourists commonly visit, such as Nubra Valley, Pangong Lake and Tso Moriri. Indian visitors are still expected to follow the current entry formalities, which can include paying local environment-related fees. Because blogs disagree, check the official portal for the latest procedure.</p>

      <h3>Foreign nationals</h3>
      <p>Foreign nationals (including OCI/PIO card holders) generally need a <strong>Protected Area Permit</strong>, normally arranged through a registered travel agent in Leh. Some areas have extra conditions. Plan this well before your travel dates.</p>

      <h3>Places this usually matters for</h3>
      <ul>
        <li>Nubra Valley and Khardung La</li>
        <li>Pangong Lake</li>
        <li>Tso Moriri</li>
        <li>Hanle and the Changthang region</li>
        <li>The Aryan Valley villages (see our <a href="/blog/aryan-s-village-of-india-in-ladakh">Aryan Valley guide</a>)</li>
      </ul>

      <h3>What to carry</h3>
      <ul>
        <li>Original government photo ID (and passport for foreign nationals)</li>
        <li>Printed or saved copies of your permits and fee receipts</li>
        <li>Motorbike RC, insurance and your driving licence</li>
        <li>A few passport photos</li>
      </ul>

      <h3>Permits on a Stories by Foot trip</h3>
      <p>Permits and entry formalities are part of the packages: our Ladakh bike trips list permits in the inclusions, so you do not have to chase paperwork. See the <a href="/destinations/ladakh">Ladakh bike trip packages</a>.</p>
      <p>Related reading: <a href="/blog/ladakh-bike-trip-cost">Ladakh bike trip cost</a> and the <a href="/blog/things-to-carry-in-ladakh-bike-trip">packing list</a>.</p>`,
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: "ladakh-bike-trip-for-beginners",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.packing,
    tags: ["Ladakh", "Beginners", "Safety"],
    authors: [2],
    cardTitle: "Ladakh Bike Trip for Beginners",
    excerpt: "Can a first-time rider do Ladakh? Skills you need, altitude sickness basics and how to pick a beginner-friendly trip.",
    title: () => "Ladakh Bike Trip for Beginners: Is It Safe and How to Prepare",
    seo: () => ({
      title: "Ladakh Bike Trip for Beginners: Safety & Preparation | Stories by Foot",
      description: "Planning your first Ladakh ride? Skills you need, altitude sickness basics, the safest trip format and tips to prepare as a beginner.",
      keywords: "ladakh bike trip for beginners, first time ladakh bike trip, is ladakh bike trip safe, ladakh bike trip tips, altitude sickness ladakh",
    }),
    content: (c) => {
      const d = ladakh(c);
      const short = d.packages.find((p) => p.slug === "khardungla-changla-loop") || d.packages[0];
      return `
      <p>Yes, a motivated beginner can ride Ladakh, but it is not the place to learn the basics of riding. The difference between a great first trip and a stressful one is <strong>preparation, pace and support</strong>.</p>

      <h3>Skills you should have before you go</h3>
      <ul>
        <li>Comfortable with clutch, gears and braking on a 350–450 cc motorcycle</li>
        <li>Able to ride for several hours a day without fatigue</li>
        <li>Basic experience on gravel, loose sand and uneven roads</li>
        <li>Valid driving licence and a good understanding of group riding</li>
      </ul>
      <p>Practise on weekends: ride with luggage, brake on loose surfaces and do a few long days before the trip.</p>

      <h3>Altitude: the real challenge</h3>
      <p>Leh is at about 3,500 m, and passes go well above 5,000 m. Acute Mountain Sickness (AMS) can affect anyone, regardless of fitness.</p>
      <ul>
        <li>Rest for the first 24–48 hours in Leh and keep activity light</li>
        <li>Drink plenty of water and avoid alcohol early in the trip</li>
        <li>Know the symptoms: headache, nausea, dizziness, poor sleep, unusual breathlessness</li>
        <li>If symptoms get worse, descend and get medical help. Do not push on</li>
        <li>Talk to your doctor about altitude medication before travelling; do not self-prescribe</li>
      </ul>

      <h3>Choose a beginner-friendly format</h3>
      <ul>
        <li><strong>Group trip with support:</strong> our Ladakh trips include a marshal cum mechanic, a backup vehicle (from the Nubra day), an oxygen cylinder and a first-aid kit.</li>
        <li><strong>Seat in backup:</strong> you can opt for a seat in the backup vehicle when you are tired, so a hard day never becomes unsafe.</li>
        <li><strong>Start short:</strong> the ${link(d, short)} is a ${(short.duration.match(/(\d+)\s*days?/i) || [])[1]}-day circuit through Leh, Nubra and Pangong.</li>
      </ul>

      <h3>Riding tips for Ladakh</h3>
      <ul>
        <li>Never ride at night and start early to avoid afternoon river crossings</li>
        <li>Keep a safe gap on gravel, brake gently and look far ahead</li>
        <li>Wear a proper helmet, gloves, jacket with armour and riding boots</li>
        <li>Stop to rest and eat even when you feel fine</li>
      </ul>
      <p>Get the gear right with our <a href="/blog/things-to-carry-in-ladakh-bike-trip">Ladakh packing list</a>, understand the budget in <a href="/blog/ladakh-bike-trip-cost">Ladakh bike trip cost</a>, or see <a href="/destinations/ladakh">all Ladakh bike trip packages</a>.</p>`;
    },
  },

  /* ------------------------------------------------------------------ 6 */
  {
    slug: "spiti-valley-bike-trip-guide",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.passes,
    tags: ["Spiti", "Himalayas", "Bike Trip"],
    authors: [1],
    cardTitle: "Spiti Valley Bike Trip Guide",
    excerpt: "Route ideas, best time, altitude and practical tips for riding the cold-desert valley of Spiti.",
    title: () => "Spiti Valley Bike Trip Guide: Route, Best Time and Practical Tips",
    seo: () => ({
      title: "Spiti Valley Bike Trip Guide: Route & Best Time | Stories by Foot",
      description: "Planning a Spiti Valley bike trip? Circuit options, best time to ride, altitude, fuel planning and what to see from Kaza to Chandratal.",
      keywords: "spiti valley bike trip, spiti bike trip guide, spiti bike trip route, best time for spiti, shimla to spiti by bike, manali to spiti bike trip, kaza chandratal",
    }),
    content: () => `
      <p>Spiti is a high-altitude cold desert in Himachal Pradesh with ancient monasteries, tiny villages and some of the most dramatic riding in the Indian Himalayas. Heights and distances below are approximate and road conditions change with weather, so verify before you go.</p>

      <h3>The classic Spiti circuit</h3>
      <p>The most popular loop connects <strong>Shimla, Kinnaur, Spiti and Manali</strong>. You can ride it clockwise or anticlockwise:</p>
      <ul>
        <li><strong>Shimla side:</strong> Narkanda, Sangla, Kalpa, Nako and Tabo, with a gradual climb into the valley</li>
        <li><strong>Spiti core:</strong> Kaza (about 3,800 m) as the base for Key Monastery, Kibber, Langza, Hikkim and Komic</li>
        <li><strong>Manali side:</strong> Kunzum La (about 4,500 m), then Chandratal and the Rohtang area, rougher and open only in summer</li>
      </ul>

      <h3>Best time to ride</h3>
      <p>Roughly <strong>May or June to October</strong>. The Kunzum La road to Manali is usually snowbound in winter, while the Kinnaur side stays accessible longer. July and August can bring landslides on the approach roads, so keep spare days.</p>

      <h3>Altitude and acclimatisation</h3>
      <p>Spiti sits higher than many riders expect. Build in rest days, drink water and avoid rushing from Shimla to Kaza in a single push. See our <a href="/blog/ladakh-bike-trip-for-beginners">altitude sickness basics</a>, which apply here as well.</p>

      <h3>Fuel and supplies</h3>
      <p>Petrol pumps are scarce inside the valley. Fill up before entering remote stretches, carry a small reserve and confirm current pump availability locally. Carry cash, since ATMs can be unreliable.</p>

      <h3>What to see</h3>
      <ul>
        <li>Key and Tabo monasteries</li>
        <li>Langza, Hikkim and Komic villages</li>
        <li>Chandratal Lake (summer access)</li>
        <li>Pin Valley and the starry skies of Spiti</li>
      </ul>

      <h3>Prefer Ladakh or other Himalayan routes?</h3>
      <p>If you want a supported, ready-planned expedition, see our <a href="/destinations/ladakh">Ladakh bike trip packages</a> or <a href="/destinations">all destinations</a>. For help planning a custom Himalayan route, <a href="/contact">contact our team</a>.</p>`,
  },

  /* ------------------------------------------------------------------ 7 */
  {
    slug: "sikkim-travel-guide-nathu-la-gangtok",
    date: "2026-10-29", // ISO date the post was published (written on this day)
    img: IMG.monastery,
    tags: ["Sikkim", "Himalayas", "Permits"],
    authors: [0, 1],
    cardTitle: "Sikkim Travel Guide",
    excerpt: "Gangtok, Tsomgo Lake, Nathu La and North Sikkim: permits, timings, altitude and the best season.",
    title: () => "Sikkim Travel Guide: Gangtok, Nathu La, Lachung and Permits",
    seo: () => ({
      title: "Sikkim Travel Guide: Nathu La, Gangtok & Permits | Stories by Foot",
      description: "Sikkim travel guide: Nathu La and Tsomgo Lake permits, opening days, altitude, Lachung and Yumthang, and the best time to visit.",
      keywords: "sikkim travel guide, nathu la permit, tsomgo lake permit, gangtok tour, yumthang valley, north sikkim permit, best time to visit sikkim",
    }),
    content: () => `
      <p>Sikkim packs monasteries, high-altitude lakes and snow peaks into a small state. Rules for permits and closures change often, so use this as a planning guide and confirm current details with a registered operator or the Sikkim Tourism Department.</p>

      <h3>Gangtok: your base</h3>
      <p>Gangtok sits at roughly 1,650 m (about 5,500 ft), a comfortable altitude for most travellers. Spend a couple of nights here before heading higher, especially if you plan to visit Nathu La.</p>

      <h3>Tsomgo Lake and Nathu La</h3>
      <ul>
        <li><strong>Tsomgo (Changu) Lake</strong> is at around 3,750 m (about 12,300 ft), a short drive from Gangtok.</li>
        <li><strong>Nathu La</strong> is on the India–China border at about 4,310 m (14,140 ft), open to Indian citizens only.</li>
        <li>Nathu La is typically <strong>open Wednesday to Sunday and closed on Mondays and Tuesdays</strong>.</li>
        <li>A <strong>Protected Area Permit</strong> is required for Tsomgo, Nathu La and Zuluk. It is normally arranged through a registered tour operator, a day in advance, and can be cancelled by snowfall or landslides.</li>
      </ul>

      <h3>North Sikkim: Lachen, Lachung and Yumthang</h3>
      <p>North Sikkim is the home of Yumthang Valley and, higher up, Gurudongmar Lake (around 5,400 m). Indian citizens need a Protected Area Permit for North Sikkim, usually arranged through a registered operator, and foreign nationals face tighter restrictions. Roads can close after heavy snow or monsoon landslides.</p>

      <h3>Best time to visit</h3>
      <ul>
        <li><strong>March to May:</strong> rhododendron blooms and pleasant weather</li>
        <li><strong>October to December:</strong> clear mountain views after the monsoon</li>
        <li><strong>Monsoon (June to September):</strong> lush but with landslide and road-closure risk</li>
      </ul>

      <h3>Altitude advice</h3>
      <p>Do not fly in and drive straight up to Nathu La on the same day. Acclimatise in Gangtok, hydrate and avoid alcohol the night before. Read our <a href="/blog/ladakh-bike-trip-for-beginners">altitude sickness basics</a>.</p>

      <h3>More Himalayan destinations</h3>
      <p>Explore our <a href="/destinations">Himalayan tour packages</a>, such as <a href="/destinations/bhutan">Bhutan</a>, <a href="/destinations/nepal">Nepal</a> and <a href="/destinations/meghalaya">Meghalaya</a>, or <a href="/contact">contact us</a> to plan a custom trip.</p>`,
  },
];

// Keep every title inside Google's ~64 character display window.
newBlogPosts.forEach((p) => {
  const raw = p.seo;
  p.seo = (c) => {
    const r = raw(c);
    return { ...r, title: fitTitle(r.title) };
  };
});

export const getNewBlogPost = (slug) => newBlogPosts.find((p) => p.slug === slug);

/** SEO map (same shape as blogSeo) for the prerender script and sitemap. */
export const buildNewBlogSeo = (ctx) =>
  Object.fromEntries(
    newBlogPosts.map((p) => {
      const s = p.seo(ctx);
      const plain = p.content(ctx).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return [
        p.slug,
        {
          ...s,
          img: p.img,
          date: p.date,
          body: `<h1>${p.title(ctx)}</h1><p>${s.description}</p><p>${plain.slice(0, 900)}…</p>`,
        },
      ];
    })
  );
