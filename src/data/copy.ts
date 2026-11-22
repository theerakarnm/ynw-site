import type { Locale } from "@/lib/locale";
import * as en from "./content";
import * as th from "./content.th";

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
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
