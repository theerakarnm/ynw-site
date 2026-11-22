/**
 * YNW landing motion: hero, section reveals, progress rail and the scene player.
 * One gsap.matchMedia() with two branches - animated (every scene plays once when its stage
 * scrolls into view; nothing is pinned) and reduced (fades only).
 * CSS default of every scene is its final state; scene timelines (scripts/scenes)
 * only animate hidden -> visible, so no-JS and reduced-motion users see the complete page.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { createSceneCtx, sceneBuilders, type SceneBuilder } from "./scenes";
import { animateApprovalMode } from "./scenes/approval-modes";
import type { ApprovalModeChange } from "./approval-modes";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, ScrollToPlugin);

const ANIMATED = "(prefers-reduced-motion: no-preference)";
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

/* ---------- Scene player ---------- */

type MotionApi = {
  setRail: (rail: { active: number; visible: boolean }) => void;
  setDots: (dots: boolean) => void;
  setHeroLoop: (heroLoop: boolean) => void;
};

/* A scene is prepared when it is still below the fold (hidden start state set), played once
   when it is in view, and shown in its final state when it is left or replayed. */
function createScenePlayer(scene: HTMLElement, build: SceneBuilder) {
  let timeline: gsap.core.Timeline | null = null;
  let revertTimeline: (() => void) | null = null;
  let played = false;

  function prepare() {
    if (timeline) return;
    const ctx = createSceneCtx(scene, false);
    const gsapContext = gsap.context(() => {
      timeline = build(scene, ctx);
    }, scene);
    revertTimeline = () => {
      gsapContext.revert();
      ctx.revert();
    };
  }
  function play() {
    if (played) return;
    played = true;
    prepare();
    timeline!.play(0);
  }
  function finish() {
    if (!timeline) return;
    played = true;
    timeline.progress(1, false);
  }
  function replay() {
    revertTimeline?.();
    timeline = null;
    played = false;
    play();
  }
  return { prepare, play, finish, replay };
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

  const ui = {
    positions: [] as { step: number; top: number }[],
    reduced: false,
    active: 0,
    railVisible: false,
    complete: false,
    runSeconds: 0,
    dots: false,
    heroLoop: true,
    wave: null as ReturnType<typeof createWave> | null,
  };

  function applyLoop() {
    root.setAttribute("data-loop", ui.dots ? "dots" : ui.heroLoop ? "hero" : "run");
  }

  function railStatusText(): string {
    if (ui.complete) {
      const m = Math.floor(ui.runSeconds / 60);
      const s = ui.runSeconds % 60;
      return `Run complete ▪ Finished in ${m ? `${m}m ` : ""}${s}s`;
    }
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
  };

  function measure() {
    ui.positions = sections.map((el) => ({ step: Number(el.dataset.step), top: el.getBoundingClientRect().top + window.scrollY }));
    updateRail();
  }

  function updateRail() {
    if (!ui.positions.length) return;
    const y = window.scrollY;
    const half = window.innerHeight * 0.5;
    let active = 0;
    for (const pos of ui.positions) if (pos.top - half <= y) active = pos.step;
    const railVisible = active > 0;
    api.setRail({ active, visible: railVisible });
  }

  function scrollToY(y: number, then?: () => void) {
    const instant = ui.reduced;
    gsap.to(window, {
      duration: instant ? 0 : 0.9,
      ease: "ynw-standard",
      scrollTo: { y, autoKill: true },
      overwrite: "auto",
      onComplete: then,
    });
  }

  function barOffset() {
    return window.innerWidth >= 1440 ? 72 : 112;
  }

  function jumpToStep(n: number) {
    const pos = ui.positions.find((p) => p.step === n);
    if (!pos) return;
    scrollToY(pos.top - barOffset() + 56);
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

  function onSignup(runSeconds: number) {
    ui.complete = true;
    ui.runSeconds = runSeconds;
    ui.wave?.crest();
    if (railEl) railEl.setAttribute("data-complete", "true");
    renderRail();
  }

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

  function playScene(scene: HTMLElement, build: SceneBuilder) {
    const player = createScenePlayer(scene, build);
    ScrollTrigger.create({ trigger: scene, start: "top 100%", once: true, onEnter: player.prepare });
    const stage = scene.querySelector<HTMLElement>(".stage")!;
    ScrollTrigger.create({ trigger: stage, start: "top 70%", end: "bottom top", onEnter: player.play, onLeave: player.finish });
    const disposers: Array<() => void> = [];
    const replay = scene.querySelector<HTMLButtonElement>("[data-replay]");
    if (replay) {
      replay.hidden = false;
      replay.addEventListener("click", player.replay);
      disposers.push(() => {
        replay.hidden = true;
        replay.removeEventListener("click", player.replay);
      });
    }
    if (scene.hasAttribute("data-approval-modes")) {
      const onMode = (e: Event) => {
        player.finish();
        animateApprovalMode(scene, (e as CustomEvent<ApprovalModeChange>).detail);
      };
      scene.addEventListener("ynw:approval-mode", onMode);
      disposers.push(() => scene.removeEventListener("ynw:approval-mode", onMode));
    }
    return () => disposers.forEach((dispose) => dispose());
  }

  mm.add({ animated: ANIMATED, reduced: REDUCED }, (context) => {
    const reduced = Boolean((context.conditions as Record<string, boolean>).reduced);
    ui.reduced = reduced;
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
      const build = sceneBuilders[scene.id];
      if (build) cleanups.push(playScene(scene, build));
    });

    /* Wishlist: contour lines draw along the bottom. */
    if (!reduced) {
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

    document.fonts.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.refresh();

    return function cleanup() {
      cleanups.forEach((fn) => fn());
      ui.active = 0;
      ui.railVisible = false;
    };
  });

  return {
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
