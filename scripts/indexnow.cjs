/**
 * Tells Bing, Yandex, DuckDuckGo-partners etc. (IndexNow) about every URL in sitemap.xml.
 * Run AFTER a deploy:   node scripts/indexnow.cjs        (add --dry to only print the URLs)
 *
 * Note: Google does NOT support IndexNow. For Google use Search Console (see SEO_GUIDE.md).
 * The key file (public/<key>.txt) must be live on the site before running this.
 */
const fs = require('fs');
const path = require('path');

const HOST = 'www.storiesbyfoot.com';
const publicDir = path.resolve(__dirname, '../public');
const keyFile = fs.readdirSync(publicDir).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) { console.error('❌ IndexNow key file not found in /public'); process.exit(1); }
const key = keyFile.replace('.txt', '');

const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
console.log(`Found ${urlList.length} URLs in sitemap.xml`);
if (process.argv.includes('--dry')) { console.log(urlList.join('\n')); process.exit(0); }

fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
})
  .then(async (res) => {
    console.log(`IndexNow response: ${res.status} ${res.statusText}`);
    console.log(res.ok ? '✅ Submitted (200/202 = accepted).' : '⚠️ Not accepted — make sure the site is deployed and the key file is reachable.');
  })
  .catch((e) => { console.error('❌ Request failed:', e.message); process.exit(1); });
