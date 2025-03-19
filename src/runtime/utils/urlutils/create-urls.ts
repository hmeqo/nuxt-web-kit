import { ensureStartSlash, noEndSlash, noStartSlash } from "./utils"

export type PathRecord = Record<string, string | Record<string, any>>

export function createUrls<T extends PathRecord>(prefix: string, urls: T): Readonly<{ ["index"]: string } & T> {
  prefix = noStartSlash(noEndSlash(prefix))

  const depthConvert = (obj: string | PathRecord) => {
    if (typeof obj === "string") {
      return ensureStartSlash(`${prefix}${ensureStartSlash(obj)}`)
    }
    const newObj: PathRecord = {}
    for (const k in obj) {
      if (typeof obj[k] === "string") {
        newObj[k] = ensureStartSlash(`${prefix}${obj[k]}`)
      } else {
        newObj[k] = depthConvert(obj[k]!)
      }
    }
    return newObj
  }
  return Object.entries(urls).reduce((acc, [key, value]) => Object.assign(acc, { [key]: depthConvert(value) }), {
    index: ensureStartSlash(prefix)
  }) as Readonly<{ ["index"]: string } & T>
}

export function urlsEnsureEndslash<T extends PathRecord>(urls: T): T {
  return Object.entries(urls).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: ensureStartSlash(value) }),
    {}
  ) as T
}
