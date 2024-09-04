import { Separator } from "@/components/ui/separator";
import CardNewForm from "../cards/CardNewButton";
import CollectionDeleteButton from "./CollectionDeleteButton";

interface CollectionListProps {
  id: string;
  name: string;
  description: string | null;
  authorName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function CollectionInfo({
  id,
  name,
  description,
  authorName,
  createdAt,
  updatedAt,
}: CollectionListProps) {
  return (
    <div>
      <div className="w-full md:w-max">
        <h1 className="flex w-full flex-wrap text-xl font-semibold md:w-[200px]">
          {name}
        </h1>
        <h2 className="flex w-full flex-wrap text-sm text-foreground/60 md:w-[200px]">
          {description ? description : "Do not set"}
        </h2>
        <Separator className="my-6" />
        <div>
          <div className="flex flex-col gap-1">
            <span className="flex flex-col gap-1">
              <div>Author:</div>
              <div className="text-foreground/60">{authorName}</div>
            </span>
            <span className="flex flex-col gap-1">
              <div>Created:</div>
              <div className="text-foreground/60">
                {createdAt.toLocaleDateString()}
              </div>
            </span>
            <span className="flex flex-col gap-1">
              <div>Last Updated:</div>
              <div className="text-foreground/60">
                {updatedAt.toLocaleDateString()}
              </div>
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-center gap-3 align-middle">
        <Separator className="mb-3 mt-6 w-full" />
        <CardNewForm collectionId={id} />
        <CollectionDeleteButton collectionId={id} />
      </div>
    </div>
  );
}
