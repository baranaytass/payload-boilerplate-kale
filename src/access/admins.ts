import type { Access } from 'payload'
import type { User } from '../payload-types'

export const admins: Access<User> = ({ req: { user } }) => {
  if (!user) return false
  return user.roles?.includes('admin') || false
}