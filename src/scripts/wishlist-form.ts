/**
 * Wishlist form behavior (two instances: hero + closing).
 * States mirror the reference: idle -> submitting -> success, with invalid /
 * failure shown through the aria-live error line. Honeypot filled = pretend
 * success (the real worker also drops the request silently).
 */
import { ApiError, submitWishlist, type WishlistPayload } from "@/lib/api";
import { getAttribution, getReferredBy } from "@/lib/attribution";
import { track } from "@/lib/events";
import { wishlistForm as t } from "@/data/content";
import { ensureTurnstile } from "./turnstile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;

interface FormRefs {
  form: HTMLFormElement;
  email: HTMLInputElement;
  consent: HTMLInputElement;
  hp: HTMLInputElement;
  error: HTMLParagraphElement;
  time: HTMLElement;
  state: string;
}

const runStart = performance.now();
let formViewTracked = false;

function refs(form: HTMLFormElement): FormRefs {
  return {
    form,
    email: form.querySelector<HTMLInputElement>("[data-wishlist-email]")!,
    consent: form.querySelector<HTMLInputElement>("[data-wishlist-consent]")!,
    hp: form.querySelector<HTMLInputElement>('input[name="company"]')!,
    error: form.querySelector<HTMLParagraphElement>(".wl-error")!,
    time: form.querySelector<HTMLElement>("[data-form-time]")!,
    state: "idle",
  };
}

function setState(r: FormRefs, state: string, message = ""): void {
  r.state = state;
  r.form.dataset.state = state;
  r.error.textContent = message;
  const invalid = state === "invalid";
  r.email.setAttribute("aria-invalid", invalid ? "true" : "false");
  const busy = state === "submitting";
  r.email.disabled = busy;
  r.form.querySelector<HTMLButtonElement>(".wl-submit")!.disabled = busy;
}

function focusEmail(r: FormRefs): void {
  r.email.focus({ preventScroll: true });
}

function successTime(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function finishSuccess(r: FormRefs): void {
  setState(r, "success");
  r.time.textContent = successTime();
  window.dispatchEvent(
    new CustomEvent("ynw:signup", { detail: { runSeconds: Math.max(1, Math.round((performance.now() - runStart) / 1000)) } }),
  );
}

function errorMessage(code: ApiError["code"]): string {
  switch (code) {
    case "invalid_email":
      return t.errorInvalid;
    case "consent_required":
      return t.errorConsent;
    case "turnstile_failed":
      return t.errorTurnstile;
    case "rate_limited":
      return t.errorRateLimited;
    default:
      return t.errorNetwork;
  }
}

export function initWishlistForms(): void {
  const forms = document.querySelectorAll<HTMLFormElement>("[data-wishlist-form]");

  // One Turnstile load serves both forms; trigger it on the first email focus.
  const wakeTurnstile = (form: HTMLFormElement) => ensureTurnstile(form);

  for (const el of forms) {
    const r = refs(el);

    // form_view: once per page when the first form becomes visible.
    if (!formViewTracked) {
      formViewTracked = true;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            track("form_view", { source: r.form.dataset.source });
            io.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(el);
    }

    // form_start: first interaction with the email field + lazy Turnstile.
    r.email.addEventListener("focus", () => {
      wakeTurnstile(el);
      if (!r.form.dataset.started) {
        r.form.dataset.started = "1";
        track("form_start", { source: r.form.dataset.source });
      }
    });
    r.email.addEventListener("input", () => {
      if (!r.form.dataset.started) {
        r.form.dataset.started = "1";
        wakeTurnstile(el);
        track("form_start", { source: r.form.dataset.source });
      }
    });

    el.addEventListener("submit", (event) => {
      event.preventDefault();
      void handleSubmit(r);
    });

    // Use-case chips: first pick locks in (reference behavior) and fires an event.
    el.querySelectorAll<HTMLButtonElement>(".wl-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const already = el.querySelector('.wl-chip[aria-pressed="true"]');
        if (already) return;
        chip.setAttribute("aria-pressed", "true");
        track("use_case_pick", { label: chip.dataset.useCase, source: r.form.dataset.source });
      });
    });
  }

  // Jump CTA in the nav (motion.ts intercepts on the landing page for smooth scroll).
  document.querySelectorAll<HTMLElement>('[data-cta="jump-to-form"]').forEach((cta) => {
    cta.addEventListener("click", () => track("cta_click", { id: "nav_wishlist" }));
  });
}

async function handleSubmit(r: FormRefs): Promise<void> {
  if (r.state === "submitting" || r.state === "success") return;

  const email = r.email.value.trim().toLowerCase();
  const company = r.hp.value;

  // Honeypot: pretend success, send nothing.
  if (company) {
    finishSuccess(r);
    return;
  }

  if (email.length > MAX_EMAIL || !EMAIL_RE.test(email)) {
    setState(r, "invalid", t.errorInvalid);
    focusEmail(r);
    return;
  }

  if (!r.consent.checked) {
    setState(r, "invalid", t.errorConsent);
    r.consent.focus();
    return;
  }

  setState(r, "submitting");
  window.dispatchEvent(new CustomEvent("ynw:dots", { detail: { on: true } }));

  // Wait for the Turnstile token, but never hang: a widget that cannot resolve
  // (bad key/domain) must fail the submit with a visible, retryable error.
  const turnstile = ensureTurnstile(r.form);
  let token = "";
  if (turnstile) {
    const raced = await Promise.race([
      turnstile.token().then((t) => (t === "" ? "" : t)),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 12_000)),
    ]);
    if (raced === null) {
      window.dispatchEvent(new CustomEvent("ynw:dots", { detail: { on: false } }));
      setState(r, "failure", t.errorTurnstile);
      focusEmail(r);
      return;
    }
    token = raced;
  }

  const payload: WishlistPayload = {
    email,
    lang: document.documentElement.lang || "en",
    consent_marketing: r.consent.checked,
    consent_version: r.form.querySelector<HTMLInputElement>('input[name="consent_version"]')?.value ?? "",
    turnstile_token: token,
    company,
    variant: r.form.dataset.source,
    referred_by: getReferredBy(),
    attribution: getAttribution(),
  };

  try {
    await submitWishlist(payload);
    track("form_submit", { source: r.form.dataset.source, status: "ok" });
    window.dispatchEvent(new CustomEvent("ynw:dots", { detail: { on: false } }));
    finishSuccess(r);
  } catch (error) {
    track("form_submit", { source: r.form.dataset.source, status: error instanceof ApiError ? error.code : "network" });
    window.dispatchEvent(new CustomEvent("ynw:dots", { detail: { on: false } }));
    setState(r, "failure", errorMessage(error instanceof ApiError ? error.code : "network"));
    focusEmail(r);
  }
}
