/**
 * Scene 03 timeline: the header and the contact list switch Personal, then Shop, then Team.
 * The active Account is data-account on the scene; CSS shows its contacts and marks its row.
 */
import gsap from "gsap";
import { accountsDemo as d } from "@/data/content";
import type { SceneBuilder } from "./index";

const SWITCH_AT = [0.2, 2.6, 5];

export const buildAccounts: SceneBuilder = (scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const header = ctx.phone();
  const [first, ...others] = d.accounts;

  ctx.lightSteps(tl, [0, 1.6, 3.6, 6.2]);

  scene.dataset.account = first.id;
  ctx.onRevert(() => (scene.dataset.account = d.active));

  ctx.swapText(tl, header.avatar, first.initials, others.map((a, i) => [a.initials, SWITCH_AT[i + 1]] as const));
  ctx.swapText(tl, header.name, first.name, others.map((a, i) => [a.name, SWITCH_AT[i + 1]] as const));

  ctx.reveal(tl, ctx.beat("panel"), 0, 0);
  d.accounts.forEach((a, i) => ctx.reveal(tl, ctx.beat(`row-${a.id}`), 0.3 + i * 0.2));

  d.accounts.forEach((a, i) => {
    const at = SWITCH_AT[i];
    if (i > 0) tl.call(() => (scene.dataset.account = a.id), [], at);
    tl.fromTo(ctx.beat(`contacts-${a.id}`), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, at);
  });

  tl.to({}, { duration: 0.01 }, 7.4);
  return tl;
};
