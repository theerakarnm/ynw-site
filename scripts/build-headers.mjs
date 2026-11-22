/**
 * Generates dist/_headers for Cloudflare Pages with env-aware CSP
 * (connect-src gets PUBLIC_API_BASE + the Turnstile origin).
 * Runs automatically after `npm run build`.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

// process.env wins; fall back to .env (Astro loads it for the build, plain node does not).
let apiBase = (process.env.PUBLIC_API_BASE ?? "").replace(/\/$/, "");
if (!apiBase) {
  try {
    const { readFileSync } = await import("node:fs");
    const dotenv = readFileSync(join(root, ".env"), "utf8");
    const match = dotenv.match(/^PUBLIC_API_BASE=(.*)$/m);
    if (match) apiBase = match[1].trim().replace(/\/$/, "");
  } catch {
    /* no .env - dev default */
  }
}

// Astro only writes the root 404 as 404.html; Cloudflare serves the nearest 404.html up the path,
// so /en/* needs dist/en/404.html as well.
await rename(join(dist, "en", "404", "index.html"), join(dist, "en", "404.html"));
await rm(join(dist, "en", "404"), { recursive: true });

// The locale boot script is inline, so CSP allows exactly its hash; every page must carry the same text.
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => (entry.isDirectory() ? htmlFiles(join(dir, entry.name)) : entry.name.endsWith(".html") ? [join(dir, entry.name)] : [])),
  );
  return nested.flat();
}

async function localeBootHash() {
  const hashes = new Set();
  for (const file of await htmlFiles(dist)) {
    const match = (await readFile(file, "utf8")).match(/<script id="locale-boot"[^>]*>([\s\S]*?)<\/script>/);
    if (!match) throw new Error(`No locale-boot script in ${file}`);
    hashes.add(createHash("sha256").update(match[1]).digest("base64"));
  }
  if (hashes.size !== 1) throw new Error(`Expected one locale-boot script across pages, found ${hashes.size}`);
  return [...hashes][0];
}

const bootHash = await localeBootHash();

const csp = [
  "default-src 'self'",
  `script-src 'self' 'sha256-${bootHash}' https://challenges.cloudflare.com https://static.cloudflareinsights.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com${apiBase ? ` ${apiBase}` : ""}`,
  "frame-src https://challenges.cloudflare.com",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
].join("; ");

const headers = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: ${csp}

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;
await mkdir(dist, { recursive: true });
await writeFile(join(dist, "_headers"), headers);
console.log("wrote dist/_headers");
