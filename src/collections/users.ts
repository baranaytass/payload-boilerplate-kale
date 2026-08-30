import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import { adminsOrSelf } from '../access/adminsOrSelf'
import { adminsOrFirstUser } from '../access/adminsOrFirstUser'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
  },
  access: {
    read: adminsOrSelf,
    create: adminsOrFirstUser,
    update: adminsOrSelf,
    delete: admins,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      hooks: {
        beforeChange: [
          async ({ req, operation, value }) => {
            if (operation !== 'create') return value

            // The very first account has to be an admin: `create` is
            // admin-only, so a site whose first user is a plain 'user' can
            // never gain an administrator.
            const { totalDocs } = await req.payload.count({
              collection: 'users',
              req,
            })

            if (totalDocs === 0) return ['admin']

            return value
          },
        ],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        read: ({ req: { user } }) => user?.roles?.includes('admin') || false,
        create: ({ req: { user } }) => user?.roles?.includes('admin') || false,
        update: ({ req: { user } }) => user?.roles?.includes('admin') || false,
      },
    },
  ],
}

export default Users