# ANALYSIS.md
Reference analysis of `_reference/` (read-only source of truth for visuals and copy).
Analyzed 2026-11-03. Reference consists of a design-tool export (`Main.dc.html`, an `<x-dc>` design component) plus its referenced resources: `landing.css`, the YNW design-system bundle (`ds/ynw/components/bundle.css`, `ds/ynw/tokens.css`, `ds/ynw/tokens.json`), a hand-written motion module (`motion.js`) built on GSAP, and two SVG assets.
The design-tool runtime (`support.js`, `vendor/react*.js`) only renders the mockup in a browser and is not part of the design. The visual truth lives in the inline `style="..."` attributes, the `<helmet>` style block, and the three CSS files. Behavior truth lives in `motion.js` and the small logic class embedded at the bottom of `Main.dc.html`.

## Page identity

- Brand: YNW ("Your Next Wave", "Your New World", "Your Network Workspace").
- Product: an "agentic chat" app, pre-launch ("COMING SOON"), goal of the page is wishlist signups by email.
- Language: English UI with Thai demo strings inside mock chat messages (`lang="th"`).
- Theme: dark only. Page background `--bg #0b0a0b`, cream text, orange flame accent. There is no light theme and no theme toggle in the reference.

## Section inventory (in order)

1. **Skip link** - fixed, appears on focus, targets `#run` (the run/scene anchor).
2. **Site nav** (fixed top, 56px) - YNW lockup SVG left, `ynw-btn--secondary` "Join the wishlist" button right. Button smooth-scrolls to the nearest wishlist form and focuses its email input.
3. **Progress rail** (`<aside class="rail">`, fixed) - left column on desktop, a one-line 40px bar under the nav on < 1024px. Live status line (`aria-live="polite"`, mono 11-12px, e.g. "Running step 2 of 7", "Waiting for approval", "Run complete ▪ Finished in 1m 12s") plus 7 step buttons (01 Avatars, 02 Agents, 03 Backstage, 04 Approvals, 05 Receipts, 06 Workspace, 07 Wishlist). Each step has pending (bordered square), running (accent square, `ynw-pulse`) and done (check icon) states; running step is `aria-current="step"`. Clicking a step smooth-scrolls to its scene. Appears once the first scene is reached. On form success the rail shows "Run complete" and the mobile bar hides its steps.
4. **Hero** (`#top`) - full viewport height (min `max(100svh, 760px)`), 344px bottom padding. Layers back to front: radial orange glow at bottom (420px), `<canvas>` LED wave (320px, dark dot grid + animated crest), giant YNW wordmark SVG anchored bottom-left (width `clamp(300px, 52vw, 800px)`, partially cropped below the fold), then copy: eyebrow "AGENTIC CHAT ▪ COMING SOON" (mono, letterspaced), `h1` of three stacked lines ("Your Next Wave." / "Your New World." / "Your Network Workspace.", 600 weight, `min(8vw, 56px)`, -0.04em tracking, line 1 lit, lines 2-3 dimmed), lead paragraph (18px, max 560px), and **wishlist form** (see Forms).
5. **Capabilities ticker** - bordered band, marquee of 8 mono uppercase items (AVATARS, BACKSTAGE, APPROVALS, MULTI-AGENT, TOOL CALLING, SHARED WORKSPACES, MCP CONNECTORS, RUN RECEIPTS), duplicated once for a seamless loop, 40s linear loop, edge mask, pauses on hover and while the hero slogan loop is active.
6. **Scene 01 - Avatars** (`#avatars`, step 1, pin 150%) - head: "One you. Every role." Stage: origin avatar "You" (40px, scales 1.6 -> 1 on entry), three `ynw-card` seat cards (A Personal / B Business Admin / C Community host), each listing Contacts, Knowledge, Permissions, Agent in a 2-col square-bullet list; card B has a stacked occupant swap (You -> Agent -> Mali); a thread box with eyebrow "Business Admin ▪ Nok" and a Thai message. Connectors: origin-to-cards bezier SVG paths drawn on entry; a vertical "spine" hairline on mobile.
7. **Scene 02 - Agents** (`#agents`, step 2, pin 200%) - head: "Agents that finish the job". Stage: Nok message, Business Admin "Searching 2 sources" with thinking dots, handoff note "Business Admin -> Finance agent", plan card ("Plan ▪ 3 steps": Check stock done, Read price policy done, Draft quote running), two tool cards (`stock.lookup({ sku: "A-20" })` -> "120 in stock ▪ 0.4s"; `docs.search({ q: "discount policy" })` -> "Over 5% needs approval ▪ 0.9s") with Running/Done badges that flip as the scroll timeline progresses.
8. **Scene 03 - Backstage** (`#backstage`, step 3, pin 150%) - head: "Every chat has a backstage." Stage: two columns split by a vertical hairline. Frontstage column: Nok Thai message + a "Family group ▪ 200 unread" line. Backstage column (surface panel): agent summary ("Nok asks for 20 units at a discount. Repeat customer, 3 past orders."), Mali "Offer 8%.", agent Thai draft ("ได้เลยค่ะ 20 ชิ้น ลดให้ 8% รวม ฿4,600 ค่ะ"), then a layer swap to private-life lines ("Dinner moved to Saturday 18:00. Mom asks who brings dessert."). Labels "FRONTSTAGE ▪ NOK SEES THIS" / "BACKSTAGE ▪ ONLY YOUR TEAM SEES THIS".
9. **Scene 04 - Approvals** (`#approvals`, step 4, pin 250%) - head: "Nothing important goes out without you." Stage: left column is the demo: Nok message, glowing approval card ("APPROVAL REQUIRED", "Business Admin ▪ 14:36", body "Send this quote to Nok. 8% is above your 5% discount limit.", code block `quote.send({ to: "Nok", units: 20, discount: 0.08, total: "฿4,600" })`, Deny/Approve buttons, result lines "Approved by you ▪ 14:37" / "Denied by you ▪ 14:37. Nothing was sent."), then the sent Thai message appears after Approve. Right column: the autonomy ladder, 5 rows (Suggest - "Drafts it. You send it." - complaints; Approve - "Waits for your approval." - discounts, quotes; Undo window - "Sends after 5 minutes unless you cancel." - appointment confirmations; Auto - "Replies on its own within policy." - opening hours, address; Never - "Blocked, whoever asks." - money transfers, customer data), plus agent prompt message ("48 of your last 50 price replies went out unedited. Want me to send these myself?"). The Approve/Deny buttons are genuinely interactive in the reference demo; the scroll timeline auto-approves past 50% progress and resets to pending when scrolling back above 20%.
10. **Scene 05 - Receipts** (`#receipts`, step 5, no pin, scrubbed) - head: "Bring your own agents. Keep the receipts." Stage: inline SVG MCP diagram (Your agents -> MCP -> Workspace boxes, arrows, 4 tool-category icons web/shell/data/files, all strokes drawn on scroll via DrawSVG) and a receipt `<dl>` (ACTION quote.send / REQUESTED BY Nok, via Business Admin / USED price-policy.md, stock.lookup / APPROVED BY you ▪ 14:37), rows clip-reveal in sequence.
11. **Scene 06 - Workspace** (`#workspace`, step 6, pin 150%) - head: "Friends, teams and communities in one network." Lead: "Agents join with a role, like any other member." Stage: agent node "Business Admin", connector tree SVG, four cards (A Everyday - "Add by QR. Stickers, cards and mini apps in chat."; B Work - "Channels, threads, search, permissions and audit logs."; C Community - "Servers, roles, drop-in voice rooms and a bot directory."; D Your customers - "No install needed. They reach your avatar through LINE Official Account or a web link.").
12. **Scene 07 - Wishlist** (`#wishlist`, step 7, closing) - head: "The last step needs you." Lead: "Join the wishlist and get an email when early access opens." Stage: the same wishlist form inside an approval-style card ("WAITING FOR YOU" header, shield icon), max-width 640px. Three orange contour polylines draw along the bottom of the scene. 180px bottom padding.
13. **Footer** - top hairline border, three slogan lines ("Your Next Wave." lit, the rest secondary), YNW lockup and a "Privacy" link.

