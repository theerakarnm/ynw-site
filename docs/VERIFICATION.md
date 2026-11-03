# VERIFICATION.md

Final verification report for the ynw-site rebuild. Generated 2026-11-03 against the reference mockup in `_reference/`.

## Build

- `npm run build` (astro check + astro build + headers): 0 errors, 0 warnings.
- Output: 5 pages (/, /thanks/, /privacy/, /unsubscribed/, /404.html), sitemap-index.xml + sitemap-0.xml, robots.txt, llms.txt, manifest.webmanifest, `_headers`.
- Payload: index.html 39KB uncompressed; one deferred module script for forms/attribution; motion (GSAP + plugins) is a separate lazy chunk that loads on browser idle; one external stylesheet; 4 woff2 subsets (~82KB total, Geist latin preloaded).

## Visual fidelity (reference vs clone, Playwright, Chrome 156)

Captured at 360 / 768 / 1024 / 1440 / 1920 px, full page and mid-scroll per scene.

- Motion branch parity: pin mode at >= 1024px, story mode below, verified via `data-motion` on both pages.
- Page heights within 0.5-0.9% of the reference at every width; the residual delta is the added consent line and noscript notice.
- Verified visually: hero (glow, LED wave canvas, giant wordmark, headline mask state), ticker, scenes 01-07 mid-scroll states (rail statuses, seat cards + occupant chips, plan/tool status flips, backstage split, approval glow + ladder, MCP diagram + receipt, network cards), closing card, contours, footer, mobile rail bar and sticky story layout.

Two fidelity bugs were found and fixed during this round (see git history "verification round 1"): a dropped global `box-sizing: border-box` rule and a missing motion boot call.

## Functional tests (Playwright against the mock API)

UX states - 21/21 passed: invalid email message + `aria-invalid`, consent-required message, submitting state with disabled button, success state with time, chip lock behavior, honeypot pretend-success with zero network calls, /thanks position + referral link + token wiring, profile save and skip, no-JS fallback (visible noscript message, valid HTML form, content readable).

API contract - 18/18 passed (client exercised against intercepted endpoints): payload shape (email, lang, consent_marketing, consent_version, turnstile_token, company, variant, referred_by, attribution with all ten fields), success mapping, and every error mapping (invalid_email, consent_required, turnstile_failed, rate_limited, network) to localized inline messages. `POST /v1/wishlist/profile` payload verified: `{ token, name?, role?, use_case_text? }`.

## Lighthouse (Chrome headless, production build, astro preview)

| Category | Mobile | Desktop |
| --- | --- | --- |
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Mobile: FCP 0.8s, LCP 0.8s, CLS 0, TBT 120ms, Speed Index 1.0s. Desktop: FCP 0.2s, LCP 0.2s, CLS 0, TBT 40ms. All targets met (95+, LCP < 2.5s, CLS < 0.05, INP/TBT well under budget).

## Static SEO audit

- Every page: exactly one h1, unique title, description, canonical, robots meta (`noindex, follow` on /thanks, /unsubscribed, /404), Organization/WebSite/WebPage JSON-LD (+SoftwareApplication on the landing page), OG/Twitter tags with the 1200x630 PNG.
- JSON-LD parses cleanly on all pages; sitemap excludes /thanks, /unsubscribed, /404; robots.txt carries the Sitemap line; no images missing alt text; no broken internal links (all built files resolve).
- CSP via generated `_headers`: connect-src limited to the site origin, `PUBLIC_API_BASE` and the Turnstile origin; immutable caching for `_astro/*`.

## Owner follow-ups (CONFIRM items)

1. Set real env values: `PUBLIC_SITE_URL`, `PUBLIC_API_BASE`, `PUBLIC_TURNSTILE_SITE_KEY` (Turnstile is untested against Cloudflare without a real key; the widget path is coded per contract - explicit render, dark theme, lazy load, expiry reset).
2. Confirm target keywords and the final title line (current: keyword-derived, 57 chars).
3. Replace /privacy placeholder copy and the contact address in `src/data/content.ts` (marked CONFIRM), and set the legal entity name in `src/data/site.ts`.
4. Bump `consentVersion` in `src/data/site.ts` if consent wording changes.

## Production deploy (2026-11-03)

- Target: Cloudflare Workers (assets-only, worker `ynw-site`), custom domain `https://ynw.app`.
- Live checks: 200 on /, /robots.txt, /sitemap-index.xml, /llms.txt, /manifest.webmanifest, /thanks; 404 page served for unknown paths; security headers (CSP, XCTO, Referrer-Policy, Permissions-Policy, HSTS) present on every response; `_astro/*` served immutable.
- Canonical, og:url, robots.txt Sitemap line and sitemap URLs all read `https://ynw.app`.
- Fix shipped with the deploy: `astro.config.mjs` and `scripts/build-headers.mjs` now fall back to `.env` for `PUBLIC_SITE_URL` / `PUBLIC_API_BASE` (Astro does not load `.env` at config-evaluation time, and the postbuild script is plain node; without the fallback the sitemap kept `example.com`).
- Pending owner input: real `PUBLIC_TURNSTILE_SITE_KEY` (form cannot pass the real worker without it) and confirmation of `PUBLIC_API_BASE=https://api.ynw.app`.
