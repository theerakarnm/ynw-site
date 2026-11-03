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
  void import("./motion").then((m) => m.initMotion());
}
