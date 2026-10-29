# Stories by Foot — SEO Guide (Hinglish)

Is patch me **website ka design / features / backend change nahi hua**. Sirf SEO layer badli hai
(meta tags, structured data, sitemap, robots, prerender, headers).

---

## 1. Deploy kaise karein (5 minute)

1. Is zip ki files apne project me **same folder structure** ke saath copy/replace kar do.
2. Local me ek baar check karo:
   ```bash
   pnpm build
   ```
   Last me ye dikhna chahiye: `🎉 Static HTML prerendering completed and verified.`
   (Agar koi page ka SEO galat hua to build khud fail ho jayega aur batayega kaunsa page.)
3. Git push karo → Vercel auto-deploy karega.
4. Deploy ke baad browser me check karo:
   - `https://www.storiesbyfoot.com/sitemap.xml` (45 URLs dikhne chahiye)
   - `https://www.storiesbyfoot.com/robots.txt`
   - Kisi bhi package page par **Right-click → View Page Source** → `<title>`, canonical, JSON-LD dikhna chahiye.

---

## 2. Google ko "index karo" bolne ka tareeka (ye aapko khud karna hoga)

Code se Google ko force nahi kiya ja sakta; Google Search Console se hi hota hai.

1. https://search.google.com/search-console → **Add property → Domain** → `storiesbyfoot.com`
   → DNS TXT record se verify karo (Vercel/GoDaddy DNS me add).
2. **Sitemaps** → `sitemap.xml` submit karo.
3. **URL Inspection** me ye pages paste karke **Request Indexing** dabao (daily limit hoti hai, pehle ye):
   - `https://www.storiesbyfoot.com/`
   - `/destinations`
   - `/destinations/ladakh`
   - `/destinations/ladakh/khardungla-changla-loop`
   - `/destinations/ladakh/trans-himalayan-ride`
   - `/destinations/ladakh/ultimate-umlingla`
