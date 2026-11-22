import { copyFor } from "@/data/copy";
import type { Copy } from "@/data/copy";
import { pathLocale } from "./locale";
import type { Locale } from "./locale";

export function pageLocale(url: URL): Locale {
  return pathLocale(url.pathname) ?? "th";
}

/** The single way a component, page or layout reads copy: from the locale its URL names. */
export function copyOf(url: URL): Copy {
  return copyFor(pageLocale(url));
}

/** Every page renders once per locale: the Thai default at the root and English under /en/. */
export function localeStaticPaths() {
  return [{ params: { lang: undefined } }, { params: { lang: "en" } }];
}
