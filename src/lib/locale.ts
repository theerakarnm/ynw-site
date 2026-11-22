// Each export must stay self-contained (no imports, no module constants):
// the head script serialises them with Function.prototype.toString.
export type Locale = "th" | "en"

export function parseLocale(value: unknown): Locale | null {
  return value === "th" || value === "en" ? value : null
}

export function pathLocale(pathname: string): Locale | null {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : null
}

export function localizePath(pathname: string, locale: Locale): string {
  const bare = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname
  if (locale === "th") return bare
  return bare === "/" ? "/en/" : "/en" + bare
}

export function pickLocale(input: {
  languages: readonly string[]
  saved: Locale | null
  urlLocale: Locale | null
}): Locale {
  if (input.saved) return input.saved
  if (input.urlLocale) return input.urlLocale
  for (const tag of input.languages) {
    const base = String(tag).split(/[-_]/)[0]?.toLowerCase()
    if (base === "en" || base === "th") return base
  }
  return "th"
}
