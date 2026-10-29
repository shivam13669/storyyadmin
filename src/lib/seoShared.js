/**
 * Shared SEO engine — single source of truth for titles, descriptions,
 * keywords and JSON-LD structured data.
 *
 * Used by:
 *   - scripts/prerender.cjs   (build time → static HTML that Google reads first)
 *   - src/pages/*.tsx         (runtime → what the browser / Googlebot renderer sees)
 *
 * Because both sides call the SAME functions, the prerendered HTML and the
 * hydrated page always carry identical SEO tags (no mismatch / no duplicates).
 *
 * Everything here is derived from src/data/destinations.ts, so when you add a
 * new destination or package the SEO for it is generated automatically.
 */

export const SITE_URL = "https://www.storiesbyfoot.com";
export const SITE_NAME = "Stories by Foot";
export const DEFAULT_IMAGE = `${SITE_URL}/og-default.jpg`;
export const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2Fde743b16560c4ea5a4a46e65a2543876%2F4be0568d99d2469baa7ef6c274a8a1b2?format=webp&width=800";

export const ORG = {
  phone: "+91-6205129118",
  email: "contact@storiesbyfoot.com",
  instagram: "https://www.instagram.com/storiesbyfoot/",
  address: {
    streetAddress: "91, GK Crystal Home, KL Highway",
    addressLocality: "SAS Nagar",
    addressRegion: "Punjab",
    postalCode: "140307",
    addressCountry: "IN",
  },
};

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

/**
 * Season year used in titles ("Ladakh Bike Trip 2027").
 * Ladakh season is Apr–Oct, so from October onward people are searching for
 * NEXT year's trips. Set SEASON_YEAR_OVERRIDE to a number to force a year.
 */
export const SEASON_YEAR_OVERRIDE = null;
export const seasonYear = () => {
  if (SEASON_YEAR_OVERRIDE) return SEASON_YEAR_OVERRIDE;
  const d = new Date();
  return d.getMonth() >= 9 ? d.getFullYear() + 1 : d.getFullYear();
};

export const priceNumber = (price) => parseInt(String(price || "").replace(/[^\d]/g, ""), 10) || 0;

export const parseDuration = (duration = "") => {
  const days = /(\d+)\s*days?/i.exec(duration);
  const nights = /(\d+)\s*nights?/i.exec(duration);
  return { days: days ? +days[1] : 0, nights: nights ? +nights[1] : 0 };
};

/** Cut at a word boundary so meta text never ends mid-word. */
export const trimTo = (text, max) => {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–—-]+$/, "") + "…";
};

/**
 * Builds a meta description from "slots". Each slot lists options from richest
 * to poorest (the last option may be ""). Picks the richest combination that
 * fits, sacrificing LATER slots first — so a description never ends mid-word.
 */
const compose = (slots, max = 160) => {
  const join = (arr) => arr.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  const walk = (i, picked) => {
    if (i === slots.length) {
      const text = join(picked);
      return text.length <= max ? text : null;
    }
    for (const opt of slots[i]) {
      const found = walk(i + 1, [...picked, opt]);
      if (found) return found;
    }
    return null;
  };
  return walk(0, []) || trimTo(join(slots.map((s) => s[0])), max);
};

const withBrand = (core, max = 64) => {
  const full = `${core} | ${SITE_NAME}`;
  return full.length <= max ? full : core;
};

/** Drops the " | Stories by Foot" suffix when a title would be cut off in Google (> 64 chars). */
export const fitTitle = (title, max = 64) =>
  title.length > max ? title.replace(new RegExp(`\\s*\\|\\s*${SITE_NAME}( Blog)?$`), "") : title;

/**
 * WhatsApp / Facebook do not reliably render WebP link previews, and the package photos
 * are tall portrait images. For those we fall back to the 1200x630 JPG.
 */
export const ogImage = (url) => (!url || /format=webp/i.test(url) ? DEFAULT_IMAGE : url);

