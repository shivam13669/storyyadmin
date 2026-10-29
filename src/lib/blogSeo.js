/**
 * SEO text for blog posts — single source of truth.
 * Used by scripts/prerender.cjs (build) AND src/pages/BlogPost.tsx (runtime),
 * so the prerendered HTML and the live page carry the same title/description.
 *
 * To add a new blog post: add its slug here (it is then automatically added to
 * the sitemap and prerendered).  Keep title <= 65 chars, description <= 160.
 * "body" is a short crawlable summary used in the prerendered HTML.
 */
// date: "YYYY-MM-DD" — the REAL day each post was first published. Left empty on purpose:
// no schema date is output until you fill it (wrong dates would mislead Google and readers).
export const blogSeo = {
  "leh-ladakh-bike-trip-guide": {
    "title": "Leh Ladakh Bike Trip Guide: Routes, Costs & Tips",
    "description": "Plan your Leh Ladakh bike trip: Manali vs Srinagar routes, costs, packing list and road conditions, from the riders at Stories by Foot.",
    "keywords": "leh ladakh bike trip guide, ladakh bike tour, leh ladakh bike trip cost, manali to leh road status, srinagar to leh route map",
    "body": "<h1>The Ultimate Guide to Your Leh Ladakh Bike Trip 2026: Routes, Costs, and the New Frontier</h1>\n      <p>Planning a Leh Ladakh bike trip package 2026 is an exhilarating feeling, but the difference between a legendary adventure and a difficult ordeal lies in your preparation. Ride across Khardung La or climb the 19,024ft to Umling La Pass with Stories by Foot.</p>\n      <h3>Srinagar vs Manali Route</h3>\n      <p>Srinagar to Leh offers better acclimatization, while Manali to Leh provides raw high-altitude passes. Choose Srinagar-Leh-Manali for the ultimate circuit.</p>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2F055822843df249458d0500b75a6c350c%2Fc23140af56a445ddb6d97bd0aed919ef?format=webp&width=2000",
    "date": ""
  },
  "things-to-carry-in-ladakh-bike-trip": {
    "title": "Ladakh Bike Trip Packing List: Gear Up Like a Pro",
    "description": "Ladakh bike trip packing list: riding gear, layers, tools, spares, medicines and documents to carry for your Himalayan motorcycle expedition.",
    "keywords": "ladakh bike trip packing list, motorcycle tour essentials, riding gear for leh, high altitude medicines diamox, spares for royal enfield",
    "body": "<h1>The Ultimate Ladakh Bike Trip Packing List 2026: Gear Up Like a Pro</h1>\n      <p>When riding through Zanskar or climbing to Umling La, packing right is critical. Here is the rider checklist:</p>\n      <ul>\n      <li>CE Level 2 riding armor and waterproof boots</li>\n      <li>Three-layer clothing system for sub-zero temperatures</li>\n      <li>Riding gloves (one thermal, one breathable)</li>\n      <li>Spares: clutch cables, accelerator cable, chain lube</li>\n      <li>Medical kit with ORS, Diamox, and sunscreen</li>\n      </ul>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F7a35f75c7da94e7fb0ec886bd54114f8?format=webp",
    "date": ""
  },
  "petrol-pump-guide-of-ladakh": {
    "title": "Petrol Pumps in Ladakh: Fuel Guide for Bike Trips",
    "description": "Where to find petrol pumps in Leh, Karu, Diskit and Tangtse, and how to plan for the long fuel gap between Pangong, Hanle and Umling La.",
    "keywords": "petrol pumps in ladakh, fuel availability leh, petrol in hanle, nyoma petrol station, emergency fuel ladakh, fuel dead zones",
    "body": "<h1>Fuel Guide Ladakh: Where to Find Petrol Stations in Ladakh for Your Bike Trip</h1>\n      <p>Fuel planning is a survival skill in the trans-Himalayas. Know the locations of petrol stations:</p>\n      <ul>\n      <li>Leh: Multiple petrol pumps (primary fill up point)</li>\n      <li>Karu: Indian Oil pump (last main stop before Manali highway or Pangong)</li>\n      <li>Diskit: Only official pump in Nubra Valley</li>\n      <li>Tangtse: Pump located 40km before Pangong Lake</li>\n      <li><strong>Hanle to Umling La:</strong> 440km fuel dead zone. Carry 5-10L jerry cans.</li>\n      </ul>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2Ff5582cc810f24c66bfb71cf2665a7f78?format=webp",
    "date": ""
  },
  "zanskar-the-hidden-gem": {
    "title": "Zanskar Valley Travel Guide: Routes, Padum & Phugtal",
    "description": "Explore remote Zanskar: reach Padum over Shinku La or the Nimmu–Padum road, and visit Phugtal Gompa, Gonbo Rangjon and Drang-Drung Glacier.",
    "keywords": "zanskar valley guide, padum travel packages, shinku la pass route, phugtal monastery trek, gonbo rangjon monolith, drang drung glacier",
    "body": "<h1>Zanskar Unveiled: The Ultimate Guide to the Kingdom of High Passes</h1>\n      <p>Explore Zanskar, the most remote sub-region of Ladakh, home to Phugtal Monastery, the mighty Pensi La pass, Drang-Drung glacier, and the monolith Gonbo Rangjon.</p>\n      <h3>Routes into Zanskar:</h3>\n      <p>1. Kargil to Padum via Pensi La. 2. Manali to Darcha over Shinku La. 3. Leh to Padum via Nimmu-Padum road along the Zanskar River.</p>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F6533e44a24cd46deb3001e3e3a596a36?format=webp",
    "date": ""
  },
  "ladakh-the-land-of-high-passes": {
    "title": "Ladakh High Passes Guide: Khardung La to Umling La",
    "description": "Riding Ladakh's high passes: Khardung La, Tanglang La, Chang La and Umling La, with permits, route planning and acclimatization tips.",
    "keywords": "land of high passes, ladakh travel guide, umling la pass height, baralacha la road status, inner line permits leh, acclimatization rules",
    "body": "<h1>Ladakh: The Land of High Passes – The Ultimate 2026 Biking Guide</h1>\n      <p>Conquer the highest passes of the trans-Himalayas. Ride across Khardung La, Tanglang La, Chang La, and Umling La (19,024 ft) with Stories by Foot.</p>\n      <h3>Safety Protocol:</h3>\n      <p>A 48-hour mandatory acclimatization is required in Leh before traveling to higher regions.</p>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fa033b060ab404f008df2bf157c46232f%2F453733ddde0440a4bef0de72c9b892bd?format=webp",
    "date": ""
  },
  "aryan-s-village-of-india-in-ladakh": {
    "title": "Aryan Valley Ladakh: Brokpa Villages Dah, Hanu & Beama",
    "description": "Meet the Brokpa people of Aryan Valley (Dah, Hanu, Beama): the flower women, Balti orchards and the legend of Alexander the Great's soldiers.",
    "keywords": "aryan valley ladakh, brokpa tribe brokpa people, alexander the great descendants, flower women brokpa, dah hanu villages, batalik sector",
    "body": "<h1>The Lost Tribe of Alexander: A Journey into the Aryan Valley with Stories by Foot</h1>\n      <p>Visit the Brokpa tribe in the warm Aryan valley of Dah and Hanu. Known as the Flower People, they claim descent from Alexander the Great's army.</p>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fa15ae9d8cf5949a1ad15115d8099c370%2F668c57dcea25402bb57f691af29bc346?format=webp&width=800&height=1200",
    "date": ""
  },
  "pregnancy-tourism-in-ladakh": {
    "title": "Pregnancy Tourism in Ladakh: Myth vs Facts | Stories by Foot",
    "description": "The facts behind the 'pregnancy tourism' rumours in the Brokpa villages of Ladakh, separating anthropology from sensationalist tabloid myths.",
    "keywords": "pregnancy tourism ladakh, brokpa bloodline myths, alexander lost soldiers myth, aryan valley rumors, cultural respect brokpa",
    "body": "<h1>The Myth of \"Pregnancy Tourism\" in Ladakh: Setting the Record Straight</h1>\n      <p>Addressing the sensationalist rumors regarding pregnancy tourism in the Aryan Valley. Fact check: modern genetics show complex mixed Dardic lineage, not isolated Greek bloodlines.</p>",
    "img": "https://cdn.builder.io/api/v1/image/assets%2Fc135df136d3b488b90d8e0548092ee36%2F99417e8c8c8b4c06881602fbcd5b6e72",
    "date": ""
  }
};
