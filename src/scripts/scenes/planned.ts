/**
 * Scene 08 timeline: each card's dashed outline is drawn in around the card (the mask trace
 * grows along the rect), then the card's text appears. CSS holds the final state.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

const CARD_GAP = 0.25;
const DRAW_SECONDS = 0.9;

export const buildPlanned: SceneBuilder = (scene, _ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const cards = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-card]"));

  cards.forEach((card, i) => {
    const at = 0.2 + i * CARD_GAP;
    tl.fromTo(card.querySelector("[data-trace]"), { drawSVG: "0%" }, { drawSVG: "100%", duration: DRAW_SECONDS, ease: "ynw-standard" }, at);
    tl.fromTo(card.querySelectorAll(":scope > :not(svg)"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "ynw-standard" }, at + 0.3);
  });

  tl.to({}, { duration: 0.01 }, 0.2 + cards.length * CARD_GAP + DRAW_SECONDS);
  return tl;
};
