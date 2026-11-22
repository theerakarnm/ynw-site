/**
 * Scene 06 timeline: the order arrives, the owner asks, a PDF flies along a curve from the first
 * window to the second, and the receipt prints. The curve is measured at the first frame of the
 * flight so it follows the layout (windows side by side, or stacked on phones). Items inside the
 * windows fade without leaving the layout, so the measured end point stays right.
 */
import gsap from "gsap";
import type { SceneBuilder } from "./index";

const ASK_AT = 1.5;
const FLY_AT = 3.2;
const FLY_SECONDS = 1.3;
const LAND_AT = FLY_AT + FLY_SECONDS;
const PRINT_AT = LAND_AT + 1;
const PRINT_SECONDS = 1.6;
const ARC = 80;

export const buildRelay: SceneBuilder = (_scene, ctx) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
  const wins = ctx.beat("wins");
  const trail = ctx.beat("trail") as unknown as SVGPathElement;
  const fly = ctx.beat("fly");
  const show = (el: HTMLElement, at: number) => tl.fromTo(el, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: "ynw-standard" }, at);

  ctx.lightSteps(tl, [0, ASK_AT, FLY_AT - 0.4, LAND_AT]);

  show(ctx.beat("win-from"), 0.1);
  show(ctx.beat("win-to"), 0.3);
  show(ctx.beat("order"), 0.7);
  const ask = ctx.beat("ask");
  show(ask, ASK_AT);
  ctx.typeText(tl, ask.querySelector<HTMLElement>(".rl-bubble")!, ASK_AT + 0.2, 0.035);

  /* Flight: a manual progress tween along the measured path (no MotionPath plugin). */
  let length = 0;
  const measure = () => {
    const box = wins.getBoundingClientRect();
    const from = ctx.beat("ask").getBoundingClientRect();
    const to = ctx.beat("chip").getBoundingClientRect();
    const sx = from.right - box.left;
    const sy = from.top + from.height / 2 - box.top;
    const ex = to.left + to.width / 2 - box.left;
    const ey = to.top + to.height / 2 - box.top;
    const sideBySide = Math.abs(ex - sx) > Math.abs(ey - sy);
    const [c1, c2] = sideBySide
      ? [`${sx + (ex - sx) * 0.5} ${sy - ARC}`, `${ex - (ex - sx) * 0.5} ${ey - ARC}`]
      : [`${sx + ARC} ${sy + (ey - sy) * 0.5}`, `${ex + ARC} ${ey - (ey - sy) * 0.5}`];
    trail.closest("svg")!.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
    trail.setAttribute("d", `M ${sx} ${sy} C ${c1}, ${c2}, ${ex} ${ey}`);
    length = trail.getTotalLength();
    trail.style.strokeDasharray = String(length);
  };
  ctx.onRevert(() => {
    trail.removeAttribute("d");
    trail.style.strokeDasharray = "";
    trail.style.strokeDashoffset = "";
    length = 0;
  });
  const place = (progress: number) => {
    if (!length) measure();
    const point = trail.getPointAtLength(progress * length);
    trail.style.strokeDashoffset = String(length * (1 - progress));
    gsap.set(fly, { x: point.x, y: point.y, xPercent: -50, yPercent: -50 });
  };
  const flight = { p: 0 };
  tl.fromTo(fly, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)", onStart: () => place(0) }, FLY_AT - 0.3);
  tl.to(flight, { p: 1, duration: FLY_SECONDS, ease: "power2.inOut", onUpdate: () => place(flight.p) }, FLY_AT);
  tl.set(fly, { autoAlpha: 0 }, LAND_AT);
  tl.to(trail, { autoAlpha: 0, duration: 0.4 }, LAND_AT);

  show(ctx.beat("posted"), LAND_AT - 0.1);
  show(ctx.beat("sys"), LAND_AT + 0.4);

  /* Receipt: lines appear from the top, then the Actor line is highlighted. */
  const receipt = ctx.beat("receipt");
  const actor = ctx.beat("actor");
  tl.fromTo(receipt, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: PRINT_SECONDS, ease: "steps(12)" }, PRINT_AT);
  tl.fromTo(actor, { "--u": "0%" }, { "--u": "100%", duration: 0.5, ease: "ynw-standard" }, PRINT_AT + PRINT_SECONDS);

  tl.to({}, { duration: 0.01 }, PRINT_AT + PRINT_SECONDS + 0.8);
  return tl;
};
