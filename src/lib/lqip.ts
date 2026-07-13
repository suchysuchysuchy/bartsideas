import sharp from 'sharp';

/**
 * Miniaturowy podgląd (LQIP) jako data URI — zero dodatkowych żądań HTTP.
 * Liczone raz na obraz podczas builda, wynik trzymany w pamięci procesu.
 */
const cache = new Map<string, Promise<string | null>>();

export function lqip(image: ImageMetadata): Promise<string | null> {
  const fsPath = (image as unknown as { fsPath?: string }).fsPath;
  if (!fsPath) return Promise.resolve(null);
  let entry = cache.get(fsPath);
  if (!entry) {
    entry = sharp(fsPath)
      .resize(16)
      .webp({ quality: 30 })
      .toBuffer()
      .then((buf) => `data:image/webp;base64,${buf.toString('base64')}`)
      .catch(() => null);
    cache.set(fsPath, entry);
  }
  return entry;
}
