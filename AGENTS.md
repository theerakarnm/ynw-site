# AGENTS.md

Conventions for any coding agent working in this repo. Read `docs/ANALYSIS.md` for the reference analysis and decision log. `_reference/` is read-only; never edit, copy from it into the site only via deliberate ports.

## Commands

- `npm run dev` - dev server against the local marketing worker (`.env.development`: `http://localhost:8787` + Turnstile test key). Start `npm run dev` in `../ynw-marketing-worker` first, or set `PUBLIC_API_BASE=` in `.env.development.local` for the built-in mock.
- `npm run build` - typecheck + production build to `dist/` (also regenerates `dist/_headers` with env-aware CSP; needs Node >= 22.23.4).
- `npm run preview` - serve the build.
- `npm run check` - `astro check` (TypeScript strict + Astro diagnostics).
- `npm run deploy` - production build (canonical origin from shell env or `.env`) + `wrangler deploy` (assets-only worker on ynw.app, config in `wrangler.jsonc`).
Commit small and often; one logical change per commit (docs, tokens, layout, sections, integration, pages, SEO, fixes). Never one giant commit.

## Structure map

- `src/pages/` - one file per route (`index`, `thanks`, `unsubscribed`, `privacy`, `404`). Pages compose sections and set per-page SEO props.
- `src/layouts/BaseLayout.astro` - the only layout: `<html>`, head via `SEO.astro` + `JsonLd.astro`, font preloads, skip link, global styles, page scripts.
- `src/components/seo/` - `SEO.astro` (all meta), `JsonLd.astro` (schema.org graph).
- `src/components/sections/` - page sections in reference order (`SiteNav`, `ProgressRail`, `Hero`, `CapabilityTicker`, `SceneAvatars`, `SceneAgents`, `SceneBackstage`, `SceneApprovals`, `SceneReceipts`, `SceneWorkspace`, `SceneWishlist`, `SiteFooter`).
- `src/components/ui/` - primitives reused inside sections (`Avatar`, `Icon`, `LogoLockup`, `LogoWordmark`).
- `src/components/forms/WishlistForm.astro` - one form component used twice (hero + closing), plus the client module `src/scripts/wishlist-form.ts`.
- `src/data/site.ts` - site config: brand, canonical URL, SEO defaults, keywords, consent version, env plumbing.
- `src/data/content.ts` - ALL copy. No user-visible string may live in a component or layout.
- `src/styles/tokens.css` - design tokens only (custom properties on `:root` + `@font-face`).
- `src/styles/global.css` - base + all component/section CSS, ordered like the page, commented by section.
- `src/lib/` - `api.ts` (typed marketing-worker client + dev mock), `attribution.ts` (first-touch capture), `events.ts` (batched beacons).
- `src/scripts/` - browser modules: `motion.ts` (GSAP port of the reference `motion.js`), `wishlist-form.ts`, `main.ts` (boot).
- `public/` - `robots.txt`, `llms.txt`, `manifest.webmanifest`, `_headers`, favicons, `og.png`.

## CSS rules

- Tokens first: every color, size, radius, duration, ease must come from a custom property defined in `tokens.css`. If a value is missing, add a token; never inline hex values in components.
- Keep the reference's token names (`--accent`, `--text-secondary`, `--space-4`, ...). Do not rename or fork.
- Plain CSS only. No Tailwind, no CSS-in-JS, no preprocessors. Nesting at one level max where supported.
- CSS default state = final visible state (the reference contract): markup must be fully readable with JS disabled. Motion modules animate from hidden to visible only.
- Respect `prefers-reduced-motion`: the reduced branch in `motion.ts` plus the CSS kill-switches in `global.css` are load-bearing. New animations must define both.
- Global stylesheet sections mirror page order; add new rules under the matching banner comment.

## Copy and content rules

- New/changed copy goes in `src/data/content.ts`; English is the source, Thai demo strings keep `lang="th"` attributes in the markup that renders them.
- Never invent claims, testimonials, prices or statistics. Strings needing owner confirmation carry a `// CONFIRM` comment.
- Keep the reference's neutral product-concept caption under every demo scene.

## Images, logos, fonts

