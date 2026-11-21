/**
 * Scene 04: the intro plays the default mode (Auto) once; switching modes later replays
 * only the phone content of the chosen mode. The state itself is data-mode, set by
 * scripts/approval-modes.ts and drawn by CSS, so it works without this file.
 */
import gsap from "gsap";
import type { ApprovalMode } from "../approval-modes";
import type { SceneBuilder } from "./index";

export const buildApprovalModes: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const { panel: panelWrap } = ctx.phone();

  ctx.reveal(tl, ctx.beat("incoming"), 0.2);
  ctx.reveal(tl, ctx.beat("auto-chip"), 1.3);
  ctx.reveal(tl, ctx.beat("auto-sent"), 2.3);
  ctx.reveal(tl, ctx.beat("panel"), 3.4);
  /* Created last so "auto" is measured while the panel body is still collapsed. */
  tl.fromTo(panelWrap, { height: 0 }, { height: "auto", duration: 0.45, ease: "ynw-standard" }, 3.4);

  tl.to({}, { duration: 0.01 }, 4.4);
  return tl;
};

export function animateApprovalMode(scene: HTMLElement, mode: ApprovalMode): void {
  const items = scene.querySelectorAll(`.phone-thread [data-for="${mode}"] > *`);
  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 8 },
    { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.4, ease: "ynw-standard", clearProps: "opacity,visibility,transform", overwrite: "auto" },
  );
}
