import type { clientStrings } from "@/data/content";

type Widen<T> = { -readonly [K in keyof T]: T[K] extends string ? string : Widen<T[K]> };
export type ClientStrings = Widen<typeof clientStrings>;

let cached: ClientStrings | null = null;

/** Copy for client scripts, serialised into #i18n by the layout. */
export function strings(): ClientStrings {
  if (cached) return cached;
  const el = document.getElementById("i18n");
  if (!el?.textContent) throw new Error("Missing #i18n strings element");
  const parsed: ClientStrings = JSON.parse(el.textContent);
  cached = parsed;
  return parsed;
}

/** Fills {name} placeholders; a placeholder without a value is a bug, so it throws. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    if (value === undefined) throw new Error(`Missing value for {${key}} in "${template}"`);
    return String(value);
  });
}
