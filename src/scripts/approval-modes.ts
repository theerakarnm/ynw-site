/**
 * Approval Modes toggle. No GSAP: it sets data-mode on the scene (CSS switches the phone),
 * keeps aria-pressed in step and announces the change with `ynw:approval-mode`
 * so motion.ts can animate it when it is running.
 */
const MODES = ["allow", "auto", "ask"] as const;
export type ApprovalMode = (typeof MODES)[number];

function parseMode(value: string | undefined): ApprovalMode {
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
      if (scene.dataset.mode === mode) return;
      scene.dataset.mode = mode;
      buttons.forEach((other) => other.setAttribute("aria-pressed", String(other === button)));
      scene.dispatchEvent(new CustomEvent<ApprovalMode>("ynw:approval-mode", { detail: mode, bubbles: true }));
    });
  });
}
