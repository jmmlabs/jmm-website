const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const baseImagePath = path.join(__dirname, '../public/profile-ghibli.jpg');
const outputImagePath = path.join(__dirname, '../public/og-image.jpg');

const WIDTH = 1200;
const HEIGHT = 630;
const OVERLAY_HEIGHT = 80;
const OVERLAY_COLOR = { r: 24, g: 24, b: 27, alpha: 0.8 }; // #18181b with opacity
const TEXT = 'JMM LABS';
const FONT_SIZE = 54;

async function createOGImage() {
  const base = sharp(baseImagePath).resize(WIDTH, HEIGHT, { fit: 'cover' });
  const overlay = Buffer.from(
    `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="${HEIGHT-OVERLAY_HEIGHT}" width="${WIDTH}" height="${OVERLAY_HEIGHT}" fill="rgba(${OVERLAY_COLOR.r},${OVERLAY_COLOR.g},${OVERLAY_COLOR.b},${OVERLAY_COLOR.alpha})" />
      <text x="50%" y="${HEIGHT-OVERLAY_HEIGHT/2+FONT_SIZE/3}" text-anchor="middle" font-family="'Segoe UI', 'Arial', sans-serif" font-size="${FONT_SIZE}" fill="#fff" font-weight="bold">${TEXT}</text>
    </svg>`
  );
  await base
    .composite([{ input: overlay, top: 0, left: 0 }])
    .toFile(outputImagePath);
  console.log('OG image generated at', outputImagePath);
}

createOGImage().catch(console.error);
