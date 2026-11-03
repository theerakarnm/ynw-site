# ynw-site

Marketing site for YNW ("Your Next Wave") - a pre-launch landing page for an agentic chat app, rebuilt from a design-tool mockup into a production-ready Astro site with full SEO and a front-end integration to the YNW marketing worker (wishlist, attribution, events).

The design reference lives in `_reference/` (read-only, never deployed). `docs/ANALYSIS.md` documents the reference and every decision made while rebuilding it.

## Stack

- Astro 7, static output, TypeScript strict. No UI framework.
- Plain CSS with custom properties (design tokens). No Tailwind.
- One JS motion module (GSAP + ScrollTrigger/SplitText/DrawSVG/CustomEase/ScrollTo, npm, free license) for the scroll-driven story. All other behavior is small vanilla TypeScript modules.
- Self-hosted fonts (Geist variable, Geist Mono variable, IBM Plex Sans Thai) via Fontsource. No runtime font CDN requests.
- @astrojs/sitemap, hand-rolled SEO + JSON-LD components, astro:assets.

## Quickstart

```bash
npm install
cp .env.example .env   # optional: point PUBLIC_API_BASE at the marketing worker
npm run dev
```

Without `PUBLIC_API_BASE` the site runs against a built-in mock API (success, every error state and latency simulated) so the form is fully testable offline.

Requires Node >= 22.23.4 (Astro 7). With nvm: `nvm install 24 && nvm use 24`.

## Scripts

- `npm run dev` - dev server.
- `npm run build` - production build to `dist/`: `astro check` (TypeScript strict) + build + `dist/_headers` generation.
- `npm run preview` - serve the production build.
- `npm run check` - TypeScript + Astro diagnostics only.
- `npm run fonts:sync` - copy the self-hosted woff2 subsets from the Fontsource packages into `src/assets/fonts` (run after changing font deps).
- `python3 scripts/generate_assets.py` - regenerate favicons, PWA icons and the OG image (needs pillow + fonttools + brotli).

## Editing content

- All visible copy: `src/data/content.ts` (sections, hero, scenes, ticker, form strings, error messages, thanks/unsubscribed pages, privacy copy). The reference copy is the placeholder truth; items needing owner confirmation are marked `// CONFIRM`.
- Site-level config (brand, URL, SEO defaults, keywords, consent version, env wiring): `src/data/site.ts`.
- Design tokens (colors, type, spacing, radii, shadows, motion): `src/styles/tokens.css`. Components must reference tokens, never raw hex values.
- Layout/section CSS: `src/styles/global.css` (ordered, commented sections mirroring the reference).
- Never edit `_reference/`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PUBLIC_SITE_URL` | Canonical site origin (canonical URLs, sitemap, referral links). Default `https://example.com` until the owner sets the real domain. |
| `PUBLIC_API_BASE` | Marketing worker base URL, e.g. `https://api.example.com`. Unset in dev = mock API. |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key. Unset in dev = widget skipped, empty token sent (mock accepts). |

Copy `.env.example` to `.env` for local dev. Values are compile-time (`import.meta.env`); nothing is hardcoded anywhere - this is a hard rule (see AGENTS.md).

## Wishlist form integration (front-end only)

The page does not include a backend. It talks to the existing marketing worker:

- `POST {PUBLIC_API_BASE}/v1/wishlist` - email, `lang`, `consent_marketing`, `consent_version`, `turnstile_token`, honeypot `company`, `variant` (form source: `hero` / `closing`), `referred_by` (from `?ref=`), and the full `attribution` object. Success (`next: "check_email"`) swaps the form to the reference success pane ("On the wishlist ▪ time") and fires the hero wave crest. Errors (`invalid_email`, `consent_required`, `turnstile_failed`, `rate_limited`, network) render inline, `aria-live="polite"`, localized. A filled honeypot pretends success. An existing email shows the same success state (never revealed).
- Attribution (`src/lib/attribution.ts`): first touch wins, 30-day first-party cookie + sessionStorage mirror; captures utm_source/medium/campaign/content/term, referrer, landing path, fbclid, gclid, ttclid; `?ref=` maps to `referred_by`.
- Turnstile: script loads lazily on first focus of any email field; invisible/explicit render; token attached at submit.
- Events (`src/lib/events.ts`): `cta_click`, `form_view`, `form_start`, `form_submit` (+ `use_case_pick` from the chips) batched via `navigator.sendBeacon` to `POST /v1/events`, skipped when the user has Do Not Track enabled. The only cookie ever set is the attribution cookie.
- `/thanks?t=<profile_token>&pos=<n>&ref=<code>` - position number, copyable referral link `{SITE_URL}/?ref={code}`, and a skippable second-step form (name, role, "what do you need?") posting to `/v1/wishlist/profile` with the token. `noindex`.
- `/unsubscribed` - confirmation page, `noindex`.

