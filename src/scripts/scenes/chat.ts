/**
 * Scene 01 timeline: scan the QR code, say hello, start a group, send a sticker.
 */
import gsap from "gsap";
import { chatDemo as d } from "@/data/content";
import type { SceneBuilder } from "./index";

export const buildChat: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const header = ctx.phone();
  const qr = ctx.beat("qr");

  ctx.lightSteps(tl, [0, 2.4, 4.3, 7.2]);

  ctx.swapText(tl, header.avatar, d.start.initials, [[d.friend.initials, 1.9], [d.group.initials, 4.3]]);
  ctx.swapText(tl, header.name, d.start.name, [[d.friend.name, 1.9], [d.group.name, 4.3]]);
  ctx.swapText(tl, header.sub, d.start.sub, [[d.friend.sub, 1.9], [d.group.sub, 4.3]]);

  tl.fromTo(qr, { height: 0, autoAlpha: 0 }, { height: "auto", autoAlpha: 1, duration: 0.35, ease: "ynw-standard" }, 0.2);
  tl.fromTo(ctx.beat("qr-scan"), { y: 0 }, { y: 116, duration: 1.1, ease: "power1.inOut" }, 0.6);
  tl.to(qr, { height: 0, autoAlpha: 0, duration: 0.3, ease: "ynw-standard" }, 1.8);

  ctx.reveal(tl, ctx.beat("sys-added"), 1.95);
  ctx.reveal(tl, ctx.beat("dm-me"), 2.5);
  ctx.reveal(tl, ctx.beat("dm-them"), 3.3);
  ctx.reveal(tl, ctx.beat("sys-group"), 4.3);
  ctx.reveal(tl, ctx.beat("g-mali"), 4.9);
  ctx.reveal(tl, ctx.beat("g-you"), 5.7);
  ctx.reveal(tl, ctx.beat("g-ploy"), 6.5);
  const sticker = ctx.beat("sticker");
  ctx.reveal(tl, sticker, 7.3);
  ctx.bob(tl, sticker, 7.4);

  tl.to({}, { duration: 0.01 }, 8.8);
  return tl;
};
