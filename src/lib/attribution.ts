/**
 * Attribution capture. First touch wins, stored twice:
 * - sessionStorage "ynw.attr": mirror for the current tab session.
 * - first-party cookie "ynw_attr" (30 days, SameSite=Lax): survives sessions.
 * Reads utm_*, fbclid/gclid/ttclid, document.referrer and the landing path.
 * "?ref=" maps to referred_by and is stored alongside.
 */
import type { Attribution } from "./api";

const KEY = "ynw.attr";
const COOKIE = "ynw_attr";
const COOKIE_DAYS = 30;

interface StoredAttribution extends Partial<Attribution> {
  ref?: string;
}

const ATTR_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "referrer", "landing_path", "fbclid", "gclid", "ttclid"] as const;

let captured = false;

function readCookie(): StoredAttribution | null {
  const match = document.cookie.match(/(?:^|;\s*)ynw_attr=([^;]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as StoredAttribution;
  } catch {
    return null;
  }
}

function writeCookie(data: StoredAttribution): void {
  const maxAge = COOKIE_DAYS * 24 * 60 * 60;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(data))}; max-age=${maxAge}; path=/; SameSite=Lax${secure}`;
}

function readSession(): StoredAttribution | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredAttribution) : null;
  } catch {
    return null;
  }
}

function writeSession(data: StoredAttribution): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage blocked - cookie remains */
  }
}

function paramsFromLocation(): StoredAttribution {
  const data: StoredAttribution = {};
  const params = new URLSearchParams(location.search);
  for (const field of ATTR_FIELDS) {
    if (field === "referrer" || field === "landing_path") continue;
    const value = params.get(field);
    if (value) data[field] = value.slice(0, 256);
  }
  const ref = params.get("ref");
  if (ref) data.ref = ref.slice(0, 64);
  return data;
}

/** Run once on every page load as early as possible (main.ts). */
export function captureAttribution(): void {
  if (captured) return;
  captured = true;
  const existing = readCookie() ?? readSession();
  if (existing && Object.keys(existing).length > 0) return; // first touch wins
  const data = paramsFromLocation();
  if (document.referrer) data.referrer = document.referrer.slice(0, 512);
  data.landing_path = location.pathname + location.search;
  // Only persist when there is something worth persisting.
  if (Object.keys(data).length > 1 || document.referrer) {
    writeSession(data);
    writeCookie(data);
  } else {
    writeSession(data);
  }
}

function emptyAttribution(): Attribution {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    referrer: "",
    landing_path: "",
    fbclid: "",
    gclid: "",
    ttclid: "",
  };
}

/**
 * Attribution for API calls: session/cookie data folded into the contract shape.
 * referrer/landing_path fall back to the current document when nothing stored.
 */
export function getAttribution(): Attribution {
  const stored: StoredAttribution = readSession() ?? readCookie() ?? paramsFromLocation();
  const attribution = emptyAttribution();
  for (const field of ATTR_FIELDS) {
    const value = stored[field];
    if (value) attribution[field] = value;
  }
  if (!attribution.referrer && document.referrer) attribution.referrer = document.referrer.slice(0, 512);
  if (!attribution.landing_path) attribution.landing_path = location.pathname + location.search;
  return attribution;
}

/** referred_by from ?ref= (stored value or current URL). */
export function getReferredBy(): string | undefined {
  const stored: StoredAttribution = readSession() ?? readCookie() ?? {};
  return stored.ref ?? new URLSearchParams(location.search).get("ref") ?? undefined;
}
