/**
 * Scene 01 timeline: the collage pieces fly in one after another (QR card, the one to one
 * thread, the group, then the stickers), after which the stickers float for good.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

const FLY = { duration: 0.7, ease: "back.out(1.3)" };

export const buildChat: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const fly = (name: string, from: gsap.TweenVars, at: number) =>
    tl.fromTo(ctx.beat(name), { autoAlpha: 0, scale: 0.92, ...from }, { autoAlpha: 1, scale: 1, x: 0, y: 0, ...FLY }, at);
  const fade = (name: string, at: number) =>
    tl.fromTo(ctx.beat(name), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, at);

  ctx.lightSteps(tl, [0, 1.1, 2.4, 4.2]);

  fly("qr", { x: -120, y: 30 }, 0);
  fade("sys-added", 0.9);
  fly("dm-me", { x: 90, y: 40 }, 1.1);
  fly("dm-them", { x: -90, y: 40 }, 1.7);
  fly("group", { x: 140, y: -30 }, 2.4);
  fade("g-sys", 3.0);
  ["g-0", "g-1", "g-2"].forEach((name, i) => fade(name, 3.3 + i * 0.35));
  ["sticker-0", "sticker-1", "sticker-2"].forEach((name, i) => {
    const at = 4.2 + i * 0.3;
    fly(name, { y: 120 }, at);
    ctx.bob(tl, ctx.beat(name), at + FLY.duration);
  });

  tl.to({}, { duration: 0.01 }, 6);
  return tl;
};