/** BlogPosting JSON-LD, shared by BlogPost.tsx (runtime) and prerender.cjs (build). Add \`date\` (ISO) to a post to emit datePublished. */
export const buildArticleSchema = ({ slug, title, description, image, date }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  headline: trimTo(title.replace(/\s*\|\s*Stories by Foot( Blog)?$/, ""), 110),
  description,
  image: [image || DEFAULT_IMAGE],
  inLanguage: "en-IN",
  ...(date ? { datePublished: date, dateModified: date } : {}),
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: LOGO_URL } },
});

const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
const lc = (s) => String(s || "").toLowerCase();

export const packageUrl = (dest, pkg) => `${SITE_URL}/destinations/${dest.slug}/${pkg.slug}`;
export const destinationUrl = (dest) => `${SITE_URL}/destinations/${dest.slug}`;

/**
 * Packages are NOT all bike trips: only "Two-wheeler" ones are.
 * Describing a trek as a "bike trip" is inaccurate and hurts click quality.
 */
export const packageKind = (pkg) => {
  const cats = (pkg.categories || []).map(lc);
  const text = lc(`${pkg.name} ${pkg.slug}`);
  if (cats.includes("two-wheeler")) return { label: "Bike Trip", isBike: true };
  if (/\btrek\b/.test(text)) return { label: "Trek", isBike: false };
  if (/rafting/.test(text)) return { label: "Rafting Expedition", isBike: false };
  return { label: "Tour Package", isBike: false };
};

/** Only claim what the package's own inclusions list actually says. */
export const inclusionHighlights = (pkg) => {
  const inc = lc((pkg.inclusions || []).join(" | "));
  if (!inc) return [];
  const out = [];
  if (/backup vehicle/.test(inc)) out.push("backup vehicle");
  if (/mechanic/.test(inc)) out.push("mechanic");
  if (/oxygen/.test(inc)) out.push("oxygen cylinder");
  if (/inner line permit/.test(inc)) out.push("inner line permits");
  if (/fuel/.test(inc)) out.push("fuel");
  if (/airport pickup/.test(inc)) out.push("airport pickup & drop");
  if (/meals/.test(inc)) out.push("meals");
  return out;
};

const placesCovered = (pkg) =>
  uniq((pkg.itinerary || []).map((d) => d.location)).map((l) => l.replace(/\blake\b/i, "Lake").trim());

const imagesOf = (pkg, dest) =>
  uniq([pkg.image, ...(pkg.galleryImages || []), dest.heroImage]).slice(0, 5);