Every scene (01-07) carries the mono caption "Product concept. Interface and data are illustrative."

## Design tokens

Source: `ds/ynw/tokens.css` + the `@layer` block in `Main.dc.html` (identical values; tokens.json is the system source).

### Color

Surfaces and text: bg #0b0a0b; surface #131112; surface-raised #1b1819; surface-overlay #242021; surface-hover #2c2728; border #2b2627; border-strong #3d3637; border-control #7a706d; text-primary #f4efec; text-secondary #b9afab; text-muted #948a86.
Accent: accent #ed662e; accent-hover #f2834a; accent-pressed #db4a1c; accent-subtle #2a1510; accent-text #f59a68; on-accent #0b0a0b; focus-ring #f2834a.
Feedback: success #4cc38a (+subtle #0f2219); warning #f5c842 (+subtle #2a2208); error #ff5c5c (+subtle #2e0d0e); info #6fc1c4 (+subtle #0d2224); scrim #050405b8.
Brand ramp: brand-signal #eb1515, brand-ember #ee4821, brand-flame #ed662e, brand-amber #ec9141, brand-gold #eab46c, brand-sand #cd8e4e, brand-teal #335554, brand-teal-deep #133337, brand-wine #6a1a21, brand-maroon #30151a, brand-ink #090b0f; neutral-50..950 ramp (#f7f4f2 -> #0b0a0b); orange-50..950 ramp.
Canvas wave palette: gold #eab46c, amber #ec9141, flame #ed662e, ember #ee4821, signal #eb1515, base #30151a.

