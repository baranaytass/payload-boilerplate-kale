import type { Access, AccessArgs } from 'payload'
import type { User } from '../payload-types'

export const adminsOrSelf: Access<User> = ({ req: { user }, id }: AccessArgs<User>) => {
  // Admins can always access
  if (user?.roles?.includes('admin')) {
    return true
  }

  // Logged in users can access their own document
  if (user && user.id === id) {
    return true
  }

  // Reject everyone else
  return false
}