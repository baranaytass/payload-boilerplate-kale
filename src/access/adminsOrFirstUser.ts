import type { Access } from 'payload'
import type { User } from '../payload-types'

/**
 * Admins may create users; so may an anonymous request when no user exists yet.
 *
 * Without the second clause the collection deadlocks on a fresh database:
 * creating a user requires an admin, and there is no admin to create.
 */
export const adminsOrFirstUser: Access<User> = async ({ req }) => {
  if (req.user?.roles?.includes('admin')) {
    return true
  }

  const { totalDocs } = await req.payload.count({ collection: 'users', req })

  return totalDocs === 0
}