export const breadcrumbSchema = (items, id) => ({
  "@type": "BreadcrumbList",
  ...(id ? { "@id": id } : {}),
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

const organizationRef = { "@id": `${SITE_URL}/#travelagency` };

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

export const buildHomeSEO = (destinations) => {
  const year = seasonYear();
  const allPkgs = destinations.flatMap((d) => d.packages);
  const prices = allPkgs.map((p) => priceNumber(p.price)).filter(Boolean);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
  const bikePkgs = destinations.flatMap((d) => d.packages.filter((p) => packageKind(p).isBike));
  const bikeMin = bikePkgs.length ? Math.min(...bikePkgs.map((p) => priceNumber(p.price))) : min;

  const title = `Ladakh Bike Trip Packages ${year} | ${SITE_NAME}`;
  const others = destinations.filter((d) => d.slug !== "ladakh").map((d) => d.name);
  const description = compose([
    [
      `Book Leh Ladakh bike trip packages ${year} from ${fmt(bikeMin)} with backup vehicle, mechanic & oxygen.`,
      `Book Leh Ladakh bike trip packages ${year} from ${fmt(bikeMin)}.`,
    ],
    [`Also ${others.join(", ")} tours.`, `Also ${others.slice(0, 3).join(", ")} tours.`, ""],
    [`${SITE_NAME}.`, ""],
  ]);

  const keywords = uniq([
    "ladakh bike trip",
    `leh ladakh bike trip package ${year}`,
    "ladakh bike tour packages",
    "leh ladakh tour package",
    "ladakh bike trip cost",
    "ladakh motorcycle tour",
    "royal enfield himalayan ladakh trip",
    "umling la bike trip",
    "hanle bike trip",
    "pangong nubra bike trip",
    "zanskar tour package",
    "chadar trek",
    "tawang tour package",
    "bhutan tour package",
    "nepal tour package",
    "meghalaya tour package",
    "himalayan adventure tours india",
    "stories by foot",
  ]).join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": `${SITE_URL}/#travelagency`,
        name: SITE_NAME,
        alternateName: "Stories by Foot - Walk the Road. Live the Story.",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: LOGO_URL },
        image: DEFAULT_IMAGE,
        description:
          "Stories by Foot curates guided Ladakh motorcycle tours and Himalayan adventure packages across Ladakh, Zanskar, Tawang, Bhutan, Nepal and Meghalaya.",
        telephone: ORG.phone,
        email: ORG.email,
        foundingDate: "2020",
        priceRange: `${fmt(min)} - ${fmt(max)}`,
        address: { "@type": "PostalAddress", ...ORG.address },
        areaServed: destinations.map((d) => d.name),
        knowsAbout: [
          "Ladakh bike trips",
          "Himalayan motorcycle expeditions",
          "Zanskar and Chadar trek",
          "Bhutan, Nepal and Meghalaya tours",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: ORG.phone,
          email: ORG.email,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: [ORG.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tour Packages",
          itemListElement: destinations.map((d) => ({
            "@type": "OfferCatalog",
            name: `${d.name} Tour Packages`,
            url: destinationUrl(d),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-IN",
        publisher: organizationRef,
      },
    ],
  };

  return { title, description, keywords, image: DEFAULT_IMAGE, schema, url: SITE_URL };
};

/* ------------------------------------------------------------------ */
/* /destinations  (all packages)                                       */
/* ------------------------------------------------------------------ */

export const buildListingSEO = (destinations) => {
  const year = seasonYear();
  const allPkgs = destinations.flatMap((d) => d.packages.map((p) => ({ d, p })));
  const min = Math.min(...allPkgs.map(({ p }) => priceNumber(p.price)).filter(Boolean));
  const names = destinations.map((d) => d.name);

  const title = withBrand(`Himalayan Tour Packages ${year}: Ladakh, Bhutan, Nepal`, 64);
  const rest = names.filter((n) => n !== "Ladakh");
  const description = compose([
    [`Compare ${allPkgs.length} guided tour packages from ₹${min.toLocaleString("en-IN")}: Ladakh bike trips, ${rest.join(", ")}.`],
    [`Book with ${SITE_NAME}.`, ""],
  ]);
  const keywords = uniq([
    "himalayan tour packages",
    "adventure tour packages india",
    "ladakh bike trip packages",
    ...names.map((n) => `${lc(n)} tour packages`),
    "stories by foot destinations",
  ]).join(", ");

  const url = `${SITE_URL}/destinations`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#packages` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#packages`,
        name: "Himalayan Adventure Tour Packages",
        numberOfItems: allPkgs.length,
        itemListElement: allPkgs.map(({ d, p }, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: packageUrl(d, p),
          name: p.name,
        })),
      },
      breadcrumbSchema(
        [
          { name: "Home", url: SITE_URL },
          { name: "Destinations", url },
        ],
        `${url}#breadcrumb`
      ),
    ],
  };
  return { title, description, keywords, image: DEFAULT_IMAGE, schema, url };
};

/* ------------------------------------------------------------------ */
/* /destinations/:slug                                                 */
/* ------------------------------------------------------------------ */

