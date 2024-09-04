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
import { cookies } from "next/headers";

export default async function SuspenseLearning({
  params,
}: {
  params: { collection_id: string };
}) {
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

  if (!data) {
    return (
      <ErrorPage
        errorCode="401"
        message="You need to be logged in to access this page!"
        redirect="/auth"
      />
    );
  }

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

  if (
    !collectionWithCards.isPublic &&
    collectionWithCards.creatorId !== data.userId
  ) {
    notFound();
  }

  // Log the learned collection here because users can only learn collection that has cards
  await addCollectionToHistory(data.userId, collectionId);

  // Check if the user cookie has the collection id
  const learnHistoryCookie = cookies().get("learn-history-" + collectionId);
  let learnHistoryValue = learnHistoryCookie
    ? parseInt(learnHistoryCookie.value)
    : 0;

  return (
    <LearningCarousel
      collectionId={collectionWithCards.id}
      collectionName={collectionWithCards.name}
      cards={collectionWithCards.definitionCards}
    />
  );
}
