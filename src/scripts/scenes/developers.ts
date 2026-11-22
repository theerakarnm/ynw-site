/**
 * Scene 07 timeline: the request lines are highlighted one after another, the response comes
 * back, and the bubble pops into the chat log of the Account the integration operates.
 * The lines are readable from the start; only the highlight, response and bubble are animated.
 */
import gsap from "gsap";
import { strings } from "@/lib/i18n";
import type { SceneBuilder } from "./index";

const START_AT = 0.4;
const LINE_GAP = 0.45;

export const buildDevelopers: SceneBuilder = (_scene, ctx) => {
  const request = strings().demo.developersRequest;
  const responseAt = START_AT + request.length * LINE_GAP + 0.2;
  const bubbleAt = responseAt + 0.7;
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  /* --hl is the filled share of the line's highlight; at rest it is 0. */
  request.forEach((_, i) => {
    const line = ctx.beat(`line-${i}`);
    const at = START_AT + i * LINE_GAP;
    tl.fromTo(line, { "--hl": "0%" }, { "--hl": "100%", duration: 0.2, ease: "ynw-standard" }, at);
    tl.to(line, { "--hl": "0%", duration: 0.2, ease: "ynw-standard" }, at + LINE_GAP);
  });

  ctx.reveal(tl, ctx.beat("response"), responseAt);
  tl.fromTo(ctx.beat("bubble"), { autoAlpha: 0, scale: 0.8, y: 10 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }, bubbleAt);
  ctx.reveal(tl, ctx.beat("panel"), bubbleAt + 0.4);
  ctx.showReceipt(tl, bubbleAt + 0.8);

  tl.to({}, { duration: 0.01 }, bubbleAt + 1.8);
  return tl;
};
