import type { Access } from 'payload'
import type { User } from '../payload-types'
import { checkRole } from './checkRole'

export const adminsOrLoggedIn: Access<User> = ({ req: { user } }) => {
  // Grant access if user is admin
  if (checkRole(['admin'], user)) {
    return true
  }

  // Grant access if user is logged in
  return !!user
}