4. Bing Webmaster Tools (https://www.bing.com/webmasters) → "Import from Google Search Console".
5. **Vercel → Domains**: check karo ki `storiesbyfoot.com` (bina www) → `www.storiesbyfoot.com` par **redirect** ho raha hai
   (taaki Google ko 2 alag sites na dikhein).
6. Rich Results Test (https://search.google.com/test/rich-results) me ek package URL daalke dekho — Product + Breadcrumb detect hona chahiye.

> Realistic timeline: pages index hone me **2–14 din**. "ladakh bike trip" jaisi bade keywords par top 10 aane me
> **3–6+ mahine** lagte hain aur uske liye backlinks + content chahiye (section 5). Koi bhi isko guarantee nahi kar sakta.

---

## 3. Maine kya fix kiya (audit me jo problems mili)

| # | Problem (pehle) | Ab |
|---|---|---|
| 1 | **Homepage iframe me hai**, usme H1/description/canonical nahi tha → Google ko homepage ka content nahi mil raha tha | Prerendered homepage me H1 + saare destinations/packages ke crawlable links; iframe file par canonical → `/` |
| 2 | Har page par **2 meta description** (index.html wali + page wali) | Prerender ab purane tags hata ke ek hi set daalta hai; build verify karta hai |
| 3 | Blog title me `"` quotes se **meta tag toot raha tha** (escape nahi tha) | Sab kuch HTML-escape hota hai |
| 4 | Sab packages ko "**bike trip / motorcycle tour**" likha tha — Bhutan, Nepal, Chadar trek, Meghalaya bike nahi hain | Sirf *Two-wheeler* packages "bike trip"; baaki "trek / tour package / rafting" (category data se) |
| 5 | Titles 80–107 characters (Google kaat deta hai), descriptions 250+ chars ya beech me kati hui | Titles ≤ 70, descriptions ≤ 160, kabhi beech me nahi katti |
| 6 | Titles me **"2026"** hardcoded (aaj Oct 2026 hai) | Auto season-year: Oct ke baad **2027** (`seoShared.js` me override ka option) |
| 7 | `og:image` khaali / SVG — WhatsApp, Facebook preview nahi dikhta | Naya `public/og-default.jpg` (1200×630) |
| 8 | `rating 4.8 / 100 reviews` **fallback me jhootha** daal diya jata tha | Fallback hata diya — sirf data me jo hai wahi |
| 9 | Package schema me `Product` + `Offer` tha, **BreadcrumbList nahi** | Breadcrumb + CollectionPage + ItemList + TravelAgency (phone, address, logo) |
| 10 | Destinations page ka schema **user ke search/filter ke saath badalta tha** | Ab data se fixed |
| 11 | Galat package URL (`/destinations/ladakh/xyz`) apne aap ko canonical bana leta tha → duplicate pages | Canonical hamesha asli package URL |
| 12 | `robots.txt` me `Googlebot` ka alag group tha → `*` ke rules Googlebot ignore karta | Ek hi `*` group |
| 13 | `/dashboard`, `/admin`, `/booking/*` indexable the | `X-Robots-Tag: noindex` header (vercel.json) |
| 14 | Galat URL par 200 + homepage title (soft-404) | 404 page `noindex` |
| 15 | `/x` aur `/x/` dono chalte the | `trailingSlash: false` |
| 16 | Sitemap me har build par lastmod = aaj; images nahi | Stable lastmod + Google Images ke liye `<image:image>` |
| 17 | `SearchAction` schema ek aisi URL ko point karta tha jo exist nahi karti | Hata diya |

**Ab naya destination/package `destinations.ts` me add karoge to** sitemap, prerender, title, description, schema —
sab **apne aap** ban jayenge.

---

## 4. Keyword map (kaunsa page kis search ko target karta hai)

| Page | Primary keywords |
|---|---|
| `/` | ladakh bike trip, leh ladakh bike trip package 2027, ladakh bike tour packages, stories by foot |
| `/destinations/ladakh` | ladakh bike trip packages, leh ladakh tour package, ladakh bike trip cost, best time to visit ladakh |
| `/…/khardungla-changla-loop` | 6 days ladakh bike trip, khardung la bike trip, pangong nubra bike trip |
| `/…/indias-last-turn` | 7 days ladakh bike trip, turtuk bike trip, hundar diskit pangong trip |
| `/…/migla-throne-ride` | hanle bike trip, mig la pass bike trip, 8 days ladakh bike trip |
| `/…/ultimate-umlingla` | umling la bike trip, tso moriri hanle bike trip |
| `/…/trans-himalayan-ride` | chandigarh to ladakh bike trip, srinagar leh manali bike trip, 13 days ladakh bike trip |
| `/destinations/zanskar` | zanskar tour package, chadar trek package, zanskar rafting |
| `/destinations/tawang · bhutan · nepal · meghalaya` | "<destination> tour package" + package names |

> **Sach:** `<meta name="keywords">` ko Google **ignore** karta hai. Ranking asli me title, H1, page ka visible text,
> internal links, schema aur backlinks se aati hai — isi par kaam kiya hai.

---

## 5. Ranking badhane ke liye jo cheezein code se nahi hoti (aapko karni hongi)

1. **Google Business Profile** banao (Category: *Travel agency / Tour operator*, address SAS Nagar, phone, photos).
   "travel agency near me / Mohali" jaisi local searches ke liye sabse bada boost.
2. **Reviews**: har customer se Google Business Profile par review maango (10–20 reviews bhi farq daalte hain).
3. **Backlinks**: TripAdvisor, Justdial, Sulekha, travel directories, Instagram bio + YouTube description me website link,
   Royal Enfield/rider communities, travel bloggers ko collab.
4. **Blog**: har mahine 2 posts. Easy winners (jinki search bahut hoti hai):
   - "Ladakh bike trip cost 2027 (full breakdown)"
   - "Manali to Leh vs Srinagar to Leh: which route is better"
   - "Best time for Ladakh bike trip month by month"
   - "Umling La pass: height, permit, road condition"
   - "Ladakh bike trip for beginners / for couples / for women riders"
   - "Ladakh inner line permit: how to apply"
   Naya blog slug `src/lib/blogSeo.js` me add karo — sitemap aur prerender automatic ho jayega.
5. **Spiti aur Sikkim**: homepage par inka naam hai par in ke pages nahi hain. "Spiti bike trip" bahut zyada search hota hai —
   `destinations.ts` me ek Spiti destination add karne se page + SEO apne aap ban jayega.

---

## 6. ⚠️ Cheezein jo AAPKO verify karni hain

1. **Ratings/Reviews** (`rating: 4.9, reviews: 428` etc. `destinations.ts` me): ye Google ko star-rating ke liye jaate hain.
   Agar ye **asli customer reviews** nahi hain to Google penalty (manual action) laga sakta hai. Asli hain to theek; nahi to bata do, main isko band kar dunga.
2. **Available dates**: Ladakh ke saare packages ki dates **18 Oct 2026 par khatam** ho gayi hain. 2027 ki dates add karo,
   warna Google/visitor ko lagega trip band hai (aur title me ab 2027 aa raha hai).
3. **Zanskar** ka `bestTime: "July – September"` Chadar Frozen River Trek par lagu nahi hota (wo winter trek hai) — data theek kar lo.
4. Blog posts ke andar abhi "2026" likha hai ("Don't let 2026 pass you by") — content 2027 ke liye update karo.

---

## 7. Speed + links (ho chuka hai)

- `App.tsx`: homepage iframe ab **sirf "/" par** load hota hai (pehle har page par hidden load hota tha). Home par wapas aane par iframe dobara load hoga, jaise fresh visit me hota hai.
- `public/cliffhanger/images/`: 14 heavy images compress hui (same file names/format): **~10 MB bachat, quality high (q92)**.
- Destinations cards me pehle se real `<Link>` tha; ab uska anchor text/aria-label package ke naam ke saath hai.
- Chadar trek jaise pages ke bekaar meta keywords hata diye, blog keywords se "2026" hataya.

**Abhi bhi baaki (content/off-page):** blog posts, Google Business Profile, backlinks, Spiti/Sikkim pages (inke liye asli package details chahiye).

---

## 8. Naya content + off-page (latest update)

**7 naye blog posts** (long-tail keywords ke liye) — `src/lib/blogPosts.js`:
`ladakh-bike-trip-cost` · `manali-to-leh-vs-srinagar-to-leh-bike-trip` · `best-time-for-ladakh-bike-trip` ·
`ladakh-inner-line-permit-guide` · `ladakh-bike-trip-for-beginners` · `spiti-valley-bike-trip-guide` · `sikkim-travel-guide-nathu-la-gangtok`

- Cost post ki table **seedhe `destinations.ts` se banti hai**, to price badalne par apne aap update hoti hai.
- Permit / Sikkim posts me facts web par verify karke likhe hain, par rules badalte rehte hain — **har season refresh karo** (post me "official portal check karo" likha hai).
- Posts 260–490 words ke hain. Competitive keywords ke liye inme apni **photos + asli trip experience** jodo, tab aur strong honge.
- Naya post add karna ho to bas `blogPosts.js` me ek object jodo — sitemap + prerender + blog listing sab automatic.

**Blog page cleanup:** "recent" section me lorem-ipsum placeholder cards the (fake URLs par jaate the) — ab asli posts hain. Fake "Recommended" section hata diya.
Unknown `/blog/xyz` URL ab `noindex` hai (pehle wo default guide ki duplicate copy dikhata tha).

**Bing/Yandex ke liye:** `node scripts/indexnow.cjs` (deploy ke baad chalao). Google ke liye Search Console hi tareeka hai.

**Off-page kit:** `SEO_OFFPAGE_KIT.md` — Google Business Profile ka ready text, review request messages, directories, outreach emails, 15 URLs ki indexing list.

---

## 9. Audit ke baad ke fixes (latest)

- Rendered `/` aur `/destinations` par ab H1 hai (screen-reader/crawler section, design same). Home par destinations + packages ke crawlable links bhi hain.
- Prerendered HTML me har page par site-wide nav; blog posts home, `/blog` aur ek-doosre se linked (koi orphan page nahi).
- Blog posts ka Article schema ab prerender me bhi hai (client ke saath same builder). `datePublished` ke liye `blogSeo.js` / `blogPosts.js` me asli `date` daalo — maine nahi banayi.
- Saare titles ≤ 64 characters; descriptions 109–160.
- Package gallery ke alt ab descriptive ("<Package> – <Destination> – photo 2"); iframe title descriptive; homepage ki below-the-fold images lazy-load.
- WebP/portrait images ki jagah social preview me 1200×630 JPG.

**Dhyan do:** homepage iframe me template ki **stock photos** (balloon flights, beach holidays, resort pool) aur "Beach Holidays / Other Tours" jaise sections hain. Ye Himalayan business se match nahi karte. Inhe hatana ya apni photos se badalna design ka faisla hai, isliye maine nahi chheda.

---

## 10. Files jo badli / nayi hain

```
index.html                          (base meta, preconnect, default og)
vercel.json                         (noindex headers, cache, trailingSlash)
public/robots.txt
public/sitemap.xml                  (build par auto-regenerate hota hai)
public/og-default.jpg               (NEW)
public/cliffhanger/index.html       (canonical + description add)
scripts/prerender.cjs               (rewrite)
scripts/generate-sitemap.cjs        (rewrite)
scripts/seo-data.cjs                (NEW)
src/lib/seoShared.js (+ .d.ts)      (NEW — SEO engine)
src/lib/blogSeo.js   (+ .d.ts)      (NEW — blog SEO)
src/components/SEO.tsx              (upgrade)
src/App.tsx (iframe sirf home par)
src/lib/blogPosts.js (+ .d.ts)   (NEW — 7 blog posts)
scripts/indexnow.cjs · public/<key>.txt  (NEW — Bing/Yandex)
SEO_OFFPAGE_KIT.md                   (NEW)
src/pages/Blog.tsx                   (placeholder cards → asli posts)
src/pages/Index.tsx · Destinations.tsx · DestinationDetail.tsx · BlogPost.tsx · NotFound.tsx
                                    (sirf SEO props wale blocks; UI same)
```
