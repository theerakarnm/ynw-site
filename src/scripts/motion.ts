/**
 * YNW landing motion. Faithful TypeScript port of the reference motion.js
 * (_reference/motion.js): one gsap.matchMedia() with four branches -
 * pin (desktop, pinned + scrubbed), story (phones/tablets, CSS sticky + scrub),
 * flow (short windows, play once), reduced (fades only).
 * CSS default of every scene is its final state; this module only animates
 * hidden -> visible, so no-JS users see the complete page.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, ScrollToPlugin);

const PIN = "(min-width: 1024px) and (min-height: 700px) and (max-height: 1700px) and (prefers-reduced-motion: no-preference)";
const STORY = "(max-width: 1023.98px) and (min-height: 600px) and (max-height: 1700px) and (prefers-reduced-motion: no-preference)";
const FLOW =
  "(max-width: 1023.98px) and (max-height: 599.98px) and (prefers-reduced-motion: no-preference), (min-width: 1024px) and (max-height: 699.98px) and (prefers-reduced-motion: no-preference), (min-height: 1700.02px) and (prefers-reduced-motion: no-preference)";
const REDUCED = "(prefers-reduced-motion: reduce)";

CustomEase.create("ynw-standard", "0.2,0,0,1");
CustomEase.create("ynw-out", "0,0,0,1");
ScrollTrigger.config({ ignoreMobileResize: true });

/* ---------- LED wave (vanilla canvas) ---------- */
const PALETTE = ["#eab46c", "#ec9141", "#ed662e", "#ee4821", "#eb1515", "#30151a"];

interface WaveState {
  t: number;
  amp: number;
  pointer: number;
  pointerX: number;
  crest: number;
}

