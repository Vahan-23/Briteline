import { mkdirSync } from "node:fs";
import sharp from "sharp";

const logoPath = "public/images/logo.png";
const { data, info } = await sharp(logoPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const y0 = 136;
const y1 = 295;
let minX = info.width;
let maxX = 0;

for (let y = y0; y <= y1; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    if (data[(y * info.width + x) * 4 + 3] > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
    }
  }
}

const mark = await sharp(logoPath)
  .extract({
    left: minX,
    top: y0,
    width: maxX - minX + 1,
    height: y1 - y0 + 1,
  })
  .png()
  .toBuffer();

mkdirSync("src/app", { recursive: true });

await sharp(mark)
  .resize(440, 440, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: 36,
    bottom: 36,
    left: 36,
    right: 36,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile("src/app/icon.png");

await sharp(mark)
  .resize(148, 148, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .extend({
    top: 16,
    bottom: 16,
    left: 16,
    right: 16,
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toFile("src/app/apple-icon.png");

const overlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#012A55" fill-opacity="0.45"/>
  </svg>`,
);

const logo = await sharp(logoPath).trim().resize({ height: 118 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp("public/images/alcove-shelving-led-2.jpg")
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([
    { input: overlay, top: 0, left: 0 },
    {
      input: logo,
      top: 48,
      left: Math.round((1200 - (logoMeta.width ?? 0)) / 2),
    },
  ])
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("public/og.jpg");

const trimmed = await sharp(logoPath).trim().png().toBuffer();
const trimmedMeta = await sharp(trimmed).metadata();
await sharp(trimmed).png().toFile("public/images/logo-trimmed.png");

console.log("wrote icon, apple-icon, og.jpg, logo-trimmed.png", {
  minX,
  y0,
  maxX,
  y1,
  logoMeta,
  trimmedMeta,
});