### Typography

Families: sans "Geist" with "IBM Plex Sans Thai" fallback; mono "Geist Mono" with "IBM Plex Sans Thai" fallback; Thai-first `--font-thai` = "IBM Plex Sans Thai", "Geist" (applied via `:lang(th)` with line-height 1.7). All three were loaded from Google Fonts in the reference and must be self-hosted in the rebuild.
Type scale (weight/size/line-height): display 700/120/0.9; h1 600/56/1.0; h2 600/40/1.05 (-0.035em); h3 600/28/1.15; h4 600/22/1.25; h5 600/17/1.35 (-0.01em); h6 600/14/1.4; body-lg 400/18/1.6; body-md 400/15/1.6 (page base); body-sm 400/13/1.55; caption 400/12/1.45; mono-label 500/11/1.45 (+0.08em tracking, uppercase for eyebrows); mono-code 400/13/1.6; mono-meta 400/12/1.45.
Contextual sizes: hero title min(8vw, 56px); scene head-title 32px -> 40px at >= 1024px (30px story, 26px small phones); head-lead 18px; body base 15px.

### Spacing, radii, borders, shadows

Space scale: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96, 128 (px).
Radii: xs 2, sm 4, md 6, lg 8, full 9999.
Border widths: hairline 1px, focus 2px. Shadows: overlay `0 0 0 1px #2b2627, 0 12px 32px -8px #000000`; glow `0 0 0 1px #ed662e66, 0 0 24px -4px #ed662e59`.

### Motion

Durations: instant 80ms, fast 140ms, base 200ms, slow 320ms, pulse 1200ms, ticker 40s.
Easings: standard cubic-bezier(0.2, 0, 0, 1); out cubic-bezier(0, 0, 0, 1); in cubic-bezier(0.4, 0, 1, 1); linear. GSAP CustomEase aliases: ynw-standard "0.2,0,0,1", ynw-out "0,0,0,1".

### Layout