- Logos are inline SVG components (`LogoLockup`, `LogoWordmark`) - never hotlink, never add external image URLs.
- Decorative imagery: `alt=""` + `aria-hidden="true"`; meaningful imagery: descriptive `alt`. External links: `rel="noopener noreferrer"`.
- Fonts are self-hosted Fontsource files imported through `src/styles/tokens.css` / BaseLayout. Never reintroduce a font CDN `@import` or `<link>`. Preload only the Geist variable latin woff2.
- New raster images go in `src/assets/`, rendered via `astro:assets` (`<Image>`/`<Picture>`, AVIF/WebP + fallback, explicit width/height, `loading="lazy"` except the LCP image which is `loading="eager" fetchpriority="high"`).

## SEO rules

- Every page sets unique title/description via `SEO.astro` props; index pages get `robots: index,follow,max-image-preview:large`, utility pages (`/thanks`, `/unsubscribed`, `/404`) get `noindex`.
- Exactly one `h1` per page; sections use `h2`, cards may use `h3`.
- JSON-LD graph lives with the page; only schemas matching visible content (Organization, WebSite, WebPage, SoftwareApplication). No FAQPage/BreadcrumbList unless matching content exists.
- Sitemap excludes `/thanks`, `/unsubscribed`, `/404` (config in `astro.config.mjs`).

## JavaScript rules

- Zero JS by default; only three client modules ship: `motion.ts` (the scroll story - the reference is a scroll-driven experience), `wishlist-form.ts`, `main.ts` (attribution + events boot). Keep each self-contained.
- `motion.ts` is a faithful typed port of `_reference/motion.js`; do not redesign its timings. GSAP comes from npm (3.13+, all plugins free). Never vendor plugin files into the repo.
- New dependencies need a README note. Do not add a framework island for anything CSS or `<details>` can do.

## API contract (source of truth - identical to the marketing worker repo)

All routes under `/v1`, JSON, CORS restricted to the site origin. The typed client lives in `src/lib/api.ts`; when `PUBLIC_API_BASE` is unset the mock in the same file answers instead. Never hardcode keys or endpoints - always `import.meta.env.PUBLIC_*`.

- `POST /v1/wishlist`
  - body: `{ email, lang?, consent_marketing, consent_version, turnstile_token, company, variant?, referred_by?, attribution: { utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer, landing_path, fbclid, gclid, ttclid } }`
  - `200 { ok: true, next: "check_email" }` | `400 { ok: false, error: "invalid_email" | "invalid_input" | "consent_required" | "turnstile_failed" }` | `429 { ok: false, error: "rate_limited" }`
- `GET /v1/confirm?token=` - backend redirects to `SITE_URL/thanks/?t=<profile_token>&pos=<n>&ref=<code>`
- `POST /v1/wishlist/profile` - body `{ token, name?, role?, use_case_text? (max 500) }` -> `200 { ok: true }` | `400 { ok: false, error: "invalid_input" | "invalid_token" }`
- `POST /v1/contact` - body `{ name, email, message, turnstile_token, company }` -> `200 { ok: true }`
- `POST /v1/events` - body `{ name, props?, session_id, attribution }` or an array of 1-20 of them -> `204` always. `name` is allowlisted: `cta_click` | `scroll_depth` | `form_view` | `form_start` | `form_submit`; other names are dropped silently, so new signals ride on `cta_click` with `props.id`. `props`: max 10 keys, string values max 200 chars.
- `GET|POST /v1/unsubscribe?token=`

Behavior rules: honeypot `company` filled -> pretend success. Never reveal whether an email already exists (always the success state). Events use `navigator.sendBeacon`, batched, no cookies beyond the attribution cookie, skipped when DNT is enabled. Turnstile loads lazily on first focus of an email field.

## Hard rules

1. Never hardcode keys, endpoints or the site URL - env vars only (`PUBLIC_SITE_URL`, `PUBLIC_API_BASE`, `PUBLIC_TURNSTILE_SITE_KEY`).
2. Never hotlink assets or fonts; everything ships from this repo.
3. Never edit `_reference/`, `CHANGELOG.md` (auto-generated), or generated files (`public/og.png`, favicons) by hand - regenerate via `scripts/generate_assets.py` (assets) and `scripts/build-headers.mjs` (headers, runs on build).
3b. Verification tooling lives outside the repo (`playwright-core` scratch + installed Chrome); do not add test frameworks to package.json without a README note.
4. No em dashes in any user-facing or documentation text.
5. Keep `README.md` and `AGENTS.md` in sync when decisions change; append verified findings to `docs/ANALYSIS.md` instead of rewriting history.
