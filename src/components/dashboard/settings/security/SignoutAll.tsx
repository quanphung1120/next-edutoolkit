'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { signOutAllDevices } from '@/server-actions/security-action'

export default function SignoutAll() {
  return (
    <form action={signOutAllDevices}>
      <Card>
        <CardHeader>
          <CardTitle className='text-xl'>Globally Sign Out</CardTitle>
          <CardDescription className='text-primary'>
            Sign out from all devices that are currently logged in to your account.
          </CardDescription>
        </CardHeader>
        <CardFooter className='border-t p-6'>
          <Button variant='destructive' type='submit'>
            Click here to sign out
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
