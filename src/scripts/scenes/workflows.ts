/**
 * Scene 05 timeline: the sentence's phrases are underlined one by one, the blocks drop onto the
 * rail, the orange line is drawn through them, and the Workflow is confirmed and has run.
 * CSS holds the final state, so every tween here starts from hidden.
 */
import gsap from "gsap";
import { strings } from "@/lib/i18n";
import type { SceneBuilder } from "./index";

const PHRASE_AT = 0.5;
const PHRASE_GAP = 0.5;
const BLOCKS_AT = 2.8;
const BLOCK_GAP = 0.3;
const LINE_AT = 3.2;
const CONFIRM_AT = 5;

export const buildWorkflows: SceneBuilder = (scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const phrases = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-phrase]"));
  const blocks = gsap.utils.toArray<HTMLElement>(scene.querySelectorAll("[data-block]"));
  const confirm = ctx.beat("confirm");

  ctx.lightSteps(tl, [0, BLOCKS_AT - 0.3, CONFIRM_AT - 0.4, CONFIRM_AT + 0.4]);

  tl.fromTo(ctx.beat("sentence"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, 0.1);
  phrases.forEach((el, i) => tl.fromTo(el, { "--u": "0%" }, { "--u": "100%", duration: 0.45, ease: "ynw-standard" }, PHRASE_AT + i * PHRASE_GAP));

  blocks.forEach((el, i) => tl.fromTo(el, { autoAlpha: 0, y: -28 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, BLOCKS_AT + i * BLOCK_GAP));
  tl.fromTo(ctx.beat("line"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.1, ease: "ynw-standard" }, LINE_AT);

  confirm.classList.remove("is-on");
  ctx.onRevert(() => confirm.classList.add("is-on"));
  const { workflowsConfirm, workflowsOn } = strings().demo;
  ctx.swapText(tl, confirm, workflowsConfirm, [[workflowsOn, CONFIRM_AT]]);
  tl.call(() => confirm.classList.add("is-on"), [], CONFIRM_AT);
  tl.fromTo(ctx.beat("runs"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "ynw-standard" }, CONFIRM_AT + 0.4);

  tl.to({}, { duration: 0.01 }, CONFIRM_AT + 1.2);
  return tl;
};
