import { ensureEndSlash, ensureStartSlash, noEndSlash, noStartSlash } from "./utils"

export type PathRecord = Record<string, string | Record<string, any>>

export function createPaths<T extends PathRecord>(prefix: string, paths: T): Readonly<{ ["index"]: string } & T> {
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
  return Object.entries(paths).reduce((acc, [key, value]) => Object.assign(acc, { [key]: depthConvert(value) }), {
    index: ensureStartSlash(prefix)
  }) as Readonly<{ ["index"]: string } & T>
}

export function pathsEnsureEndSlash<T extends PathRecord>(paths: T): T {
  return Object.entries(paths).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, { [key]: typeof value === "string" ? ensureEndSlash(value) : pathsEnsureEndSlash(value) }),
    {}
  ) as T
}
