/**
 * Scene 03 timeline: the deck starts as one stack and fans out, then the table appears.
 * The fan is the --fan custom property on the deck (1 in CSS), so the final state needs no JS.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

export const buildAccounts: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  ctx.lightSteps(tl, [0, 0.4, 0.9, 1.6]);
  tl.fromTo(ctx.beat("deck"), { "--fan": 0 }, { "--fan": 1, duration: 1.1, ease: "back.out(1.2)" }, 0.2);
  ctx.reveal(tl, [ctx.beat("table")], 1);

  tl.to({}, { duration: 0.01 }, 2.2);
  return tl;
};
