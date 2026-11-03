/**
 * Lightweight product events -> POST /v1/events.
 * Batching: events queue and flush together (one beacon per event, fired in
 * one flush - the endpoint takes a single event per request). Transport is
 * navigator.sendBeacon with a JSON string body (text/plain content type, the
 * reliable beacon path), falling back to fetch keepalive.
 * Respect Do Not Track: when enabled, no events are sent at all.
 */
import { apiBase } from "@/data/site";
import { sendEvent } from "./api";
import { getAttribution } from "./attribution";

const SID_KEY = "ynw.sid";
const FLUSH_MS = 2_000;

interface QueuedEvent {
  name: string;
  props?: Record<string, unknown>;
  session_id: string;
  attribution: ReturnType<typeof getAttribution>;
}

let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

export function trackingAllowed(): boolean {
  const dnt = navigator.doNotTrack ?? (navigator as unknown as { msDoNotTrack?: string }).msDoNotTrack;
  return dnt !== "1" && dnt !== "yes";
}

function sessionId(): string {
  try {
    let sid = sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return "anon";
  }
}

export function track(name: string, props?: Record<string, unknown>): void {
  if (!trackingAllowed()) return;
  queue.push({ name, props, session_id: sessionId(), attribution: getAttribution() });
  if (timer === null) timer = setTimeout(flush, FLUSH_MS);
}

export function flush(): void {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  const events = queue;
  queue = [];
  for (const event of events) {
    const body = JSON.stringify(event);
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(`${apiBase}/v1/events`, body);
    } else {
      void sendEvent(event);
    }
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", flush, { once: false });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}
