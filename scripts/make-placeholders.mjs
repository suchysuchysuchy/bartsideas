// Jednorazowy generator ciemnych placeholderów pod portfolio/sklep.
// Uruchomienie: node scripts/make-placeholders.mjs
// Po wgraniu prawdziwych zdjęć pliki z src/assets/images/placeholders/ można usunąć.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'src/assets/images/placeholders';
await mkdir(OUT, { recursive: true });

// Subtelny kierunkowy blask na zielonkawej czerni — spójny z estetyką prac.
const svg = (w, h, cx, cy, tone) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="${cx}" cy="${cy}" r="0.9">
      <stop offset="0%" stop-color="${tone}"/>
      <stop offset="55%" stop-color="#0d120e"/>
      <stop offset="100%" stop-color="#070a08"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
</svg>`;

const specs = [
  ['makro-01', 2048, 1365, '30%', '35%', '#1d2b20'],
  ['makro-02', 1365, 2048, '60%', '25%', '#22301f'],
  ['makro-03', 2048, 1365, '70%', '55%', '#1a2a24'],
  ['makro-04', 1365, 2048, '40%', '65%', '#242e1e'],
  ['makro-05', 2048, 1365, '25%', '60%', '#1c2c1c'],
  ['makro-06', 1365, 2048, '55%', '40%', '#203026'],
  ['ludzie-01', 1365, 2048, '50%', '30%', '#2a2a22'],
  ['b2b-01', 2048, 1365, '50%', '45%', '#26261e'],
  ['b2b-02', 2048, 1365, '35%', '50%', '#222a26'],
  ['b2b-03', 2048, 1365, '65%', '40%', '#2c2820'],
];

for (const [name, w, h, cx, cy, tone] of specs) {
  await sharp(Buffer.from(svg(w, h, cx, cy, tone)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name}.jpg ${w}x${h}`);
}
