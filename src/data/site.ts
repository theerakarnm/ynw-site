/**
 * Site-level config. Everything here is either static brand data or env plumbing.
 * User-visible copy lives in content.ts; this file is structure + SEO defaults.
 */

export const apiBase = import.meta.env.PUBLIC_API_BASE ?? "";
export const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "https://example.com").replace(/\/$/, "");

/** Buy Me a Coffee page for the founding round (/support). Brand data, not env. */
export const donateUrl = "https://buymeacoffee.com/worknarairn";

export const site = {
  name: "YNW",
  legalName: "YNW", // CONFIRM: legal entity name for Privacy page
  tagline: "Your Next Wave",
  url: siteUrl,
  locale: "en",
  lang: "en",
  themeColor: "#0b0a0b",
  title: "YNW - Agentic Chat App. One Chat for Life, Team, Business",
  description:
    "One chat app for your life, your team and your business. Your AI agents plan, use tools and reply for you, and you decide what they can do alone.",
  // CONFIRM: target keywords are derived from the reference copy, not owner-supplied.
  keywords: [
    "AI chat app",
    "AI agents",
    "agentic chat",
    "AI agents for business",
    "multi-agent workspace",
  ],
  ogImage: "/og.png",
  ogImageAlt: "YNW - agentic chat app. Orange LED wave of dots forming a wave under the YNW wordmark.",
  consentVersion: "2026-11", // CONFIRM: bump whenever consent text changes
} as const;

/** Absolute URL for a site path (used for canonical/og:url/JSON-LD). */
export function absoluteUrl(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
