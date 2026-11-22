/**
 * Scene 04: the intro brings in the lanes, the cards and the Always Ask box. When the mode
 * changes, the cards that changed lane glide from the other lane. The lane itself is data-mode,
 * set by scripts/approval-modes.ts and drawn by CSS, so it works without this file.
 */
import gsap from "gsap";
import type { ApprovalModeChange } from "../approval-modes";
import type { SceneBuilder } from "./index";

export const buildApprovalModes: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

  ctx.reveal(tl, [ctx.beat("lanes")], 0.2);
  ctx.reveal(tl, [ctx.beat("action-reply"), ctx.beat("action-tool")], 0.7, 0.3);
  ctx.reveal(tl, [ctx.beat("always")], 1.6);

  tl.to({}, { duration: 0.01 }, 2.2);
  return tl;
};

export function animateApprovalMode(scene: HTMLElement, { mode, previous }: ApprovalModeChange): void {
  const lane = (name: string) => scene.querySelector<HTMLElement>(`.am-lane[data-lane="${name}"]`)!;
  const shift = { x: lane("alone").offsetLeft - lane("ask").offsetLeft, y: lane("alone").offsetTop - lane("ask").offsetTop };
  scene.querySelectorAll<HTMLElement>(".am-lanes .am-card").forEach((card) => {
    const alone = (m: string) => card.dataset.alone!.split(" ").includes(m);
    if (alone(mode) === alone(previous)) return;
    // shift points from the Asks lane to the Alone lane; a card entering Alone starts at the Asks lane.
    const sign = alone(mode) ? -1 : 1;
    gsap.fromTo(card, { x: sign * shift.x, y: sign * shift.y }, { x: 0, y: 0, duration: 0.45, ease: "ynw-standard", clearProps: "transform", overwrite: "auto" });
  });
}
