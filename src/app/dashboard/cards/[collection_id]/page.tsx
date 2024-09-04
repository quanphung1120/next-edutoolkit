import { getCollectionWithCardsById } from "@/db/dto/collections";
import { getUserProfile } from "@/db/dto/profiles";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { CardProvider } from "@/context/CardContext";
import CardListing from "@/components/dashboard/cards/CardListing";
import CollectionInfo from "@/components/dashboard/collections/CollectionInformation";

export default async function SuspenseEditCard({
  params,
}: {
  params: { collection_id: string };
}) {
  return (
    <Suspense fallback={<Loading />}>
      <EditCard id={params.collection_id} />
    </Suspense>
  );
}

interface EditCardProps {
  id: string;
}

async function EditCard({ id }: EditCardProps) {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  const collection = await getCollectionWithCardsById(id);
  if (!collection) notFound();

  if (collection.creatorId !== data.userId) {
    notFound();
  }

  return (
    <CardProvider definitionCards={collection.definitionCards}>
      <section className="flex w-full flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="md:flex md:min-h-screen md:gap-14">
          <div className="mb-12">
            <CollectionInfo
              id={collection.id}
              name={collection.name}
              description={collection.description}
              authorName={data.displayName}
              createdAt={collection.createdAt}
              updatedAt={collection.updatedAt}
            />
          </div>
          <div className="hidden border-r border-primary-foreground md:flex" />
          <CardListing />
        </div>
      </section>
    </CardProvider>
  );
}