Grid: 12 columns, 24px gutter, 24px margin, max-width 1280px; scene content occupies columns 3-12 on desktop (head and stage); scene head itself splits into 2 columns with 40px gap at >= 1024px, 40px at >= 1280px. Nav lockup and hero copy align to `max(16px, calc((100% - 1232px)/2))`. Chat primitives cap at `--chat-max: 760px`.
Breakpoints: tokens define 640/768/1024/1280/1536; the landing CSS uses base (mobile), max-width 1023.98px, min-width 1024px, min-width 1280px, plus viewport-height variants (min-height 881px roomier demos; max-height 880px tighter pin padding) and `100svh` sizing.

## Interactions and how they work

`motion.js` is one `gsap.matchMedia()` with four branches, driven by viewport width/height and `prefers-reduced-motion`:

- **pin** (>= 1024px, height 700-1700, motion OK): each scene with `data-pin` (150/200/150/250/150%) pins for `100svh + N%` and its timeline scrubs with scroll. Receipts (05) is scrubbed unpinned between "top 82%" and "bottom 62%". Wishlist (07) has no pin.
- **story** (< 1024px, height 600-1700): scenes become `100svh + var(--story)` tall (160-280svh per scene) with `position: sticky` inner content; the same scrubbed timelines run on native scroll; the section head fades and the stage moves up (collapseHead) mid-scene.
- **flow** (very short viewports or > 1700px tall): no pinning; each scene timeline plays once (1.2s tween) when the stage crosses "top 72%".
- **reduced**: no timelines; scenes fade in once; the canvas wave renders one static frame; ticker/dots/pulse animations are disabled via CSS.

Key mechanics:

- **CSS default = final state.** Every animated element is fully visible in plain CSS; motion only animates from hidden to visible. No-JS still shows the whole page. The rebuild must keep this property.
- **Hero LED wave** (`<canvas>`, vanilla): dark dot base grid (8px pitch, 10px under 640px, 3-4px dots), crest computed from 3 summed sines per column; dots within distance bands of the crest are repainted in the 5-color palette; pointer proximity lifts the crest (desktop, fine pointer only, gsap.quickTo); a "crest sweep" (bright band travels once) fires on signup success; amplitude tweens 1 -> 0 across hero scroll; rAF ticker pauses when off-screen or tab hidden.
- **Hero intro**: eyebrow fade, 3 title lines masked rise (SplitText lines, yPercent 110 -> 0, 0.9s, stagger 0.08), lead fade-rise, mark rise; runs once on load (skipped in reduced).
- **Slogan loop**: every 3.2s the "lit" copy of the h1 lines rotates to the next line (dim text stays, lit overlay cross-fades); paused when the hero leaves the viewport; while active, the page sets `data-loop="hero"` which pauses the ticker.
- **Rail tracking**: scroll position -> active step (first scene whose top is above viewport middle), `data-visible` toggles opacity, statuses recomputed; form success sets complete + elapsed time; step buttons call jumpToStep (smooth scroll, accounting for mobile bar offset 112 vs desktop 72).
- **Avatars timeline**: origin scales 1.6 -> 1 and centers; cards slide in (x 24, stagger 0.035); spine scaleY; seat-line paths DrawSVG; thread rises; occupant stack swaps You -> Agent -> Mali at 68%/85% of the timeline; story mode dims cards A/C to 0.35 at the swap.
- **Agents timeline**: messages rise; plan in; tool cards clip-reveal top-down; step/tool statuses flip pending -> running -> done at progress thresholds (0.3/0.45/0.6/0.85); thinking dots on between 14% and 33% (page sets `data-loop="dots"`, pausing the rail pulse); handoff note at 70%.
- **Backstage timeline**: frontstage slides in from the right (pin) or rises (story); split rule scales; backstage panel rises; 3 messages stagger; work layer cross-fades to the home layer at 72-80%.
- **Approvals timeline**: card slides in from the ladder side with y-offset; other content dims to 0.3; card centers at 52%; ladder rules scaleX, rows fade, marker dot moves from 100% to 200%; ask message rises; scrolling past 50% auto-approves (if pending) and restores opacity; scrolling back above 20% resets to pending. Buttons resolve instantly at any time via state.
- **Receipts timeline**: diagram strokes DrawSVG (stagger 0.03), labels/arrows/icons fade at 32%, receipt clip-reveals per row.
- **Workspace timeline**: 4 cards rise stagger 0.05; spine + connector paths DrawSVG; node rises at 70%.
- **Contours**: three paths DrawSVG on enter near the end of the page.
- **Section reveal** (every scene, all non-reduced modes): head rule scaleX 0.6s, eyebrow fade at 0.12, lead rise at 0.5, title SplitText masked line rise, trigger "top 72%", once.
- **Wishlist form states**: `data-state` on the form drives idle / submitting / success / invalid / failure. Error `<p role="alert">` swaps text; success pane swaps in over the entry pane via a grid-area stack + visibility; success line shows local time "▪ On the wishlist ▪ 14:37 ▪"; "What will you use first?" chips toggle `aria-pressed` (reference defers the endpoint); submit button swaps label to "Joining" with pulsing dots and glow shadow. Honeypot: if `company` is filled, the form silently pretends success. Email validation: trim/lowercase, regex, max 254.
- **Nav CTA**: smooth-scrolls (0.9s, ynw-standard, autoKill) to whichever wishlist form is closer to the viewport middle, then focuses its email input.
- **Approval demo buttons**: Approve/Deny set the card state; glow fades, action buttons hide, mono result line appears; on approve the Thai "sent" message rises in.

