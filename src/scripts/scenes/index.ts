/**
 * Scene registry and the shared SceneCtx. Every scene builder turns the final-state
 * DOM into a paused timeline; the player in motion.ts prepares, plays and replays it.
 */
import type gsap from "gsap";

type Timeline = ReturnType<typeof gsap.timeline>;
import { buildChat } from "./chat";
import { buildAssistant } from "./assistant";
import { buildAccounts } from "./accounts";
import { buildApprovalModes } from "./approval-modes";
import { buildWorkflows } from "./workflows";

export interface SceneCtx {
  reduced: boolean;
  /** The element marked `data-beat="<name>"` inside the scene. Throws when missing. */
  beat(name: string): HTMLElement;
  /** Register a function that restores DOM the timeline mutates (text, classes). */
  onRevert(fn: () => void): void;
  /** Type the element's own text from empty, keeping a leading `.mention` span coloured. */
  typeText(tl: Timeline, el: HTMLElement, at: number, perChar?: number): number;
  /** Count the element's number from `from` to `to`; toggles `.zero` at 0. */
  countTo(tl: Timeline, el: HTMLElement, from: number, to: number, at: number, duration: number): void;
  /** Show `start` now, then set each `[text, at]` change in turn. The final DOM text is restored on revert. */
  swapText(tl: Timeline, el: HTMLElement, start: string, changes: ReadonlyArray<readonly [string, number]>): void;
  /** The phone header parts and the panel wrapper. */
  phone(): { avatar: HTMLElement; name: HTMLElement; sub: HTMLElement; panel: HTMLElement };
  /** Fade and lift elements in, one by one. They take no room until their turn. */
  reveal(tl: Timeline, targets: HTMLElement | HTMLElement[], at: number, gap?: number): void;
  /** Make the sticker inside `el` bounce at `at`. */
  bob(tl: Timeline, el: HTMLElement, at: number): void;
  /** Dim the copy-column steps, then light step i at times[i]. */
  lightSteps(tl: Timeline, times: number[]): void;
  /** Fade the receipt line in at `at`. */
  showReceipt(tl: Timeline, at: number): void;
  /** Run the revert functions registered so far, newest first. */
  revert(): void;
}

export type SceneBuilder = (scene: HTMLElement, ctx: SceneCtx) => Timeline;

const TYPE_SECONDS_PER_CHAR = 0.045;

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function createSceneCtx(scene: HTMLElement, reduced: boolean): SceneCtx {
  const reverts: Array<() => void> = [];
  const onRevert = (fn: () => void) => void reverts.push(fn);

  return {
    reduced,
    onRevert,
    beat(name) {
      const el = scene.querySelector<HTMLElement>(`[data-beat="${name}"]`);
      if (!el) throw new Error(`Scene ${scene.id}: missing data-beat="${name}"`);
      return el;
    },
    typeText(tl, el, at, perChar = TYPE_SECONDS_PER_CHAR) {
      const original = el.innerHTML;
      const text = el.textContent ?? "";
      const mentionLength = el.querySelector(".mention")?.textContent?.length ?? 0;
      const render = (count: number) => {
        const typed = text.slice(0, count);
        el.innerHTML = mentionLength
          ? `<span class="mention">${escapeHtml(typed.slice(0, mentionLength))}</span>${escapeHtml(typed.slice(mentionLength))}`
          : escapeHtml(typed);
      };
      render(0);
      onRevert(() => (el.innerHTML = original));
      const progress = { count: 0 };
      const duration = text.length * perChar;
      tl.to(progress, { count: text.length, duration, ease: "none", onUpdate: () => render(Math.round(progress.count)) }, at);
      return at + duration;
    },
    countTo(tl, el, from, to, at, duration) {
      const text = el.textContent;
      const zero = el.classList.contains("zero");
      onRevert(() => {
        el.textContent = text;
        el.classList.toggle("zero", zero);
      });
      const progress = { value: from };
      tl.to(
        progress,
        {
          value: to,
          duration,
          ease: "ynw-out",
          onUpdate: () => {
            const value = Math.round(progress.value);
            el.textContent = String(value);
            el.classList.toggle("zero", value === 0);
          },
        },
        at,
      );
    },
    swapText(tl, el, start, changes) {
      const final = el.textContent;
      el.textContent = start;
      onRevert(() => (el.textContent = final));
      for (const [text, at] of changes) tl.call(() => (el.textContent = text), [], at);
    },
    phone() {
      const part = (selector: string) => {
        const el = scene.querySelector<HTMLElement>(selector);
        if (!el) throw new Error(`Scene ${scene.id}: missing ${selector}`);
        return el;
      };
      return { avatar: part("[data-phone-avatar]"), name: part("[data-phone-name]"), sub: part("[data-phone-sub]"), panel: part(".phone-panel") };
    },
    reveal(tl, targets, at, gap = 0.12) {
      const list = Array.isArray(targets) ? targets : [targets];
      list.forEach((el, i) => {
        const display = getComputedStyle(el).display;
        tl.fromTo(
          el,
          { autoAlpha: 0, y: 8, display: "none" },
          { autoAlpha: 1, y: 0, display, duration: 0.25, ease: "ynw-standard" },
          at + i * gap,
        );
      });
    },
    bob(tl, el, at) {
      const sticker = el.querySelector<HTMLElement>(".sticker");
      if (!sticker) throw new Error(`Scene ${scene.id}: no sticker in ${el.dataset.beat}`);
      onRevert(() => sticker.classList.remove("is-bob"));
      tl.call(() => sticker.classList.add("is-bob"), [], at);
    },
    lightSteps(tl, times) {
      scene.querySelectorAll<HTMLElement>(".scene-steps li").forEach((li, i) => {
        tl.fromTo(li, { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, times[i] ?? 0);
      });
    },
    showReceipt(tl, at) {
      const receipt = scene.querySelector<HTMLElement>(".scene-receipt");
      if (receipt) tl.fromTo(receipt, { opacity: 0 }, { opacity: 1, duration: 0.4 }, at);
    },
    revert() {
      while (reverts.length) reverts.pop()!();
    },
  };
}

export const sceneBuilders: Record<string, SceneBuilder> = {
  chat: buildChat,
  assistant: buildAssistant,
  accounts: buildAccounts,
  "approval-modes": buildApprovalModes,
  workflows: buildWorkflows,
};