export const buildDestinationSEO = (dest) => {
  const year = seasonYear();
  const pkgs = dest.packages;
  const kinds = pkgs.map(packageKind);
  const allBike = kinds.every((k) => k.isBike);
  const anyBike = kinds.some((k) => k.isBike);
  const min = Math.min(...pkgs.map((p) => priceNumber(p.price)).filter(Boolean));
  const minTxt = `₹${min.toLocaleString("en-IN")}`;
  const url = destinationUrl(dest);

  const noun = allBike ? "Bike Trip Packages" : anyBike ? "Bike Trips & Tour Packages" : "Tour Packages";
  const title = withBrand(`${dest.name} ${noun} ${year} – From ${minTxt}`, 66);

  // Only claim inclusions that EVERY package in this destination actually has.
  const common = pkgs
    .map(inclusionHighlights)
    .reduce((acc, cur, i) => (i === 0 ? cur : acc.filter((x) => cur.includes(x))), [])
    .filter((x) => ["backup vehicle", "mechanic", "oxygen cylinder", "inner line permits"].includes(x));

  const pkgNames = (k) => pkgs.slice(0, k).map((p) => p.name).join(", ");
  const cta = [`Book with ${SITE_NAME}.`, ""];
  const description =
    pkgs.length === 1
      ? compose([
          [`${pkgs[0].name}: ${parseDuration(pkgs[0].duration).days || ""}-day ${dest.name} tour package from ${minTxt}.`.replace(": -day", ":")],
          [dest.summary, ""],
          [`Best time: ${dest.quickFacts?.bestTime}.`, ""],
          [dest.quickFacts?.startPoint ? `Starts at ${dest.quickFacts.startPoint}.` : "", ""],
          cta,
        ])
      : allBike
      ? compose([
          [`${pkgs.length} ${dest.name} bike trip packages from ${minTxt}: ${pkgNames(3)}.`, `${pkgs.length} ${dest.name} bike trip packages from ${minTxt}.`],
          common.length
            ? [`Includes ${common.join(", ")}.`, `Includes ${common.slice(0, 3).join(", ")}.`, `Includes ${common.slice(0, 2).join(", ")}.`, ""]
            : [""],
          cta,
        ])
      : compose([
          [`${pkgs.length} ${dest.name} tour packages from ${minTxt}: ${pkgNames(3)}.`, `${pkgs.length} ${dest.name} tour packages from ${minTxt}.`],
          [dest.summary, ""],
          [dest.quickFacts?.startPoint ? `Starts at ${dest.quickFacts.startPoint}.` : "", ""],
          cta,
        ]);

  const n = lc(dest.name);
  const keywords = uniq([
    `${n} tour packages`,
    `${n} tour package ${year}`,
    `${n} trip packages`,
    `${n} trip cost`,
    `best time to visit ${n}`,
    `${n} packages from ${lc(dest.quickFacts?.startPoint || "")}`.trim(),
    `stories by foot ${n}`,
    ...(anyBike
      ? [
          `${n} bike trip`,
          `${n} bike tour packages`,
          `${n} motorcycle tour`,
          `${n} bike trip cost`,
          `${n} royal enfield trip`,
          ...(dest.slug === "ladakh"
            ? ["leh ladakh bike trip", "leh ladakh tour package", "ladakh bike trip package", "umling la bike trip", "hanle bike trip", "pangong nubra bike trip", "manali leh bike trip", "srinagar leh bike trip"]
            : []),
        ]
      : []),
    ...pkgs.map((p) => lc(p.name)),
  ]).join(", ");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        about: { "@id": `${url}#destination` },
        mainEntity: { "@id": `${url}#packages` },
      },
      {
        "@type": "TouristDestination",
        "@id": `${url}#destination`,
        name: dest.name,
        description: dest.summary,
        url,
        image: dest.heroImage,
        touristType: ["Adventure travellers", ...(anyBike ? ["Motorcycle riders"] : [])],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#packages`,
        name: `${dest.name} Tour Packages`,
        numberOfItems: pkgs.length,
        itemListElement: pkgs.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: packageUrl(dest, p),
          name: p.name,
        })),
      },
      breadcrumbSchema(
        [
          { name: "Home", url: SITE_URL },
          { name: "Destinations", url: `${SITE_URL}/destinations` },
          { name: dest.name, url },
        ],
        `${url}#breadcrumb`
      ),
    ],
  };

  return { title, description, keywords, image: dest.heroImage || DEFAULT_IMAGE, schema, url };
};

/* ------------------------------------------------------------------ */
/* /destinations/:slug/:packageSlug                                    */
/* ------------------------------------------------------------------ */

