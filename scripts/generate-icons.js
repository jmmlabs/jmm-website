const sharp = require('sharp');
const path = require('path');

const baseImagePath = path.join(__dirname, '../public/profile-ghibli.jpg');
const faviconPngPath = path.join(__dirname, '../public/favicon-32.png');
const appleIconPath = path.join(__dirname, '../public/apple-touch-icon.png');

async function generateFaviconPng() {
  // Favicon: 32x32 png
  await sharp(baseImagePath)
    .resize(32, 32)
    .toFile(faviconPngPath);
}

async function generateAppleIcon() {
  // Apple touch icon: 180x180 png
  await sharp(baseImagePath)
    .resize(180, 180)
    .toFile(appleIconPath);
}

(async () => {
  await generateFaviconPng();
  await generateAppleIcon();
  console.log('favicon-32.png and apple-touch-icon.png generated from profile-ghibli.jpg');
})();
