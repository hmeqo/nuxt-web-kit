import { createError, navigateTo } from "#imports"
import { hasPermission, type Permission } from "./base"

type RouteCase = {
  /**
   * authentication permissions
   * @default undefined
   */
  auth: Permission[]
  /**
   * redirect url when authentication succeeds
   * @default undefined
   */
  redirect?: string
  /**
   * whether to continue verifying other permissions when authentication succeeds
   * @default false
   */
  continueVerify?: boolean
}

type RouteAuthOptions = {
  /**
   * fallback url when authentication fails
   * @default undefined
   */
  fallback?: string
  /**
   * throw error if all authentication fails
   * @default false
   */
  showError?: boolean
}

export async function routeAuth(cases: RouteCase[], routeAuthOptions?: RouteAuthOptions) {
  const { fallback, showError } = routeAuthOptions || {}
  for (const { auth: permissions, redirect, continueVerify } of cases) {
    if (hasPermission(...permissions)) {
      if (redirect) return navigateTo(redirect)
      if (continueVerify !== true) return
    }
  }
  if (fallback) return navigateTo(fallback)
  if (showError) throw createError({ statusCode: 403 })
}
