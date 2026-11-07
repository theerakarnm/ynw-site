/**
 * llms.txt - a brief, agent-oriented summary of the site.
 */
import type { APIRoute } from "astro";
import { site, absoluteUrl } from "@/data/site";

const GET: APIRoute = () => {
  const body = `# ${site.name}

> ${site.description} Pre-launch: the wishlist is open, the product ships soon.

YNW is an agentic chat product. This site is its pre-launch landing page: the
product story (avatars, agents, backstage, approvals, receipts, workspace), the
capability list, and a wishlist signup with a welcome email.

## Pages

- [Home](${absoluteUrl("/")}): product story and wishlist signup
- [Support YNW](${absoluteUrl("/support/")}) founding round: Buy Me a Coffee tiers, how to donate, FAQ
- [Privacy](${absoluteUrl("/privacy/")}): what the wishlist collects, why, and how to unsubscribe

## Notes

- Demo scenes show product concepts; interfaces and data are illustrative, not shipped UI.
- Wishlist emails require explicit consent; every email carries a one-click unsubscribe.
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
};

export { GET };
