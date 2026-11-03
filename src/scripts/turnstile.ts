/**
 * Cloudflare Turnstile, lazy-loaded. The script tag is injected on the first
 * focus of any email field (never on page load). Each wishlist form gets its
 * own explicit widget (tokens are single-use). With no PUBLIC_TURNSTILE_SITE_KEY
 * (local dev / mock mode) tokens resolve to "".
 */
import { turnstileSiteKey } from "@/data/site";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptState: "idle" | "loading" | "ready" | "failed" = "idle";
let loadPromise: Promise<TurnstileApi | null> | null = null;

function injectScript(): Promise<TurnstileApi | null> {
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.turnstile ?? null);
    script.onerror = () => {
      scriptState = "failed";
      resolve(null);
    };
    document.head.appendChild(script);
    scriptState = "loading";
  });
  return loadPromise;
}

export class TurnstileWidget {
  private tokenPromise: Promise<string>;
  private resolveToken: ((token: string) => void) | null = null;
  private widgetId: string | null = null;

  constructor(private container: HTMLElement) {
    this.tokenPromise = new Promise((resolve) => {
      this.resolveToken = resolve;
    });
  }

  /** Load + render the widget into the container. Resolves "" when disabled or failed. */
  async start(): Promise<void> {
    if (!turnstileSiteKey) {
      this.resolveToken?.("");
      return;
    }
    containerShow(this.container);
    const api = await injectScript();
    if (!api) {
      this.resolveToken?.("");
      return;
    }
    scriptState = "ready";
    const expired = () => {
      if (this.widgetId !== null) api.reset(this.widgetId);
    };
    this.widgetId = api.render(this.container, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (token: string) => this.resolveToken?.(token),
      "expired-callback": expired,
      "error-callback": () => this.resolveToken?.(""),
    });
  }

  token(): Promise<string> {
    return this.tokenPromise;
  }
}

function containerShow(container: HTMLElement): void {
  container.hidden = false;
}

/** Ensure a widget exists for the given form and return its token promise. */
export function ensureTurnstile(form: HTMLFormElement): TurnstileWidget | null {
  const container = form.querySelector<HTMLElement>("[data-turnstile]");
  if (!container) return null;
  const existing = formTurnstiles.get(form);
  if (existing) return existing;
  const widget = new TurnstileWidget(container);
  formTurnstiles.set(form, widget);
  void widget.start();
  return widget;
}

const formTurnstiles = new WeakMap<HTMLFormElement, TurnstileWidget>();

export const turnstileScriptState = () => scriptState;