export const buildPackageSEO = (dest, pkg) => {
  const year = seasonYear();
  const kind = packageKind(pkg);
  const { days } = parseDuration(pkg.duration);
  const url = packageUrl(dest, pkg);
  const places = placesCovered(pkg);
  const incl = inclusionHighlights(pkg);
  const dayLabel = days ? `${days}-Day ` : "";

  const title = withBrand(`${pkg.name} | ${dayLabel}${dest.name} ${kind.label} ${year}`);

  const headlinePlaces = places.length
    ? places
    : pkg.highlights.slice(0, 3).map((h) => h.split(/\s[-–|]\s/)[0].trim());
  const head = (k) =>
    `${days ? `${days}-day ` : ""}${dest.name} ${lc(kind.label)} from ${pkg.price}: ${headlinePlaces.slice(0, k).join(", ")}.`;
  const description = compose([
    [head(4), head(3), head(2)],
    incl.length
      ? [`Includes ${incl.slice(0, 4).join(", ")}.`, `Includes ${incl.slice(0, 3).join(", ")}.`, `Includes ${incl.slice(0, 2).join(", ")}.`, ""]
      : [""],
    [`Book with ${SITE_NAME}.`, ""],
  ]);

  const n = lc(dest.name);
  const kw = [
    lc(pkg.name),
    `${lc(pkg.name)} package`,
    `${lc(pkg.name)} price`,
    `${n} ${lc(kind.label)}`,
    kind.label.endsWith("Package") ? "" : `${n} ${lc(kind.label)} package`,
    `${n} tour package ${year}`,
    days ? `${days} days ${n} trip` : "",
    `${n} trip cost`,
    `stories by foot ${n}`,
    ...places.slice(0, 5).flatMap((pl) => [`${lc(pl)} trip`, `${lc(pl)} tour package`]),
  ];
  if (kind.isBike) {
    kw.push(`${n} bike tour packages`, `${n} motorcycle tour`);
    if (/himalayan/i.test((pkg.inclusions || []).join(" ") + (pkg.bikes || []).map((b) => b.name).join(" "))) {
      kw.push("royal enfield himalayan ladakh trip");
    }
  }
  const keywords = uniq(kw).slice(0, 20).join(", ");

  const images = imagesOf(pkg, dest);
  const itineraryItems = (pkg.itinerary || []).map((day, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "TouristAttraction",
      name: `Day ${day.day}: ${day.title}`,
      description: day.description,
    },
  }));

  const hasRating = Number(pkg.rating) > 0 && Number(pkg.reviews) > 0;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: pkg.name,
        url,
        image: images,
        description: pkg.description,
        sku: pkg.slug,
        category: `${dest.name} ${kind.label}`,
        brand: { "@type": "Brand", name: SITE_NAME },
        offers: {
          "@type": "Offer",
          url,
          price: String(priceNumber(pkg.price)),
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          seller: organizationRef,
        },
        // Only emitted when real rating data exists — never a made-up fallback.
        ...(hasRating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: String(pkg.rating),
                reviewCount: String(pkg.reviews),
                bestRating: "5",
                worstRating: "1",
              },
            }
          : {}),
      },
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: pkg.name,
        url,
        image: images[0],
        description: pkg.description,
        touristType: kind.isBike ? ["Adventure travellers", "Motorcycle riders"] : ["Adventure travellers"],
        provider: organizationRef,
        ...(itineraryItems.length
          ? {
              itinerary: {
                "@type": "ItemList",
                numberOfItems: itineraryItems.length,
                itemListElement: itineraryItems,
              },
            }
          : {}),
      },
      breadcrumbSchema(
        [
          { name: "Home", url: SITE_URL },
          { name: "Destinations", url: `${SITE_URL}/destinations` },
          { name: dest.name, url: destinationUrl(dest) },
          { name: pkg.name, url },
        ],
        `${url}#breadcrumb`
      ),
    ],
  };

  return { title, description, keywords, image: images[0] || DEFAULT_IMAGE, schema, url, type: "product" };
};
