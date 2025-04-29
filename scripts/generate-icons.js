const sharp = require('sharp');
const path = require('path');
const pngToIco = require('png-to-ico');

const baseImagePath = path.join(__dirname, '../public/fullprofpic.jpg');
const faviconPngPath = path.join(__dirname, '../public/favicon-32.png');
const favicon16PngPath = path.join(__dirname, '../public/favicon-16.png');
const faviconIcoPath = path.join(__dirname, '../public/favicon.ico');
const appleIconPath = path.join(__dirname, '../public/apple-touch-icon.png');

async function generateFaviconPng() {
  // Favicon: 32x32 png
  await sharp(baseImagePath)
    .resize(32, 32)
    .toFile(faviconPngPath);
}

async function generateFavicon16Png() {
  // Favicon: 16x16 png
  await sharp(baseImagePath)
    .resize(16, 16)
    .toFile(favicon16PngPath);
}

async function generateFaviconIco() {
  // Favicon: .ico file (combine 16x16 and 32x32)
  await sharp(baseImagePath)
    .resize(32, 32)
    .toFile(faviconPngPath);
  await sharp(baseImagePath)
    .resize(16, 16)
    .toFile(favicon16PngPath);
  await pngToIco([
    favicon16PngPath,
    faviconPngPath
  ]).then(buf => {
    const fs = require('fs');
    fs.writeFileSync(faviconIcoPath, buf);
  });
}

async function generateAppleIcon() {
  // Apple touch icon: 180x180 png
  await sharp(baseImagePath)
    .resize(180, 180)
    .toFile(appleIconPath);
}

(async () => {
  await generateFaviconPng();
  await generateFavicon16Png();
  await generateFaviconIco();
  await generateAppleIcon();
  console.log('favicon-16.png, favicon-32.png, favicon.ico, and apple-touch-icon.png generated from fullprofpic.jpg');
})();
