import type { Locale } from "@/lib/locale";
import * as en from "./content";
import * as th from "./content.th";

// Visible text widens to `string` so each locale can write its own. Identifiers and layout names are
// structure shared by both locales, so they keep their literal types.
type Structural = "id" | "layout";

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends object
        ? { readonly [K in keyof T]: K extends Structural ? T[K] : Widen<T[K]> }
        : T;

/** The English module, widened to its types: every locale supplies the same keys with plain strings. */
export type Copy = Widen<typeof import("./content")>;

// Assignability catches a missing Thai key; the reverse direction catches an extra one.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : never) : never;
const thaiShapeMatches: Same<Widen<typeof th>, Copy> = true;
void thaiShapeMatches;

const copies: Record<Locale, Copy> = { en, th };

export function copyFor(locale: Locale): Copy {
  return copies[locale];
}
