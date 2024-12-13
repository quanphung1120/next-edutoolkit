import Loading from '@/components/shared/Loading'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { getCollectionsFromHistory } from '@/db/dto/collections'
import { getUserProfile, getUserProfileById } from '@/db/dto/profiles'
import CollectionRecentStudy from '@/components/dashboard/general/CollectionRecentCarousel'
import { countDefinitionCards } from '@/db/dto/definition-card'
import { Separator } from '@/components/ui/separator'
import ExpertiseQuestioningBox from '@/components/dashboard/general/ExpertiseQuestioningBox'
import { getUserRoles } from '@/db/dto/users'
import { Button } from '@/components/ui/button'
import { CircleHelpIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

export interface RecentCollections {
  id: string
  name: string
  cardsAmount: number
  description: string | null
  authorName: string
  profilePicture: string | undefined
  createdAt: Date
  updatedAt: Date
}

export default function SuspenseGeneral() {
  return (
    <Suspense fallback={<Loading />}>
      <General />
    </Suspense>
  )
}

async function General() {
  const { data } = await getUserProfile()

  if (!data) {
    revalidatePath('/', 'layout')
    redirect('/')
  }

  const userRoles = await getUserRoles()

  userRoles.forEach((role) => {
    console.log(role)
  })

  const recentCollections = await getCollectionsFromHistory(data.userId)
  const parsedRecentCollections: RecentCollections[] = []

  if (recentCollections && recentCollections.length !== 0) {
    for (const learned of recentCollections) {
      const collection = learned.collection
      const cardsCount = await countDefinitionCards(collection.id)

      const { displayName, picture, userId } = learned.user

      let authorName: string = 'Anonymous User'
      if (displayName) {
        authorName = displayName
      }

      let profilePicture: string | undefined = undefined
      if (picture) {
        const supabase = await createClient()
        const path = `${userId}/${picture}`
        const { data } = supabase.storage.from('avatars').getPublicUrl(path)
        if (data) {
          profilePicture = data.publicUrl
        }
      }

      parsedRecentCollections.push({
        id: collection.id,
        name: collection.name,
        cardsAmount: cardsCount[0].count,
        description: collection.description,
        authorName,
        profilePicture,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt
      })
    }
  }

  return (
    <section className='grid gap-8 md:mx-12'>
      <h2 className='mt-4 flex items-center justify-start gap-1 align-middle text-sm font-semibold md:w-[95%]'>
        RECENTLY
        <Separator className='hidden md:block' />
      </h2>
      <CollectionRecentStudy collections={parsedRecentCollections} />

      {/* <h2 className="mt-4 flex items-center justify-start gap-1 align-middle text-sm font-semibold md:w-[95%]">
        QUESTIONS
        <Separator className="hidden md:block" />
      </h2>

      <div className="flex h-[195px] w-full items-center justify-center align-middle">
        <div className="flex flex-col items-center justify-center gap-3 align-middle">
          <CircleHelpIcon className="h-12 w-12 text-muted-foreground" />
          <h1 className="text-sm font-semibold">NO QUESTIONS</h1>
          <h2 className="text-muted-foreground">
            Feel free to ask a question here
          </h2>
          <Button>Ask question</Button>
        </div>
      </div> */}
      {/* <ExpertiseQuestioningBox
        category="Economy"
        isAnswered={false}
        question="Purposes of learning economy Purposes of learning economy Purposes of learning economy Purposes of learning economy Purposes of learning economy Purposes of learning economy"
      /> */}
    </section>
  )
}
