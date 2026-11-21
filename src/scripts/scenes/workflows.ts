/**
 * Scene 05 timeline: the routine is typed, compiled into visible blocks once,
 * confirmed, and the Workflow runs.
 */
import gsap from "gsap";
import { workflowsDemo as d } from "@/data/content";
import type { SceneBuilder } from "./index";

const BLOCKS_AT = 3.9;
const BLOCK_GAP = 0.55;
const CONFIRM_AT = 6.5;
const PRESS_AT = 7.5;
const RUN_AT = 8.6;

export const buildWorkflows: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const panel = ctx.beat("panel");
  const { panel: panelWrap } = ctx.phone();
  const confirm = ctx.beat("confirm");

  ctx.lightSteps(tl, [0, BLOCKS_AT - 0.4, CONFIRM_AT, RUN_AT]);

  const ask = ctx.beat("ask");
  ctx.reveal(tl, ask, 0.3);
  const typed = ctx.typeText(tl, ask.querySelector<HTMLElement>(".b")!, 0.55, 0.035);

  ctx.reveal(tl, panel, typed + 0.3);
  ctx.reveal(tl, ctx.beat("title"), typed + 0.4);
  d.blocks.forEach((_, i) => ctx.reveal(tl, ctx.beat(`block-${i}`), BLOCKS_AT + i * BLOCK_GAP));

  confirm.classList.remove("is-on");
  ctx.onRevert(() => confirm.classList.add("is-on"));
  ctx.swapText(tl, confirm, d.confirm, [[d.on, PRESS_AT]]);
  tl.call(() => confirm.classList.add("is-on"), [], PRESS_AT);
  ctx.reveal(tl, ctx.beat("foot"), CONFIRM_AT);

  ctx.reveal(tl, ctx.beat("run"), RUN_AT);
  /* Created last so "auto" is measured while the panel body is still collapsed. */
  tl.fromTo(panelWrap, { height: 0 }, { height: "auto", duration: 0.45, ease: "ynw-standard" }, typed + 0.3);
  ctx.showReceipt(tl, RUN_AT + 0.2);

  tl.to({}, { duration: 0.01 }, 10);
  return tl;
};
