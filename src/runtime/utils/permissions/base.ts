export function getPermission(...permissions: (typeof Permission | Permission)[]): Permission | undefined {
  for (const p of permissions) {
    const permission = p instanceof Permission ? p : new p()
    if (permission.hasPermission()) return permission
  }
}

export function hasPermission(...permissions: (typeof Permission | Permission)[]): boolean {
  return !!getPermission(...permissions)
}

export async function aGetPermission(
  ...permissions: (typeof APermission | typeof Permission | APermission | Permission)[]
): Promise<APermission | Permission | undefined> {
  for (const p of permissions) {
    const permission = p instanceof APermission || p instanceof Permission ? p : new p()
    if (await permission.hasPermission()) return permission
  }
}

export async function aHasPermission(
  ...permissions: (typeof APermission | typeof Permission | APermission | Permission)[]
): Promise<boolean> {
  return !!(await aGetPermission(...permissions))
}

export class Permission {
  hasPermission(): boolean {
    return true
  }
}

export class APermission {
  async hasPermission() {
    return true
  }
}

export function createPermission(hasPermission: () => boolean): typeof Permission {
  return class extends Permission {
    override hasPermission(): boolean {
      return hasPermission()
    }
  }
}

export function createAPermission(hasPermission: () => Promise<boolean>): typeof APermission {
  return class extends APermission {
    override async hasPermission() {
      return hasPermission()
    }
  }
}
