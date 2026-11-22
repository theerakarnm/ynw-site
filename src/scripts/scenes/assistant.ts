/**
 * Scene 02 timeline: the stream fills while the counter climbs to 200, the user types
 * "@Assistant ...", a trail line draws to the summary card, the Assistant works, then the
 * three points type in one by one and the reply is ready to send.
 */
import gsap from "gsap";
import { strings } from "@/lib/i18n";
import type { SceneBuilder } from "./index";

const ROW_GAP = 0.5;
const COUNT_SECONDS = 4;
const TYPE_SECONDS_PER_CHAR = 0.02;

export const buildAssistant: SceneBuilder = (_scene, ctx) => {
  const d = {
    messages: strings().demo.assistantMessages,
    trail: strings().demo.assistantTrail,
    summary: strings().demo.assistantSummary,
  };
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const card = ctx.beat("card");
  const fade = (name: string, at: number) =>
    tl.fromTo(ctx.beat(name), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, at);

  ctx.countTo(tl, ctx.beat("count"), 0, 200, 0.1, COUNT_SECONDS);
  d.messages.forEach((_, i) => ctx.reveal(tl, ctx.beat(`msg-${i}`), 0.2 + i * ROW_GAP));
  const bubbleAt = 0.2 + d.messages.length * ROW_GAP + 0.3;
  const ask = ctx.beat("ask");
  ctx.reveal(tl, ask, bubbleAt);
  const typed = ctx.typeText(tl, ask.querySelector<HTMLElement>(".as-bubble")!, bubbleAt + 0.25);
  ctx.reveal(tl, ctx.beat("notice"), typed + 0.2);

  const cardAt = typed + 0.6;
  card.classList.add("is-working");
  ctx.onRevert(() => card.classList.remove("is-working"));
  fade("card", cardAt);
  tl.fromTo(ctx.beat("link"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.8, ease: "ynw-standard" }, cardAt - 0.3);
  d.trail.forEach((_, i) => fade(`trail-${i}`, cardAt + 0.4 + i * 0.6));

  const doneAt = cardAt + 0.4 + d.trail.length * 0.6 + 0.3;
  tl.call(() => card.classList.remove("is-working"), [], doneAt);
  let at = doneAt + 0.2;
  d.summary.forEach((_, i) => {
    at = ctx.typeText(tl, ctx.beat(`sum-${i}`), at, TYPE_SECONDS_PER_CHAR) + 0.25;
  });
  fade("acts", at);

  ctx.lightSteps(tl, [0, bubbleAt, cardAt, doneAt]);
  ctx.showReceipt(tl, at + 0.2);

  tl.to({}, { duration: 0.01 }, at + 0.6);
  return tl;
};
