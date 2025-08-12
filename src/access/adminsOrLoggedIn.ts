import type { Access } from 'payload'
import type { User } from '../payload-types'

export const adminsOrLoggedIn: Access<User> = ({ req: { user } }) => {
  // Grant access if user is admin
  if (user?.roles?.includes('admin')) {
    return true
  }

  // Grant access if user is logged in
  return !!user
}