import type { Access } from 'payload'
import type { User } from '../payload-types'
import { checkRole } from './checkRole'

export const admins: Access<User> = ({ req: { user } }) => {
  return checkRole(['admin'], user)
}