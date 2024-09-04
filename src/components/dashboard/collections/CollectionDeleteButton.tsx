"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { deleteCollectionAction } from "@/server-actions/collection-actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

interface DeleteCollectionButtonProps {
  collectionId: string;
}

export default function CollectionDeleteButton({
  collectionId,
}: DeleteCollectionButtonProps) {
  const bindedDeleteCollectionAction = deleteCollectionAction.bind(
    null,
    collectionId,
  );
  const [state, deleteAction] = useFormState(bindedDeleteCollectionAction, {
    message: "",
    deleted: false,
  });

  useEffect(() => {
    if (state && state.message) {
      toast({
        title: "Failed to delete collection",
        description: state.message,
      });
    }
  }, [state]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full"
          size="sm"
          type="submit"
          variant="destructive"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            collection and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteAction}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
