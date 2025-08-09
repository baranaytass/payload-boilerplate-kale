import type { CollectionConfig } from 'payload'
import { checkRole } from '../access/checkRole'
import { admins } from '../access/admins'
import { adminsOrSelf } from '../access/adminsOrSelf'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'roles'],
  },
  access: {
    read: adminsOrSelf,
    create: admins,
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
      hooks: {
        beforeChange: [
          ({ req, data }) => {
            // First user becomes admin
            if (req.user) {
              return data.roles || ['user']
            }
            return ['admin']
          },
        ],
      },
      access: {
        read: ({ req }) => checkRole(['admin'], req.user),
        create: ({ req }) => checkRole(['admin'], req.user),
        update: ({ req }) => checkRole(['admin'], req.user),
      },
    },
  ],
}

export default Users