The full API contract (source of truth, identical to the worker repo) is reproduced in `AGENTS.md` and typed in `src/lib/api.ts`.

## SEO checklist

| Item | Status |
| --- | --- |
| Unique title 50-60 chars, keyword-led | Done - "YNW - Agentic Chat App. One Chat for Life, Team, Business" (owner: confirm final brand line) |
| Meta description 140-160 chars | Done - reference copy, 147 chars |
| Canonical, charset, viewport, theme-color | Done |
| robots meta (index,follow,max-image-preview:large) on index + privacy; noindex on /thanks, /unsubscribed, /404 | Done |
| Open Graph + Twitter card, 1200x630 PNG with alt | Done - generated `public/og.png` |
| Favicon set, apple-touch-icon, manifest icons | Done - generated from the YNW lockup dot grid |
| hreflang | N/A - single language (en) at launch; Thai demo strings are content, not locale. Add when a th locale ships |
| One h1, logical h2/h3 | Done - one h1 (hero), one h2 per scene |
| Semantic landmarks, skip link, descriptive links | Done |
| JSON-LD: Organization, WebSite, WebPage, SoftwareApplication | Done. FAQPage/BreadcrumbList omitted - no matching visible content (flagged) |
| Sitemap (@astrojs/sitemap), excludes /thanks /unsubscribed /404 | Done |
| robots.txt with Sitemap line | Done |
| llms.txt | Done |
| Security/caching headers (CSP, XCTO, Referrer-Policy, Permissions-Policy) | Done - `public/_headers` (Cloudflare Pages) |
| Third-party scripts lazy | Done - Turnstile on first email focus; motion module deferred |
| Self-hosted fonts, preload critical weight | Done |
| Lighthouse mobile 95+, LCP < 2.5s, CLS < 0.05, INP < 200ms | Done - mobile 99/100/100/100 (LCP 0.8s, CLS 0), desktop 100s; see docs/VERIFICATION.md |

## Deploy (Cloudflare Pages)

1. Push the repo; create a Pages project (framework preset "Astro", build `npm run build`, output `dist`).
2. Set env vars `PUBLIC_SITE_URL`, `PUBLIC_API_BASE`, `PUBLIC_TURNSTILE_SITE_KEY` for production and preview.
3. `public/_headers` ships CSP, XCTO, Referrer-Policy, Permissions-Policy and immutable caching for `_astro/*`. CSP `connect-src` allows only `PUBLIC_API_BASE` and `https://challenges.cloudflare.com`; the headers file is generated with the env values at build time via a postbuild step if the origin differs, otherwise keep them in sync manually.

## Deviations from the reference

Full rationale in `docs/ANALYSIS.md` ("Rebuild decisions"), evidence in `docs/VERIFICATION.md`. Summary:

1. Consent checkbox added to both wishlist forms (required by the API contract; the mockup has none).
2. Turnstile target + lazy loader added (loads on first email focus; skipped in mock mode).
3. `/privacy` page created - the mockup links to a Privacy page that is not in the zip; copy is placeholder (CONFIRM).
4. Use-case chips post `use_case_pick` to `/v1/events` (the contract has no dedicated use-case endpoint).
5. Fonts self-hosted via Fontsource subsets; the mockup hotlinked Google Fonts.
6. The design-tool runtime (react dev builds, support.js) and ~60% of unused design-system CSS were dropped; motion.js ported to typed TS on npm GSAP.
7. OG image, favicon set and manifest generated from the reference dot-grid geometry (mockup ships none).
8. Nav lockup is a home link (mockup: plain image); visuals unchanged.
9. The no-JS fallback copy tells visitors to email instead of the missing static form endpoint. fallback copy tells visitors to email instead of the missing static form endpoint.

## Verification summary

- `npm run build`: 0 errors, 0 warnings.
- Visual: reference vs clone at 360/768/1024/1440/1920 match (pin + story modes); details in docs/VERIFICATION.md.
- Functional: 21/21 UX-state tests, 18/18 API-contract tests, profile payload verified.
- Lighthouse: mobile 99/100/100/100, desktop 100/100/100/100.
