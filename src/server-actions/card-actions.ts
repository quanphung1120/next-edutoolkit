'use server'

import { getCollectionById } from '@/db/dto/collections'
import { addDefinitionCard, countDefinitionCards, deleteDefinitionCard } from '@/db/dto/definition-card'
import { getUserProfile } from '@/db/dto/profiles'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function handleAddDefinitionCard(collectionId: string, prevState: any, formData: FormData) {
  // Check if the collection belongs to the user!
  const { data } = await getUserProfile()
  if (!data) {
    revalidatePath('/', 'layout')
    redirect('/')
  }

  const collection = await getCollectionById(collectionId)
  if (!collection) {
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  }

  if (collection.creatorId !== data.userId) {
    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
  }
  // End of check

  const question = formData.get('question') as string
  const answer = formData.get('answer') as string

  if (!question || !answer) {
    return {
      message: 'Please fill out all fields',
      created: false,
      card: null
    }
  }

  if (question.length < 3) {
    return {
      message: 'Question is too short (min 3)',
      created: false,
      card: null
    }
  }

  if (answer.length < 3) {
    return {
      message: 'Answer is too short (min 3)',
      created: false,
      card: null
    }
  }

  if (question.length > 750) {
    return {
      message: 'Question is too long',
      created: false,
      card: null
    }
  }

  if (answer.length > 750) {
    return {
      message: 'Answer is too long',
      created: false,
      card: null
    }
  }

  const createdCardsAmount = await countDefinitionCards(collectionId)
  if (createdCardsAmount[0].count >= 45) {
    return {
      message: 'You have reached the maximum amount of cards in this collection',
      created: false,
      card: null
    }
  }
  const response = await addDefinitionCard(collectionId, question, answer)

  if (!response) {
    return {
      message: 'Failed to create card',
      created: false,
      card: null
    }
  }

  // Revalidate the collection page
  revalidatePath(`/dashboard/cards/${collectionId}`)

  return {
    message: 'Card created successfully',
    created: true,
    card: response
  }
}

export async function handleDeleteDefinitionCard(cardId: string) {
  const response = await deleteDefinitionCard(cardId)

  if (!response) {
    return {
      message: 'Failed to delete card',
      deleted: false
    }
  }

  revalidatePath(`/dashboard/cards/`, 'layout')

  return {
    message: 'Card deleted successfully',
    deleted: true
  }
}
