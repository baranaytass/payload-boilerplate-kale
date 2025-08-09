import type { User } from '../payload-types'

// Type guard to check if a user object is valid and has roles
function userHasRoles(user: unknown): user is User & { roles: Array<'admin' | 'editor'> } {
  return !!user && typeof user === 'object' && Array.isArray((user as User).roles)
}

export const checkRole = (allRoles: Array<'admin' | 'editor'> = [], user?: User | null): boolean => {
  if (userHasRoles(user)) {
    // Check if the user has at least one of the required roles
    return allRoles.some((role) => user.roles.includes(role))
  }
  return false
}