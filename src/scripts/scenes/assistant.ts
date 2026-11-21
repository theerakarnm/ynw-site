/**
 * Scene 02 timeline: the family group fills up (200 unread), the user types
 * "@Assistant ...", the answer opens privately, the unread count drops to 0.
 */
import gsap from "gsap";
import { assistantDemo as d } from "@/data/content";
import type { SceneBuilder } from "./index";

const MESSAGE_GAP = 0.6;
const UNREAD_AFTER = [30, 60, 92, 122, 152, 182, 200];
const TRAIL_START = 7.05;
const TRAIL_GAP = 0.65;
const SUMMARY_AT = 8.9;

export const buildAssistant: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const unread = ctx.beat("unread");
  const panel = ctx.beat("panel");
  const { panel: panelWrap } = ctx.phone();

  ctx.lightSteps(tl, [0, 4.5, 6.4, SUMMARY_AT]);

  d.messages.forEach((m, i) => {
    const at = i * MESSAGE_GAP;
    const bubble = ctx.beat(`msg-${i}`);
    ctx.reveal(tl, bubble, at);
    ctx.countTo(tl, unread, UNREAD_AFTER[i - 1] ?? 0, UNREAD_AFTER[i], at, 0.32);
    if ("sticker" in m) ctx.bob(tl, bubble, at + 0.1);
  });

  const ask = ctx.beat("ask");
  ctx.reveal(tl, ask, 4.5);
  const typed = ctx.typeText(tl, ask.querySelector<HTMLElement>(".b")!, 4.75);
  ctx.reveal(tl, ctx.beat("private"), typed + 0.1);
  ctx.reveal(tl, ctx.beat("notice"), typed + 0.35);

  panel.classList.add("is-working");
  ctx.onRevert(() => panel.classList.remove("is-working"));
  d.trail.forEach((_, i) => ctx.reveal(tl, ctx.beat(`trail-${i}`), TRAIL_START + i * TRAIL_GAP));
  ctx.countTo(tl, unread, 200, 0, 8.4, 0.9);

  tl.call(() => panel.classList.remove("is-working"), [], SUMMARY_AT);
  ctx.reveal(tl, ctx.beat("sum"), SUMMARY_AT);
  d.summary.forEach((_, i) => ctx.reveal(tl, ctx.beat(`sum-${i}`), SUMMARY_AT + 0.1 + i * 0.25));
  ctx.reveal(tl, ctx.beat("acts"), SUMMARY_AT + 0.9);
  /* Created last so "auto" is measured while the panel body is still collapsed. */
  tl.fromTo(panelWrap, { height: 0 }, { height: "auto", duration: 0.45, ease: "ynw-standard" }, 6.4);
  ctx.showReceipt(tl, SUMMARY_AT + 1.1);

  tl.to({}, { duration: 0.01 }, 10.4);
  return tl;
};