function createWave(canvas: HTMLCanvasElement, hero: HTMLElement, reduced: boolean) {
  const ctx = canvas.getContext("2d")!;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let pitch = 8;
  let cols = 0;
  let rows = 0;
  let xs: Float32Array = new Float32Array(0);
  let ys: Float32Array = new Float32Array(0);
  const base = document.createElement("canvas");
  const state: WaveState = { t: 0, amp: 1, pointer: 0, pointerX: -9999, crest: -1 };
  let bright = 0;
  let running = false;
  let visible = true;
  const buckets: number[][] = PALETTE.slice(0, 5).map(() => []);

  function resize() {
    const box = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(box.width));
    h = Math.max(1, Math.round(box.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    pitch = w < 640 ? 10 : 8;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    cols = Math.ceil(w / pitch);
    rows = Math.ceil(h / pitch);
    xs = new Float32Array(cols);
    ys = new Float32Array(rows);
    for (let i = 0; i < cols; i++) xs[i] = i * pitch + pitch / 2;
    for (let i = 0; i < rows; i++) ys[i] = i * pitch + pitch / 2;
    base.width = canvas.width;
    base.height = canvas.height;
    const b = base.getContext("2d")!;
    b.setTransform(dpr, 0, 0, dpr, 0, 0);
    b.fillStyle = PALETTE[5];
    const size = pitch < 10 ? 3 : 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) b.fillRect(xs[c] - size / 2, ys[r] - size / 2, size, size);
    }
    draw();
  }

  function crestAt(x: number): number {
    const t = state.t;
    const y =
      Math.sin(x * 0.0052 - t * 0.9) * 0.55 +
      Math.sin(x * 0.0121 - t * 1.4 + 1.7) * 0.3 +
      Math.sin(x * 0.0243 - t * 2.1 + 0.6) * 0.15;
    let lift = 0;
    if (state.pointer > 0) {
      const d = Math.abs(x - state.pointerX);
      if (d < 160) {
        const k = 1 - d / 160;
        lift += k * k * 26 * state.pointer;
      }
    }
    bright = 0;
    if (state.crest >= 0) {
      const cx = state.crest * (w + 320) - 160;
      const dc = Math.abs(x - cx);
      if (dc < 160) {
        const kc = 1 - dc / 160;
        bright = kc * kc;
        lift += bright * 34;
      }
    }
    return h * 0.46 - y * h * 0.2 * state.amp - lift;
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(base, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const size = pitch < 10 ? 3 : 4;
    for (const bucket of buckets) bucket.length = 0;
    for (let c = 0; c < cols; c++) {
      const cy = crestAt(xs[c]);
      const boost = bright;
      for (let r = 0; r < rows; r++) {
        const d = ys[r] - cy;
        let idx = d < 0 ? Math.floor(-d / (pitch * 0.9)) : Math.floor(d / (pitch * 1.7));
        if (d < 0 && idx > 1) continue;
        idx = idx - Math.round(boost * 2);
        if (idx > 4) continue;
        if (idx < 0) idx = 0;
        buckets[idx].push(xs[c], ys[r]);
      }
    }
    for (let i = 0; i < buckets.length; i++) {
      const list = buckets[i];
      if (!list.length) continue;
      ctx.fillStyle = PALETTE[i];
      for (let p = 0; p < list.length; p += 2) ctx.fillRect(list[p] - size / 2, list[p + 1] - size / 2, size, size);
    }
  }

  function tick(time: number) {
    state.t = time;
    draw();
  }
  function sync() {
    const should = !reduced && visible && !document.hidden;
    if (should === running) return;
    running = should;
    if (should) gsap.ticker.add(tick);
    else gsap.ticker.remove(tick);
  }
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    sync();
  });
  const ro = new ResizeObserver(() => resize());

  let pointerTo: ((value: number) => gsap.core.Tween) | null = null;
  function onPointer(e: PointerEvent) {
    const box = canvas.getBoundingClientRect();
    state.pointerX = e.clientX - box.left;
    if (pointerTo) pointerTo(e.clientY > box.top - 40 ? 1 : 0);
  }
  function onLeave() {
    if (pointerTo) pointerTo(0);
  }
  function onVisibility() {
    sync();
  }

  resize();
  io.observe(canvas);
  ro.observe(canvas);
  document.addEventListener("visibilitychange", onVisibility);
  if (!reduced && window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
    pointerTo = gsap.quickTo(state, "pointer", { duration: 0.32, ease: "ynw-standard" });
    hero.addEventListener("pointermove", onPointer);
    hero.addEventListener("pointerleave", onLeave);
  }
  sync();
  if (reduced) {
    state.t = 0;
    draw();
  }

  return {
    state,
    crest() {
      if (reduced) return;
      gsap.killTweensOf(state, "crest");
      gsap.fromTo(state, { crest: 0 }, { crest: 1, duration: 1.4, ease: "none", onComplete: () => (state.crest = -1) });
    },
    destroy() {
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(state);
    },
  };
}

/* ---------- Scene timelines. Positions are fractions of the scene, 0 to 1. ---------- */

type SceneMode = "pin" | "story" | "flow" | "reduced";

/* One fromTo per target instead of a stagger: nested stagger tweens lose their start state when a
   refresh invalidates the timeline, which left later items visible before their turn. */
function each(tl: gsap.core.Timeline, targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, at: number, gap: number) {
  gsap.utils.toArray(targets).forEach((el, i) => {
    tl.fromTo(el as gsap.TweenTarget, { ...from }, { ...to }, at + i * gap);
  });
}

/* Story mode only: the headline is read first, then it hands its space to the demo. */
function collapseHead(tl: gsap.core.Timeline, scene: HTMLElement, at: number) {
  const head = scene.querySelector<HTMLElement>(".scene-head")!;
  const stage = scene.querySelector<HTMLElement>(".stage")!;
  tl.to(head, { autoAlpha: 0, y: -16, duration: 0.05 }, at);
  tl.fromTo(stage, { y: 0 }, { y: () => head.offsetTop - stage.offsetTop, duration: 0.07 }, at);
}

type MotionApi = {
  setRail: (rail: { active: number; visible: boolean }) => void;
  setDots: (dots: boolean) => void;
  setHeroLoop: (heroLoop: boolean) => void;
  getApproval: () => ApprovalState;
  setApproval: (approval: ApprovalState) => void;
};

type ApprovalState = "pending" | "approved" | "denied";

