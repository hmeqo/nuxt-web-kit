import { useRouter } from "#imports"

export function navigateBack() {
  const router = useRouter()
  router.back()
}

export function refreshPage() {
  const router = useRouter()
  router.go(0)
}

export function routerRedirect(to: string, opts: { clearStates: boolean } = { clearStates: true }) {
  if (!to.startsWith("http")) to = `${location.origin}${to}`
  if (opts.clearStates && import.meta.client) sessionStorage.clear()
  location.href = to
}
