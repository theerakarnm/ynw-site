/**
 * Language switch. The nav link already points at the sibling URL, so it works without JS;
 * this remembers the choice (read by the head script) before following it.
 */
import { localizePath, parseLocale } from "@/lib/locale";

export function initLocaleSwitch(): void {
  document.querySelectorAll<HTMLAnchorElement>("[data-locale-switch]").forEach((link) => {
    const target = parseLocale(link.dataset.localeSwitch);
    if (!target) throw new Error(`Unknown locale on language switch: ${link.dataset.localeSwitch}`);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      try {
        localStorage.setItem("ynw.locale", target);
      } catch {
        // Storage can be blocked; the switch must still navigate.
      }
      location.assign(localizePath(location.pathname, target) + location.search + location.hash);
    });
  });
}
