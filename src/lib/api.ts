/**
 * Typed client for the YNW marketing worker (AGENTS.md holds the contract,
 * which is the source of truth). When PUBLIC_API_BASE is unset the mock in
 * this file answers instead so the site is fully testable offline.
 */
import { apiBase, turnstileSiteKey } from "@/data/site";

export interface Attribution {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  referrer: string;
  landing_path: string;
  fbclid: string;
  gclid: string;
  ttclid: string;
}

export interface WishlistPayload {
  email: string;
  lang?: string;
  consent_marketing: boolean;
  consent_version: string;
  turnstile_token: string;
  company: string;
  variant?: string;
  referred_by?: string;
  attribution: Attribution;
}

export type WishlistErrorCode = "invalid_email" | "invalid_input" | "consent_required" | "turnstile_failed" | "rate_limited";

export type WishlistResult = { ok: true; next: "check_email" };

export interface ProfilePayload {
  token: string;
  name?: string;
  role?: string;
  use_case_text?: string;
}

export interface EventPayload {
  name: string;
  props?: Record<string, unknown>;
  session_id: string;
  attribution: Attribution;
}

/** Error thrown for every non-OK response; `code` maps to a localized message. */
export class ApiError extends Error {
  status: number;
  code: WishlistErrorCode | "network";

  constructor(status: number, code: WishlistErrorCode | "network") {
    super(code);
    this.status = status;
    this.code = code;
  }
}

async function postJson(path: string, body: unknown): Promise<Response> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  return res;
}

/* ---------- mock (dev, PUBLIC_API_BASE unset) ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mockState = { count: 0, windowStart: 0 };

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function mockRateLimited(): boolean {
  const now = Date.now();
  if (now - mockState.windowStart > 60_000) {
    mockState.windowStart = now;
    mockState.count = 0;
  }
  mockState.count += 1;
  return mockState.count > 5;
}

async function mockWishlist(payload: WishlistPayload): Promise<WishlistResult> {
  await wait(700 + Math.random() * 400);
  if (mockRateLimited()) throw new ApiError(429, "rate_limited");
  if (!EMAIL_RE.test(payload.email) || payload.email.length > 254) throw new ApiError(400, "invalid_email");
  if (!payload.consent_marketing) throw new ApiError(400, "consent_required");
  if (!payload.turnstile_token && turnstileSiteKey) throw new ApiError(400, "turnstile_failed");
  // Honeypot silently "succeeds" on the real worker too.
  return { ok: true, next: "check_email" };
}

/* ---------- public API ---------- */

export async function submitWishlist(payload: WishlistPayload): Promise<WishlistResult> {
  if (!apiBase) return mockWishlist(payload);
  const res = await postJson("/v1/wishlist", payload);
  let data: { ok?: boolean; error?: WishlistErrorCode } = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body -> network-classified below */
  }
  if (res.ok && data.ok) return { ok: true, next: "check_email" };
  if (res.status === 400 || res.status === 429) {
    throw new ApiError(res.status, data.error ?? "invalid_input");
  }
  throw new ApiError(res.status, "network");
}

export async function submitProfile(payload: ProfilePayload): Promise<void> {
  if (!apiBase) {
    await wait(500);
    return;
  }
  const res = await postJson("/v1/wishlist/profile", payload);
  if (!res.ok) throw new ApiError(res.status, "network");
}

/** Events are fire-and-forget; failures are intentionally swallowed. */
export async function sendEvent(payload: EventPayload): Promise<void> {
  if (!apiBase) {
    if (import.meta.env.DEV) console.debug("[mock /v1/events]", payload);
    return;
  }
  try {
    const res = await postJson("/v1/events", payload);
    void res;
  } catch {
    /* never surface event failures */
  }
}
