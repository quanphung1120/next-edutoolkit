import 'server-only'

import { createClient } from '@/lib/supabase/server'
import { db } from '..'
import { eq } from 'drizzle-orm'
import { usersRolesTable } from '../schema'
import { cache } from 'react'

export const getUserRoles = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  const roles: string[] = []
  if (!user) return roles

  // Default role
  roles.push('user')

  const response = await db.query.usersRolesTable.findMany({
    where: eq(usersRolesTable.userId, user.id),
    with: {
      role: true
    }
  })

  if (response) {
    response.forEach((userRole) => {
      roles.push(userRole.role.name)
    })
  }

  return roles
})
