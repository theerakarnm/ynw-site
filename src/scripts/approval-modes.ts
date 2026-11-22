/**
 * Approval Modes toggle. No GSAP: it sets data-mode on the scene (CSS moves the action cards
 * between the lanes), keeps aria-pressed in step and announces the change with
 * `ynw:approval-mode` so motion.ts can glide the cards when it is running.
 */
const MODES = ["allow", "auto", "ask"] as const;
export type ApprovalMode = (typeof MODES)[number];
export type ApprovalModeChange = { mode: ApprovalMode; previous: ApprovalMode };

export function parseMode(value: string | undefined): ApprovalMode {
  const mode = MODES.find((m) => m === value);
  if (!mode) throw new Error(`Unknown approval mode: ${value}`);
  return mode;
}

export function initApprovalModes(): void {
  const scene = document.querySelector<HTMLElement>("[data-approval-modes]");
  if (!scene) return;
  const buttons = scene.querySelectorAll<HTMLButtonElement>("[data-mode-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const mode = parseMode(button.dataset.modeButton);
      const previous = parseMode(scene.dataset.mode);
      if (previous === mode) return;
      scene.dataset.mode = mode;
      buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      scene.dispatchEvent(new CustomEvent<ApprovalModeChange>("ynw:approval-mode", { detail: { mode, previous }, bubbles: true }));
    });
  });
}