## Asset inventory

- `assets/ea78bc84153ceebc9aaf070cd33344e9.svg` (2.9KB, 321x71): YNW lockup - rounded-square logo tile (63x63, radius 7.5, ink fill #090b0f, border #3d3637) containing a 6x6 dot grid wave in brand colors (rows: maroon, amber, flame, ember, signal, #b01f2c mix) + white "YNW" wordmark paths. Used in nav (h 20px) and footer. Both `<img>` usages carry alt="YNW".
- `assets/37418d6fdd6400e444aaefd2657a6e4b.svg` (0.6KB, 229x71): giant hero wordmark, white "YNW" paths on transparent, used as `alt=""` decorative image.
- No raster images anywhere. No favicons, no OG image, no fonts bundled (all loaded from Google Fonts at runtime). Inline SVGs in the HTML: check marks, shield, database, file icons, seat-line paths, MCP diagram, network tree, contours.
- Fonts required: Geist (300-800 variable), Geist Mono (400-600), IBM Plex Sans Thai (300-700). Latin + Thai coverage; Thai strings are body-weight only.

## Forms and tracking found

- Two wishlist form instances (hero `source=hero`, closing `source=closing`), identical markup: hidden `source`, honeypot `company` (absolutely-positioned clip, `tabIndex=-1`, autoComplete off), visible email field (`you@company.com` placeholder, autoComplete email, maxLength 254) + primary submit "Join the wishlist ->", note line "Launch updates only. Unsubscribe anytime. Privacy". `noValidate` - validation is custom.
- No consent checkbox, no Turnstile, no referral capture in the reference. The brief requires adding: consent checkbox (linked to privacy page), Turnstile (lazy, on first email focus), attribution capture (first-touch 30-day cookie + sessionStorage), `?ref=` -> referred_by. These are additive and must not disturb the visual design.
- The demo's `sendWishlist()` is a 900ms fake promise; comments mark the real integration points: POST to the wishlist API (non-2xx -> failure state) and POST use-case chips. The marketing-worker contract in the brief is the source of truth for these calls.
- No analytics scripts, no cookies, no third-party tags in the reference.

## Anything broken or missing in the reference

1. **Privacy page missing**: both forms and the footer link to `Privacy.dc.html`, which is not in the zip. The rebuild must provide `/privacy` (minimal placeholder copy, flagged for the owner).
2. **Fonts are hotlinked** to Google Fonts (via `<helmet>` and an `@import` inside bundle.css). Must be replaced with self-hosted woff2.
3. **Design-tool runtime in the payload**: react.js + react-dom.js (dev builds) + support.js are mockup-only; GSAP plugins are split out as separate script tags. The rebuild bundles real production JS instead.
4. **Templating placeholders** (`{{...}}`, `sc-for`) do nothing without the design-tool runtime; the rebuild renders the same final-state markup statically.
5. **bundle.css is a whole design system** (chat composer, sidebar, meters, modals, skeletons, empty states, menus, etc.); roughly 60% of its rules are unused by this page and must be pruned.
6. **`demoResult` prop** (success/failure enum) is a design-tool preview control, not product behavior.
7. **Duplicate `@keyframes ynw-pulse` / reduced-motion blocks** appear twice at the end of bundle.css; harmless but must not be carried over twice.
8. **The consent checkbox, privacy consent version and Turnstile tokens required by the API contract do not exist in the reference** and must be added in the reference's visual language (small square control, 13px label, mono meter where appropriate).
9. `hint-placeholder-count="7"`/`"3"` attributes are design-tool hints, not real markup.
10. The wave canvas ignores `prefers-reduced-motion` only in the sense that it renders a static frame; the reference handles it correctly, the rebuild must keep that behavior.

## Rebuild decisions (recorded for README/AGENTS)

- Stack: Astro 7 (static, TypeScript strict), plain CSS custom properties (no Tailwind - the reference is hand-written CSS).
- Motion: port `motion.js` to a typed module using the npm `gsap` package (3.13+ made SplitText/DrawSVGPlugin free). This is the one deliberately JS-heavy piece; it is real interactivity. Everything else is vanilla TS. If GSAP is a concern, the fallback plan (CSS scroll-driven animations) is documented but not built - fidelity would drop.
- Zero-JS baseline: static HTML renders the complete final state; `<noscript>` on the form; motion, Turnstile and event beacons are progressive enhancements.
- Fonts: self-hosted via Fontsource packages (Geist variable, Geist Mono variable, IBM Plex Sans Thai 400/600) imported from node_modules into `src/assets/fonts` URLs; Geist variable latin woff2 preloaded.
- The two reference SVGs are inlined as Astro components (fewer requests, pixel-identical) - nav/footer lockup with `alt="YNW"`, hero mark with `alt=""` + `aria-hidden`.
- Icons (check, shield, database, file, globe, terminal) are inline SVGs in a single `Icon.astro`.
- OG image (1200x630 PNG), favicon set and manifest are generated once from the lockup dot-grid geometry (Pillow script) - the reference has none.
- The use-case chips post a `use_case_pick` event to `/v1/events` (the contract has no dedicated use-case endpoint).
- Target platform: Cloudflare Pages (`_headers` for CSP/caching), env vars via Astro `import.meta.env` with `PUBLIC_` prefix.
- The mock dev API in `src/lib/api.ts` activates only when `PUBLIC_API_BASE` is unset.

## Worker integration findings (2026-11-08)

Verified end to end against the local marketing worker (`wrangler dev`, local D1) with Playwright and Chrome: signup -> confirm redirect -> `/thanks/` position and referral link -> profile save, all rows checked in D1.

- `npm run dev` used to read the production `.env`, so a local dev session posted to `https://api-marketing.ynw.app`.
  The wishlist POST failed CORS (the production worker allows only `https://ynw.app`), Turnstile failed with error 110200 (the production site key does not allow `localhost`), and the `text/plain` event beacons reached the production `events` table.
  Fix: a committed `.env.development` points dev at `http://localhost:8787` with Cloudflare's always-pass Turnstile test site key.
- Supersedes the rebuild decision above: the worker allowlists event names and drops `use_case_pick` silently (still `204`).
  A chip pick is now `cta_click` with `props.id = "use_case_pick"`, and `EventName` in `src/lib/api.ts` pins the allowlist at compile time.
- The `/thanks/` profile textarea allowed 1000 characters while the worker caps `use_case_text` at 500, so a long answer failed with `400 invalid_input`. The textarea now caps at 500.
- `/v1/events` takes an array of 1-20 events, so each flush now sends one beacon instead of one per event.
- The worker's wishlist limit is 5 per hour per IP; the rate-limit message now says "Try again in an hour" instead of "in a minute".
