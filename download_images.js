const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  'slider-4-slide-1-1920x678.jpg',
  'slider-4-slide-2-1920x678.jpg',
  'slider-4-slide-3-1920x678.jpg',
  'cta-1-368x420.jpg',
  'cta-2-368x420.jpg',
  'cta-3-368x420.jpg',
  'index-3-556x382.jpg',
  'product-big-1-600x366.jpg',
  'product-big-2-600x366.jpg',
  'user-1-118x118.jpg',
  'user-2-118x118.jpg',
  'user-3-118x118.jpg',
  'user-4-118x118.jpg',
  'parallax-1-1920x850.jpg',
  'gallery-image-1-270x195.jpg',
  'gallery-image-2-270x195.jpg',
  'gallery-image-3-270x195.jpg',
  'gallery-image-4-270x195.jpg',
  'gallery-image-5-270x195.jpg',
  'gallery-image-6-270x195.jpg',
  'gallery-image-7-270x195.jpg'
];

const dir = './public/images';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

let completed = 0;

images.forEach(img => {
  const url = `https://raw.githubusercontent.com/shivam13669/cliffhanger2/main/images/${img}`;
  const filePath = path.join(dir, img);
  
  https.get(url, (res) => {
    const file = fs.createWriteStream(filePath);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      completed++;
      console.log(`✓ Downloaded ${img} (${completed}/${images.length})`);
    });
  }).on('error', (err) => {
    console.error(`✗ Error downloading ${img}: ${err.message}`);
  });
});

console.log(`Starting download of ${images.length} images...`);
