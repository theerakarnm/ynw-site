/**
 * Scene 06 timeline: Nok's order arrives, the owner asks the Assistant to relay it,
 * the file is made and posted in the team group.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

const ASK_AT = 1.6;
const PANEL_AT = 4.2;
const FILE_AT = 5.6;
const POSTED_AT = 6.8;

export const buildRelay: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const { panel: panelWrap } = ctx.phone();

  ctx.lightSteps(tl, [0, ASK_AT, FILE_AT - 0.3, POSTED_AT]);

  ctx.reveal(tl, ctx.beat("order"), 0.3);
  const ask = ctx.beat("ask");
  ctx.reveal(tl, ask, ASK_AT);
  const typed = ctx.typeText(tl, ask.querySelector<HTMLElement>(".b")!, ASK_AT + 0.25, 0.04);

  ctx.reveal(tl, ctx.beat("panel"), PANEL_AT);
  ctx.reveal(tl, ctx.beat("from"), PANEL_AT + 0.1);
  ctx.reveal(tl, ctx.beat("arrow"), PANEL_AT + 0.5);
  ctx.reveal(tl, ctx.beat("to"), PANEL_AT + 0.9);
  ctx.reveal(tl, ctx.beat("file"), FILE_AT);
  ctx.reveal(tl, ctx.beat("done"), POSTED_AT);
  ctx.reveal(tl, ctx.beat("sys"), POSTED_AT + 0.3);
  /* Created last so "auto" is measured while the panel body is still collapsed. */
  tl.fromTo(panelWrap, { height: 0 }, { height: "auto", duration: 0.45, ease: "ynw-standard" }, Math.max(typed + 0.2, PANEL_AT));
  ctx.showReceipt(tl, POSTED_AT + 0.4);

  tl.to({}, { duration: 0.01 }, 8.4);
  return tl;
};
