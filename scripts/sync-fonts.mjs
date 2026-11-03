// Copies the self-hosted font files (Fontsource packages) into src/assets/fonts.
// Run `npm run fonts:sync` after changing fonts in package.json. Provenance: see src/styles/tokens.css.
import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'src/assets/fonts');

const files = [
  ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', 'geist-latin-wght-normal.woff2'],
  ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2', 'geist-mono-latin-wght-normal.woff2'],
  ['@fontsource/ibm-plex-sans-thai/files/ibm-plex-sans-thai-thai-400-normal.woff2', 'ibm-plex-sans-thai-thai-400-normal.woff2'],
  ['@fontsource/ibm-plex-sans-thai/files/ibm-plex-sans-thai-latin-400-normal.woff2', 'ibm-plex-sans-thai-latin-400-normal.woff2'],
];

await mkdir(outDir, { recursive: true });
for (const [src, dest] of files) {
  await copyFile(join(root, 'node_modules', src), join(outDir, dest));
  console.log('copied', dest);
}
