import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';

const DIR = 'src/assets/images';
const MAX_SIZE = 2400;
const QUALITY = 92;

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith('.png'));

console.log(`Found ${files.length} PNG files\n`);

for (const file of files) {
  const inputPath = join(DIR, file);
  const { name } = parse(file);
  const outputPath = join(DIR, `${name}.jpg`);

  const beforeStat = await stat(inputPath);
  const beforeMB = (beforeStat.size / 1024 / 1024).toFixed(1);

  const image = sharp(inputPath);
  const meta = await image.metadata();

  const isWider = meta.width >= meta.height;
  const resizeOpts = isWider
    ? { width: Math.min(meta.width, MAX_SIZE) }
    : { height: Math.min(meta.height, MAX_SIZE) };

  await image.resize(resizeOpts).jpeg({ quality: QUALITY }).toFile(outputPath);

  const afterStat = await stat(outputPath);
  const afterMB = (afterStat.size / 1024 / 1024).toFixed(1);

  console.log(`${file}`);
  console.log(`  ${meta.width}x${meta.height} → ${resizeOpts.width || '?'}x${resizeOpts.height || '?'} (fit)`);
  console.log(`  ${beforeMB} MB → ${afterMB} MB\n`);
}

console.log('Done.');
