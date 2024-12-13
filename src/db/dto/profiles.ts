import 'server-only'

import { db } from '@/db'
import { profilesTable } from '@/db/schema'
import { createClient } from '@/lib/supabase/server'
import { eq } from 'drizzle-orm'
import { cache } from 'react'

export const getUserProfileById = cache(async (userId: string) => {
  const response = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userId, userId)
  })

  if (!response) {
    return { profile: null }
  }

  let avatar = null
  if (response.picture) {
    const supabase = await createClient()
    const path = `${userId}/${response.picture}`
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    if (data) {
      avatar = data.publicUrl
    }
  }

  return {
    profile: {
      id: response.id,
      userId: response.userId,
      displayName: response.displayName,
      picture: avatar,
      birthdate: response.birthdate,
      updatedAt: response.updatedAt,
      createdAt: response.createdAt
    }
  }
})

export async function updateProfileDisplayName(userId: string, displayName: string) {
  const response = await db
    .update(profilesTable)
    .set({
      displayName
    })
    .where(eq(profilesTable.userId, userId))
    .execute()

  return response
}

export async function updateProfileAvatar(userId: string, picture: string) {
  const response = await db
    .update(profilesTable)
    .set({
      picture
    })
    .where(eq(profilesTable.userId, userId))
    .execute()

  return response
}

export async function updateProfileBirthdate(userId: string, birthdate: Date) {
  const response = await db
    .update(profilesTable)
    .set({
      birthdate
    })
    .where(eq(profilesTable.userId, userId))
    .execute()

  return response
}

// This function will not be cached since we want the up-to-date information
export async function isAuthenticated() {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  return user !== null
}

// This function will be cached to avoid unnecessary requests
export const getUserProfile = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: null }
  }

  const userId = user.id
  const response = await db.query.profilesTable.findFirst({
    where: eq(profilesTable.userId, userId)
  })

  if (!response) {
    return { data: null }
  }

  let avatar = null
  if (response.picture) {
    const path = `${userId}/${response.picture}`
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    if (data) {
      avatar = data.publicUrl
    }
  }

  const userProfile = {
    id: response.id,
    userId: response.userId,
    displayName: response.displayName,
    email: user.email,
    birthdate: response.birthdate,
    updatedAt: response.updatedAt,
    createdAt: response.createdAt,
    avatar
  }

  return { data: userProfile }
})
