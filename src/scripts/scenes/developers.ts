/**
 * Scene 07 timeline: the request is sent line by line, the response comes back,
 * and the bubble appears from the Account the integration operates.
 */
import gsap from "gsap";
import { developersDemo as d } from "@/data/content";
import type { SceneBuilder } from "./index";

const LINE_GAP = 0.45;
const RESPONSE_AT = 0.4 + d.request.length * LINE_GAP + 0.5;
const BUBBLE_AT = RESPONSE_AT + 0.7;

export const buildDevelopers: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const { panel: panelWrap } = ctx.phone();

  d.request.forEach((_, i) => ctx.reveal(tl, ctx.beat(`line-${i}`), 0.4 + i * LINE_GAP, 0));
  ctx.reveal(tl, ctx.beat("response"), RESPONSE_AT);
  ctx.reveal(tl, ctx.beat("bubble"), BUBBLE_AT);
  ctx.reveal(tl, ctx.beat("panel"), BUBBLE_AT + 0.4);
  tl.fromTo(panelWrap, { height: 0 }, { height: "auto", duration: 0.45, ease: "ynw-standard" }, BUBBLE_AT + 0.4);
  ctx.showReceipt(tl, BUBBLE_AT + 0.8);

  tl.to({}, { duration: 0.01 }, BUBBLE_AT + 1.8);
  return tl;
};
