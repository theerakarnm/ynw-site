import { test } from "node:test"
import assert from "node:assert/strict"
import { localizePath, parseLocale, pathLocale, pickLocale } from "./locale.ts"
import type { Locale } from "./locale.ts"

const pick = (languages: string[], saved: Locale | null = null, urlLocale: Locale | null = null) =>
  pickLocale({ languages, saved, urlLocale })

test("story 13: th device is Thai", () => {
  assert.equal(pick(["th"]), "th")
  assert.equal(pick(["th-TH"]), "th")
})

test("story 14: en, en-US, en-GB devices are English", () => {
  for (const tag of ["en", "en-US", "en-GB"]) assert.equal(pick([tag]), "en", tag)
})

test("story 15: other languages fall back to Thai", () => {
  for (const tag of ["ja", "fr-FR", "zh-Hans"]) assert.equal(pick([tag]), "th", tag)
})

test("story 16: empty device list is Thai", () => {
  assert.equal(pick([]), "th")
})

test("story 24: en device, nothing saved, unprefixed URL is English; non-en device is Thai", () => {
  assert.equal(pick(["en-US"], null, pathLocale("/")), "en")
  assert.equal(pick(["ja"], null, pathLocale("/")), "th")
  assert.equal(pick(["th"], null, pathLocale("/support/")), "th")
})

test("story 25: URL locale beats the device when nothing is saved", () => {
  assert.equal(pick(["th"], null, "en"), "en")
  assert.equal(pick(["en"], null, "th"), "th")
})

test("story 26: saved beats device and URL in both directions", () => {
  assert.equal(pick(["en"], "th", "en"), "th")
  assert.equal(pick(["th"], "en", "th"), "en")
  assert.equal(pick([], "en", null), "en")
})

test("first matching device tag wins", () => {
  assert.equal(pick(["ja", "en-US", "th"]), "en")
  assert.equal(pick(["ja", "th", "en"]), "th")
})

test("case and underscore variants", () => {
  assert.equal(pick(["EN-us"]), "en")
  assert.equal(pick(["th_TH"]), "th")
  assert.equal(pick(["EN_gb"]), "en")
})

test("junk entries are skipped without throwing", () => {
  assert.equal(pick(["", "-", "_", "  ", "english", "ent", "en-US"]), "en")
  assert.equal(pick(["", "-", "xx"]), "th")
})

test("parseLocale accepts exact th and en only", () => {
  assert.equal(parseLocale("th"), "th")
  assert.equal(parseLocale("en"), "en")
  for (const v of ["EN", "en-US", "", " th", null, undefined, 1, {}]) assert.equal(parseLocale(v), null)
})

test("pathLocale names English only under /en", () => {
  for (const p of ["/en", "/en/", "/en/support/"]) assert.equal(pathLocale(p), "en", p)
  for (const p of ["/english/", "/entry/", "/", "/support/", "/support/en/"]) assert.equal(pathLocale(p), null, p)
})

test("localizePath maps between sibling URLs", () => {
  assert.equal(localizePath("/support/", "en"), "/en/support/")
  assert.equal(localizePath("/", "en"), "/en/")
  assert.equal(localizePath("/en/support/", "th"), "/support/")
  assert.equal(localizePath("/en/", "th"), "/")
  assert.equal(localizePath("/en", "th"), "/")
  assert.equal(localizePath("/support", "en"), "/en/support")
})

test("localizePath is idempotent and round trips", () => {
  for (const p of ["/", "/support/", "/privacy/", "/thanks/"]) {
    for (const l of ["th", "en"] as const) {
      const once = localizePath(p, l)
      assert.equal(localizePath(once, l), once)
    }
    assert.equal(localizePath(localizePath(p, "en"), "th"), p)
  }
  assert.equal(localizePath("/en/support/", "en"), "/en/support/")
})
