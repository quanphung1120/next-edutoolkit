import Loading from "@/components/shared/Loading";
import {
  addCollectionToHistory,
  getCollectionWithCardsById,
} from "@/db/dto/collections";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ErrorPage from "@/components/shared/ErrorPage";
import { getUserProfile } from "@/db/dto/profiles";
import LearningCarousel from "@/components/learn/LearningCarousel";
import { getRequestContext } from "@cloudflare/next-on-pages";

export default async function SuspenseLearning(
  props: {
    params: Promise<{ collection_id: string }>;
  }
) {
  const params = await props.params;
  return (
    <Suspense fallback={<Loading />}>
      <Learning collectionId={params.collection_id} />
    </Suspense>
  );
}

interface LearningProps {
  collectionId: string | undefined;
}

async function Learning({ collectionId }: LearningProps) {
  if (!collectionId) notFound();

  const { data } = await getUserProfile();
  const collectionWithCards = await getCollectionWithCardsById(collectionId);

  if (!collectionWithCards || collectionWithCards.definitionCards.length < 1) {
    return (
      <ErrorPage
        errorCode="404"
        message="Collection does not has any cards!"
        redirect="/dashboard"
      />
    );
  }

  if (data) {
    // Log the learned collection here because users can only learn collection that has cards
    await addCollectionToHistory(data.userId, collectionId);
  }

  if (!collectionWithCards.isPublic) {
    return (
      <ErrorPage
        errorCode="403"
        message="You need to login to learn this collection!"
        redirect="/auth"
      />
    );
  }

  return (
    <LearningCarousel
      collectionId={collectionWithCards.id}
      collectionName={collectionWithCards.name}
      cards={collectionWithCards.definitionCards}
    />
  );
}