function buildAvatars(tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode) {
  const q = gsap.utils.selector(scene);
  const pin = mode === "pin";
  const story = mode === "story";
  const stage = q(".stage")[0] as HTMLElement;
  const origin = q(".seat-origin")[0] as HTMLElement;
  const cards = q(".seat-card");
  const you = q(".occ-you")[0] as HTMLElement;
  const agent = q(".occ-agent")[0] as HTMLElement;
  const mali = q(".occ-mali")[0] as HTMLElement;
  if (pin || story) {
    const dx = () => stage.offsetWidth / 2 - (origin.offsetLeft + origin.offsetWidth / 2);
    tl.fromTo(origin, { x: dx, scale: story ? 1.4 : 1.6 }, { x: 0, scale: 1, duration: 0.3 }, 0.25);
  }
  if (story) collapseHead(tl, scene, 0.2);
  each(tl, cards, { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.16 }, 0.28, 0.035);
  if (!pin) tl.fromTo(q(".spine"), { scaleY: 0 }, { scaleY: 1, duration: 0.3 }, 0.28);
  each(tl, q(".seat-lines path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.2 }, 0.3, 0.03);
  tl.fromTo(q(".seat-thread"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.07 }, 0.55);
  if (story) tl.to([cards[0], cards[2]], { opacity: 0.35, duration: 0.06 }, 0.58);
  gsap.set(you, { autoAlpha: 1 });
  gsap.set([agent, mali], { autoAlpha: 0 });
  tl.to(you, { autoAlpha: 0, duration: 0.02 }, 0.68);
  tl.to(agent, { autoAlpha: 1, duration: 0.02 }, 0.69);
  tl.to(agent, { autoAlpha: 0, duration: 0.02 }, 0.84);
  tl.to(mali, { autoAlpha: 1, duration: 0.02 }, 0.85);
  tl.to({}, { duration: 0.01 }, 0.99);
}

function buildAgents(tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode, api: MotionApi) {
  const q = gsap.utils.selector(scene);
  const steps = q(".ynw-step") as unknown as HTMLElement[];
  const tools = q(".agents-tool") as unknown as HTMLElement[];
  if (mode === "story") collapseHead(tl, scene, 0.1);
  tl.fromTo(q(".agents-nok"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.02);
  tl.fromTo(q(".agents-agent"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.05 }, 0.15);
  tl.fromTo(q(".agents-plan"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.06 }, 0.22);
  tl.fromTo(tools[0], { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.09 }, 0.3);
  tl.fromTo(tools[1], { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.09 }, 0.46);
  tl.to(q(".agents-agent"), { autoAlpha: 0, duration: 0.03 }, 0.3);
  tl.fromTo(q(".agents-handoff"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.7);
  tl.to({}, { duration: 0.01 }, 0.99);

  function status(el: HTMLElement, value: string) {
    if (el.getAttribute("data-status") !== value) el.setAttribute("data-status", value);
  }
  function run(el: HTMLElement, value: string) {
    if (el.getAttribute("data-run") !== value) el.setAttribute("data-run", value);
  }
  let dots = false;
  function apply() {
    const p = tl.progress();
    status(steps[0], p < 0.3 ? "pending" : p < 0.45 ? "running" : "done");
    status(steps[1], p < 0.45 ? "pending" : p < 0.6 ? "running" : "done");
    status(steps[2], p < 0.85 ? "pending" : "running");
    run(tools[0], p < 0.45 ? "running" : "done");
    run(tools[1], p < 0.6 ? "running" : "done");
    const dotsOn = p >= 0.14 && p < 0.33;
    if (dotsOn !== dots) {
      dots = dotsOn;
      api.setDots(dotsOn);
    }
  }
  tl.eventCallback("onUpdate", apply);
  apply();
  return function restore() {
    status(steps[0], "done");
    status(steps[1], "done");
    status(steps[2], "running");
    run(tools[0], "done");
    run(tools[1], "done");
    if (dots) api.setDots(false);
  };
}

function buildBackstage(tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode) {
  const q = gsap.utils.selector(scene);
  const pin = mode === "pin";
  const story = mode === "story";
  const front = q(".split-front")[0] as HTMLElement;
  if (pin) {
    const dx = () => front.offsetWidth / 2 + 20;
    tl.fromTo(front, { x: dx }, { x: 0, duration: 0.3 }, 0.02);
    tl.fromTo(q(".split-rule"), { scaleY: 0 }, { scaleY: 1, duration: 0.2 }, 0.14);
    tl.fromTo(q(".split-back"), { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.14 }, 0.24);
  } else {
    if (story) {
      collapseHead(tl, scene, 0.14);
      tl.fromTo(front, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.02);
      tl.fromTo(q(".split-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.14 }, 0.16);
    }
    tl.fromTo(q(".split-back"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.24);
  }
  tl.fromTo(q(".back-summary"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.4);
  tl.fromTo(q(".back-mali"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.5);
  tl.fromTo(q(".back-draft"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.6);
  if (pin || story) {
    gsap.set(q(".layer-home"), { autoAlpha: 0, y: 12 });
    tl.to(q(".layer-work"), { autoAlpha: 0, y: -12, duration: 0.08 }, 0.72);
    tl.to(q(".layer-home"), { autoAlpha: 1, y: 0, duration: 0.08 }, 0.8);
  } else {
    tl.fromTo(q(".layer-home"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.78);
  }
  tl.to({}, { duration: 0.01 }, 0.99);
}

function buildApprovals(tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode, page: HTMLElement) {
  const q = gsap.utils.selector(scene);
  const pin = mode === "pin";
  const story = mode === "story";
  const col = q(".approve-col")[0] as HTMLElement;
  const card = q(".approval-card")[0] as HTMLElement;
  const marker = q(".ladder-marker")[0] as HTMLElement;
  const ladder = q(".ladder-col")[0] as HTMLElement;
  /* Story mode shows the card and the ladder one after the other in the same space. */
  const at = story ? { rule: 0.66, row: 0.68, marker: 0.76, ask: 0.82, move: 0.9 } : { rule: 0.55, row: 0.57, marker: 0.66, ask: 0.76, move: 0.86 };
  if (pin) {
    const dx = () => (col.offsetWidth + 40) / 2;
    const dim = [q(".scene-head")[0], q(".approve-nok")[0], q(".scene-caption")[0], page.querySelector(".rail-steps")];
    tl.fromTo(dim, { opacity: 1 }, { opacity: 0.3, duration: 0.2 }, 0);
    tl.fromTo(card, { y: 48, x: dx }, { y: 0, x: dx, duration: 0.2 }, 0);
    tl.to(card, { x: 0, duration: 0.05 }, 0.52);
    tl.to(dim, { opacity: 1, duration: 0.05 }, 0.52);
    tl.set(ladder, { autoAlpha: 1 }, 0.54);
    gsap.set(ladder, { autoAlpha: 0 });
  }
  if (story) {
    const dimStory = [q(".approve-nok")[0], q(".scene-caption")[0], page.querySelector(".rail-steps")];
    collapseHead(tl, scene, 0.1);
    tl.fromTo(dimStory, { opacity: 1 }, { opacity: 0.3, duration: 0.2 }, 0);
    tl.fromTo(card, { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.08);
    tl.to(dimStory, { opacity: 1, duration: 0.05 }, 0.52);
    tl.to(col, { autoAlpha: 0, y: -16, duration: 0.05 }, 0.62);
    tl.set(ladder, { autoAlpha: 1 }, 0.66);
    gsap.set(ladder, { autoAlpha: 0 });
  }
  each(tl, q(".ladder-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.1 }, at.rule, 0.015);
  each(tl, q(".ladder-row > :not(.ladder-rule)"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, at.row, 0.004);
  gsap.set(marker, { y: 0, yPercent: 100, autoAlpha: 0 });
  tl.to(marker, { autoAlpha: 1, duration: 0.03 }, at.marker);
  tl.fromTo(q(".ladder-ask"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.07 }, at.ask);
  tl.to(marker, { yPercent: 200, duration: 0.08 }, at.move);
  tl.to({}, { duration: 0.01 }, 0.99);
}

function buildWorkspace(tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode) {
  const q = gsap.utils.selector(scene);
  const story = mode === "story";
  if (story) collapseHead(tl, scene, 0.08);
  each(tl, q(".net-card"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.14 }, story ? 0.14 : 0.02, 0.05);
  if (mode !== "pin") tl.fromTo(q(".spine"), { scaleY: 0 }, { scaleY: 1, duration: 0.3 }, 0.32);
  each(tl, q(".net-lines path"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.18 }, 0.32, 0.03);
  tl.fromTo(q(".net-node"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.7);
  tl.to({}, { duration: 0.01 }, 0.99);
}

/* ---------- Section reveal: hairline, eyebrow, headline lines, lead ---------- */
function reveal(scene: HTMLElement) {
  const q = gsap.utils.selector(scene);
  const rule = q(".head-rule")[0] as HTMLElement;
  const eyebrow = q(".head-eyebrow")[0] as HTMLElement;
  const title = q(".head-title")[0] as HTMLElement;
  const lead = q(".head-lead")[0] as HTMLElement;
  const trigger = { trigger: scene, start: "top 72%", once: true } as ScrollTrigger.Vars;
  const tl = gsap.timeline({ scrollTrigger: trigger, defaults: { ease: "ynw-standard" } });
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, 0);
  tl.fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.32 }, 0.12);
  tl.fromTo(lead, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
  SplitText.create(title, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    linesClass: "h-line",
    onSplit: (self) =>
      gsap.fromTo(
        self.lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "ynw-out",
          scrollTrigger: { trigger: scene, start: "top 72%", once: true },
        },
      ),
  });
}

/* ---------- Mount ---------- */
export function mount(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>(".hero")!;
  const sections = gsap.utils.toArray(root.querySelectorAll<HTMLElement>(".scene[data-step]")) as HTMLElement[];
  const mm = gsap.matchMedia();
  const railEl = root.querySelector<HTMLElement>(".rail");
  const statusEl = root.querySelector<HTMLElement>("#rail-status");
  const railSteps = root.querySelectorAll<HTMLElement>(".rail-step");
  const approvalCard = root.querySelector<HTMLElement>(".approval-card");

  const ui = {
    positions: [] as { top: number; pinned: boolean }[],
    mode: "flow" as SceneMode,
    active: 0,
    railVisible: false,
    complete: false,
    runSeconds: 0,
    approval: "pending" as ApprovalState,
    dots: false,
    heroLoop: true,
    wave: null as ReturnType<typeof createWave> | null,
  };

  function applyLoop() {
    root.setAttribute("data-loop", ui.dots ? "dots" : ui.heroLoop ? "hero" : "run");
  }

  function applyApproval(next: ApprovalState) {
    if (!approvalCard) return;
    approvalCard.setAttribute("data-approval", next);
    const resolved = next !== "pending";
    approvalCard.querySelectorAll<HTMLButtonElement>("[data-approval-action]").forEach((b) => (b.disabled = resolved));
  }

  function railStatusText(): string {
    if (ui.complete) {
      const m = Math.floor(ui.runSeconds / 60);
      const s = ui.runSeconds % 60;
      return `Run complete ▪ Finished in ${m ? `${m}m ` : ""}${s}s`;
    }
    if (ui.active === 4 && ui.approval === "pending") return "Waiting for approval";
    if (ui.active === 7) return "Waiting for you";
    return `Running step ${Math.max(ui.active, 1)} of ${railSteps.length}`;
  }

  function renderRail() {
    if (!railEl || !statusEl) return;
    railEl.setAttribute("data-visible", String(ui.railVisible));
    railEl.setAttribute("data-complete", String(ui.complete));
    statusEl.textContent = railStatusText();
    railSteps.forEach((step, i) => {
      const n = i + 1;
      let status = "pending";
      if (ui.complete || n < ui.active) status = "done";
      else if (n === ui.active) status = "running";
      step.setAttribute("data-status", status);
      if (n === ui.active) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
  }

  const api: MotionApi = {
    setRail(rail) {
      const changed = rail.active !== ui.active || rail.visible !== ui.railVisible;
      ui.active = rail.active;
      ui.railVisible = rail.visible;
      if (changed) renderRail();
    },
    setDots(dots) {
      ui.dots = dots;
      applyLoop();
    },
    setHeroLoop(heroLoop) {
      ui.heroLoop = heroLoop;
      applyLoop();
    },
    getApproval: () => ui.approval,
    setApproval(approval) {
      if (approval === ui.approval) return;
      ui.approval = approval;
      applyApproval(approval);
      onApproval(approval);
      renderRail();
    },
  };

  function measure() {
    ui.positions = sections.map((el) => {
      const box = el.parentElement && (el.parentElement as HTMLElement).classList.contains("pin-spacer") ? el.parentElement : el;
      const held = box !== el || (ui.mode === "story" && el.hasAttribute("data-pin"));
      return { top: (box as HTMLElement).getBoundingClientRect().top + window.scrollY, pinned: held };
    });
    updateRail();
  }

  function updateRail() {
    if (!ui.positions.length) return;
    const y = window.scrollY;
    const half = window.innerHeight * 0.5;
    let active = 0;
    for (let i = 0; i < ui.positions.length; i++) if (ui.positions[i].top - half <= y) active = i + 1;
    const railVisible = active > 0;
    api.setRail({ active, visible: railVisible });
  }

  function scrollToY(y: number, then?: () => void) {
    const instant = ui.mode === "reduced";
    gsap.to(window, {
      duration: instant ? 0 : 0.9,
      ease: "ynw-standard",
      scrollTo: { y, autoKill: true },
      overwrite: "auto",
      onComplete: then,
    });
  }

  function barOffset() {
    return window.innerWidth >= 1024 ? 72 : 112;
  }

  function jumpToStep(n: number) {
    const pos = ui.positions[n - 1];
    if (!pos) return;
    scrollToY(pos.pinned ? pos.top + 1 : pos.top - barOffset() + 56);
  }

  function jumpToForm(focusInput: boolean) {
    const heroInput = root.querySelector<HTMLInputElement>("#wl-email-hero");
    const closingInput = root.querySelector<HTMLInputElement>("#wl-email-closing");
    if (!heroInput || !closingInput) return;
    const mid = window.innerHeight / 2;
    const hd = Math.abs(heroInput.getBoundingClientRect().top - mid);
    const cd = Math.abs(closingInput.getBoundingClientRect().top - mid);
    const target = hd <= cd ? heroInput : closingInput;
    const y = target === heroInput ? 0 : target.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4;
    scrollToY(y, () => {
      if (focusInput) target.focus({ preventScroll: true });
    });
  }

  let approvalTween: gsap.core.Timeline | null = null;
  function onApproval(next: ApprovalState) {
    const q = gsap.utils.selector(root);
    const glow = q(".approval-glow")[0] as HTMLElement;
    const sent = q(".approve-sent")[0] as HTMLElement;
    if (!glow || !sent) return;
    if (approvalTween) approvalTween.kill();
    const instant = ui.mode === "reduced";
    if (next === "pending") {
      approvalTween = gsap
        .timeline()
        .set(sent, { clearProps: "opacity,transform" })
        .to(glow, { opacity: 1, duration: instant ? 0 : 0.2, ease: "ynw-standard" });
    } else {
      approvalTween = gsap.timeline().to(glow, { opacity: 0, duration: instant ? 0 : 0.32, ease: "ynw-standard" });
      if (next === "approved") {
        approvalTween.fromTo(sent, { opacity: 0, y: instant ? 0 : 12 }, { opacity: 1, y: 0, duration: instant ? 0 : 0.32, ease: "ynw-out" }, 0.08);
      }
    }
  }

  function onSignup(runSeconds: number) {
    ui.complete = true;
    ui.runSeconds = runSeconds;
    ui.wave?.crest();
    if (railEl) railEl.setAttribute("data-complete", "true");
    renderRail();
  }

  /* Approval demo buttons */
  approvalCard?.querySelectorAll<HTMLButtonElement>("[data-approval-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      api.setApproval(btn.dataset.approvalAction === "approve" ? "approved" : "denied");
    });
  });

  /* Rail step buttons + nav CTA */
  railSteps.forEach((step) => {
    step.addEventListener("click", () => jumpToStep(Number(step.dataset.step)));
  });
  root.querySelectorAll<HTMLElement>('[data-cta="jump-to-form"]').forEach((cta) => {
    cta.addEventListener("click", () => jumpToForm(true));
  });

  /* Signup + busy-dots events from the form module */
  root.addEventListener("ynw:signup", (e) => onSignup((e as CustomEvent<number>).detail));
  root.addEventListener("ynw:dots", (e) => api.setDots((e as CustomEvent<boolean>).detail));

  function heroIntro(q: ReturnType<typeof gsap.utils.selector>, reduced: boolean) {
    const eyebrow = q(".hero-eyebrow")[0] as HTMLElement;
    const lines = q(".sl-in");
    const lead = q(".hero-lead")[0] as HTMLElement;
    const mark = q(".hero-mark svg")[0] as HTMLElement;
    if (reduced) return;
    gsap
      .timeline({ defaults: { ease: "ynw-standard" } })
      .fromTo(eyebrow, { opacity: 0 }, { opacity: 1, duration: 0.32 }, 0)
      .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.08, ease: "ynw-out" }, 0.08)
      .fromTo(lead, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      .fromTo(mark, { yPercent: 30 }, { yPercent: 0, duration: 1, ease: "ynw-out" }, 0.2);
  }

  function sloganLoop(q: ReturnType<typeof gsap.utils.selector>) {
    const lit = q(".sl-lit") as unknown as HTMLElement[];
    let i = 0;
    let call: gsap.core.Tween | null = null;
    function next() {
      const prev = i;
      i = (i + 1) % lit.length;
      gsap.to(lit[prev], { opacity: 0, duration: 0.32, ease: "ynw-standard" });
      gsap.to(lit[i], { opacity: 1, duration: 0.32, ease: "ynw-standard" });
      call = gsap.delayedCall(3.2, next);
    }
    call = gsap.delayedCall(3.2, next);
    ScrollTrigger.create({
      trigger: hero,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (call) call.paused(!self.isActive);
      },
    });
    return () => {
      if (call) call.kill();
    };
  }

  function approvalRules(scene: HTMLElement, pin: boolean) {
    if (pin) {
      return (self: ScrollTrigger) => {
        const p = self.progress;
        const prev = (self as unknown as { __prevP?: number }).__prevP === undefined ? p : (self as unknown as { __prevP?: number }).__prevP!;
        (self as unknown as { __prevP?: number }).__prevP = p;
        if (p > 0.5 && api.getApproval() === "pending") api.setApproval("approved");
        if (prev >= 0.2 && p < 0.2 && api.getApproval() !== "pending") api.setApproval("pending");
      };
    }
    const card = scene.querySelector<HTMLElement>(".approval-card")!;
    ScrollTrigger.create({
      trigger: card,
      start: "top 96%",
      end: "bottom 28%",
      onLeave: () => {
        if (api.getApproval() === "pending") api.setApproval("approved");
      },
      onLeaveBack: () => {
        if (api.getApproval() !== "pending") api.setApproval("pending");
      },
    });
    return null;
  }

  mm.add({ pin: PIN, story: STORY, flow: FLOW, reduced: REDUCED }, (context) => {
    const cond = context.conditions as Record<string, boolean>;
    const mode: SceneMode = cond.pin ? "pin" : cond.story ? "story" : cond.reduced ? "reduced" : "flow";
    ui.mode = mode;
    root.setAttribute("data-motion", mode);
    const pin = mode === "pin";
    const story = mode === "story";
    const reduced = mode === "reduced";
    const q = gsap.utils.selector(root);
    const cleanups: Array<() => void> = [];

    ui.wave = createWave(q(".hero-wave")[0] as HTMLCanvasElement, hero, reduced);
    cleanups.push(() => ui.wave?.destroy());

    heroIntro(q, reduced);

    if (!reduced) {
      cleanups.push(sloganLoop(q));
      gsap.to(ui.wave.state, {
        amp: 0,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom 40%",
        onToggle: (self) => api.setHeroLoop(self.isActive),
      });
    } else {
      api.setHeroLoop(false);
    }

    const builders: Record<string, (tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode, extra?: unknown) => void | (() => void)> = {
      avatars: buildAvatars,
      agents: buildAgents as (tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode, extra?: unknown) => void | (() => void),
      backstage: buildBackstage,
      approvals: buildApprovals as (tl: gsap.core.Timeline, scene: HTMLElement, mode: SceneMode, extra?: unknown) => void | (() => void),
      workspace: buildWorkspace,
    };

    sections.forEach((scene) => {
      if (reduced) {
        gsap.fromTo(
          scene.querySelector(".scene-grid"),
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.32,
            ease: "ynw-standard",
            scrollTrigger: { trigger: scene, start: "top 90%", once: true },
          },
        );
        return;
      }
      reveal(scene);
      const build = builders[scene.id];
      if (!build) return;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      const restore = build(tl, scene, mode, scene.id === "approvals" ? root : api);
      if (typeof restore === "function") cleanups.push(restore);
      if (story) {
        tl.paused(false);
        ScrollTrigger.create({
          animation: tl,
          trigger: scene,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (scene.id === "approvals" ? approvalRules(scene, true) : null) || undefined,
        });
      } else if (pin) {
        const approvalUpdate = scene.id === "approvals" ? approvalRules(scene, true) : null;
        tl.paused(false);
        /* The reference nulls the auto-ScrollTrigger before pinning manually; the typed surface marks it readonly. */
        (tl as unknown as { scrollTrigger?: unknown }).scrollTrigger = null;
        ScrollTrigger.create({
          animation: tl,
          trigger: scene,
          start: "top top",
          end: "+=" + scene.getAttribute("data-pin") + "%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: approvalUpdate || undefined,
        });
      } else {
        ScrollTrigger.create({
          trigger: scene.querySelector(".stage"),
          start: "top 72%",
          once: true,
          onEnter: () => {
            gsap.to(tl, { progress: 1, duration: 1.2, ease: "ynw-standard" });
          },
        });
      }
    });

    if (!pin && !story) approvalRules(root.querySelector<HTMLElement>("#approvals")!, false);

    /* 05 Receipts: scrubbed, no pin. In flow it plays once. */
    const receipts = root.querySelector<HTMLElement>("#receipts")!;
    const rq = gsap.utils.selector(receipts);
    if (!reduced) {
      const rtl = gsap.timeline({ defaults: { ease: "none" } });
      each(rtl, rq(".dg-draw > *"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.3 }, 0, 0.03);
      rtl.fromTo(rq(".dg-fade"), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.32);
      rtl.fromTo(rq(".receipt"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.3);
      each(rtl, rq(".receipt-line"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.14 }, 0.4, 0.14);
      if (pin || story) {
        ScrollTrigger.create({
          animation: rtl,
          trigger: rq(".stage")[0],
          start: "top 82%",
          end: "bottom 62%",
          scrub: true,
          invalidateOnRefresh: true,
        });
      } else {
        rtl.pause();
        ScrollTrigger.create({
          trigger: rq(".stage")[0],
          start: "top 72%",
          once: true,
          onEnter: () => {
            gsap.to(rtl, { progress: 1, duration: 1.2, ease: "ynw-standard" });
          },
        });
      }

      /* 07 Wishlist: contour lines draw along the bottom. */
      gsap.fromTo(
        root.querySelectorAll(".contours path"),
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 1.2,
          stagger: 0.08,
          ease: "ynw-standard",
          scrollTrigger: { trigger: root.querySelector(".contours"), start: "top 96%", once: true },
        },
      );
    }

    /* Rail tracking */
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: updateRail });
    ScrollTrigger.addEventListener("refresh", measure);
    cleanups.push(() => ScrollTrigger.removeEventListener("refresh", measure));

    /* Keep the approval's visual state correct when a branch rebuilds */
    if (ui.approval !== "pending") onApproval(ui.approval);

    document.fonts.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.refresh();

    return function cleanup() {
      cleanups.forEach((fn) => fn());
      root.removeAttribute("data-motion");
      ui.active = 0;
      ui.railVisible = false;
    };
  });

  return {
    onApproval,
    onSignup,
    jumpToStep,
    jumpToForm,
    destroy() {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    },
  };
}

export function initMotion(): void {
  const root = document.body;
  if (!root.querySelector(".hero-wave")) return;
  mount(root);
}
