import { aHasPermission, Permission, type APermission } from "./base"

type RouteCase = {
  /**
   * authentication permissions
   * @default undefined
   */
  auth: (typeof APermission | APermission | typeof Permission | Permission)[]
  /**
   * redirect url when authentication successed
   * @default undefined
   */
  redirect?: string
  /**
   * fallback url when authentication fails
   * @default undefined
   */
  fallback?: string
  /**
   * stop auth propagation when authentication successed
   * @default false
   */
  stopOnAuth?: boolean
  /**
   * throw error if all authentication fails
   * @default false
   */
  showError?: boolean
}

export async function routeAuth(...cases: RouteCase[]) {
  for (const { auth: permissions, redirect, fallback, stopOnAuth, showError } of cases) {
    if (await aHasPermission(...permissions)) {
      if (redirect) return navigateTo(redirect)
      if (stopOnAuth) return
    } else {
      if (fallback) return navigateTo(fallback)
      if (showError) throw createError({ statusCode: 403 })
    }
  }
}
