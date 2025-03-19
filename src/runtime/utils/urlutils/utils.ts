export function stripParams(fullPath: string) {
  return fullPath.split("?", 1)[0]!
}

export function ensureEndSlash(_uri: unknown) {
  const uri = `${_uri}`
  return uri.endsWith("/") ? uri : `${uri}/`
}

export function ensureStartSlash(_uri: unknown) {
  const uri = `${_uri}`
  return uri.startsWith("/") ? uri : `/${uri}`
}

export function noEndSlash(_uri: unknown) {
  const uri = `${_uri}`
  return uri.endsWith("/") ? uri.slice(0, -1) : uri
}

export function noStartSlash(_uri: unknown) {
  const uri = `${_uri}`
  return uri.startsWith("/") ? uri.slice(1) : uri
}

/**
 * Returns the last part of the uri
 */
export function uriPrevNode(uri: string) {
  return uri.split("/").slice(0, -1).pop() ?? ""
}

/**
 * Like python's string.format
 * Example: format('hello {name}', { name: 'John' })
 */
export function format(url: string, args: Record<string, any>) {
  return Object.entries(args).reduce((acc: string, [key, arg]) => acc.replace(`{${key}}`, arg), url)
}
