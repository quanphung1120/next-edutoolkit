import { getCollectionsByCreatorId } from "@/db/dto/collections";
import { Suspense } from "react";
import { getUserProfile } from "@/db/dto/profiles";
import { notFound } from "next/navigation";
import Loading from "@/components/shared/Loading";
import { CollectionProvider } from "@/context/CollectionContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/dashboard/collections/CollectionListingTable";
import { columns } from "@/components/dashboard/collections/CollectionListingColumn";

export default async function SuspenseCollection() {
  return (
    <Suspense fallback={<Loading />}>
      <Collection />
    </Suspense>
  );
}

async function Collection() {
  const { data } = await getUserProfile();

  if (!data) {
    notFound();
  }

  const collections = await getCollectionsByCreatorId(data.userId);

  return (
    <CollectionProvider collections={collections}>
      <div className="mt-6 h-full w-full">
        <div className="mx-12 hidden md:block">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Collections</CardTitle>
              <CardDescription>
                View and manage your collections here
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-3">
              <DataTable columns={columns} data={collections!} />
            </CardContent>
          </Card>
        </div>

        {/* Mobile view */}
        <div className="block md:hidden">
          <DataTable columns={columns} data={collections!} />
        </div>
      </div>
    </CollectionProvider>
  );
}
