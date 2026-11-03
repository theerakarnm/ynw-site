/**
 * Generates dist/_headers for Cloudflare Pages with env-aware CSP
 * (connect-src gets PUBLIC_API_BASE + the Turnstile origin).
 * Runs automatically after `npm run build`.
 */
import { mkdir, writeFile } from "node:fs/promises";
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

const csp = [
  "default-src 'self'",
  "script-src 'self' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' https://challenges.cloudflare.com${apiBase ? ` ${apiBase}` : ""}`,
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
