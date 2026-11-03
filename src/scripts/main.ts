/**
 * Page boot. Runs on every page: attribution capture first, then form wiring,
 * then the motion module (landing page only - it is the only heavy script and
 * is loaded on demand).
 */
import { captureAttribution } from "@/lib/attribution";
import { initWishlistForms } from "./wishlist-form";
import { initThanksPage } from "./thanks-page";

captureAttribution();
initWishlistForms();

if (document.querySelector("[data-profile-form]")) {
  initThanksPage();
}

if (document.querySelector(".hero-wave")) {
  // The scroll story is a progressive enhancement; boot it on idle so page load
  // stays interactive (TBT) and the static final-state render is never blocked.
  const boot = () => void import("./motion").then((mod) => mod.initMotion());
  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(boot, { timeout: 2000 });
  } else {
    setTimeout(boot, 200);
  }
}
