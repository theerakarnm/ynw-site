/**
 * robots.txt generated at build time so the Sitemap line always matches the
 * deployed origin (PUBLIC_SITE_URL).
 */
import type { APIRoute } from "astro";
import { siteUrl } from "@/data/site";

const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /thanks",
    "Disallow: /unsubscribed",
    "",
    `Sitemap: ${siteUrl}/sitemap-index.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};

export { GET };
