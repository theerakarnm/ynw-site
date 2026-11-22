/**
 * Scene 01 timeline: the four columns light their titles in turn while each demo fades in
 * inside its own column (QR card, one to one thread, group, stickers). Offsets are small and
 * vertical so nothing crosses a column. The stickers then float for good.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

const RISE = { duration: 0.7, ease: "back.out(1.3)" };
const TITLE_TIMES = [0, 1.1, 2.4, 4.2];

export const buildChat: SceneBuilder = (scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const rise = (name: string, y: number, at: number) =>
    tl.fromTo(ctx.beat(name), { autoAlpha: 0, scale: 0.92, y }, { autoAlpha: 1, scale: 1, y: 0, ...RISE }, at);
  const fade = (name: string, at: number) =>
    tl.fromTo(ctx.beat(name), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, at);

  scene.querySelectorAll<HTMLElement>("[data-col]").forEach((title, i) => {
    tl.fromTo(title, { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, TITLE_TIMES[i] ?? 0);
  });

  rise("qr", 24, 0);
  fade("sys-added", 0.9);
  rise("dm-me", 20, 1.1);
  rise("dm-them", 20, 1.7);
  rise("group", 24, 2.4);
  fade("g-sys", 3.0);
  ["g-0", "g-1", "g-2"].forEach((name, i) => fade(name, 3.3 + i * 0.35));
  ["sticker-0", "sticker-1", "sticker-2"].forEach((name, i) => {
    const at = 4.2 + i * 0.3;
    rise(name, 30, at);
    ctx.bob(tl, ctx.beat(name), at + RISE.duration);
  });

  tl.to({}, { duration: 0.01 }, 6);
  return tl;
};
