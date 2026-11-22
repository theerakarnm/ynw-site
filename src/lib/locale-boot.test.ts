import { test } from "node:test"
import assert from "node:assert/strict"
import vm from "node:vm"
import { localeBootScript } from "./locale-boot.ts"

interface Device {
  languages?: string[]
  language?: string
  saved?: string
  storageThrows?: boolean
  path: string
  search?: string
  hash?: string
  docLang?: string
}

function boot(device: Device): string[] {
  const replaced: string[] = []
  const storage = {
    getItem(key: string) {
      if (device.storageThrows) throw new Error("blocked")
      return key === "ynw.locale" ? (device.saved ?? null) : null
    },
  }
  const context = {
    navigator: { languages: device.languages, language: device.language },
    localStorage: storage,
    location: {
      pathname: device.path,
      search: device.search ?? "",
      hash: device.hash ?? "",
      replace: (url: string) => replaced.push(url),
    },
    document: { documentElement: { lang: device.docLang ?? (device.path.startsWith("/en") ? "en" : "th") } },
  }
  vm.runInNewContext(localeBootScript, context)
  return replaced
}

test("th device on / stays", () => {
  assert.deepEqual(boot({ languages: ["th-TH"], path: "/" }), [])
})

test("en device on / with nothing saved goes to /en/", () => {
  assert.deepEqual(boot({ languages: ["en-US"], path: "/" }), ["/en/"])
})

test("other device language on / stays Thai", () => {
  assert.deepEqual(boot({ languages: ["ja-JP"], path: "/" }), [])
})

test("saved th beats an en device on /en/support/", () => {
  assert.deepEqual(boot({ languages: ["en-US"], saved: "th", path: "/en/support/" }), ["/support/"])
})

test("saved en on / goes to /en/", () => {
  assert.deepEqual(boot({ languages: ["th"], saved: "en", path: "/" }), ["/en/"])
})

test("/en/ with a th device and nothing saved stays", () => {
  assert.deepEqual(boot({ languages: ["th-TH"], path: "/en/" }), [])
})

test("query and hash survive the redirect", () => {
  assert.deepEqual(boot({ languages: ["en"], path: "/thanks/", search: "?t=abc&pos=3", hash: "#x" }), [
    "/en/thanks/?t=abc&pos=3#x",
  ])
})

test("blocked storage falls back to the device", () => {
  assert.deepEqual(boot({ languages: ["en-US"], storageThrows: true, path: "/" }), ["/en/"])
  assert.deepEqual(boot({ languages: ["th"], storageThrows: true, path: "/" }), [])
})

test("navigator.language is used when languages is missing", () => {
  assert.deepEqual(boot({ language: "en-GB", path: "/" }), ["/en/"])
})

test("a page that already matches does not redirect", () => {
  assert.deepEqual(boot({ languages: ["en-US"], path: "/en/", docLang: "en" }), [])
  assert.deepEqual(boot({ languages: ["en-US"], saved: "th", path: "/", docLang: "th" }), [])
})

test("junk saved value is ignored", () => {
  assert.deepEqual(boot({ languages: ["th"], saved: "fr", path: "/" }), [])
})
