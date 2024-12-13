'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signOutAllDevices() {
  const supabase = await createClient()
  await supabase.auth.signOut({ scope: 'global' })

  revalidatePath('/', 'layout')
  redirect('/')
}
