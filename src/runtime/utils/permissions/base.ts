export function getPermission(...permissions: Permission[]): Permission | undefined {
  for (const p of permissions) {
    if (p.hasPermission()) return p
  }
}

export function hasPermission(...permissions: Permission[]): boolean {
  return !!getPermission(...permissions)
}

export type Permission = {
  hasPermission(): boolean
}

export function createPermission(hasPermission: Permission["hasPermission"]): Permission {
  return {
    hasPermission() {
      return hasPermission()
    }
  }
}
