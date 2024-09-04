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
import { toast } from "@/components/ui/use-toast";
import { useCard } from "@/context/CardContext";
import { handleDeleteDefinitionCard } from "@/server-actions/card-actions";

interface DeleteConfirmProps {
  cardId: string;
}

export default function CardDeleteForm({ cardId }: DeleteConfirmProps) {
  const cardContext = useCard();
  const bindedHandleDefinitionDeleteCard = handleDeleteDefinitionCard.bind(
    null,
    cardId,
  );

  const [state, actionState] = useFormState(bindedHandleDefinitionDeleteCard, {
    message: "",
    deleted: false,
  });

  if (state && state.message && state.message !== "" && cardContext) {
    toast({
      title: state.deleted ? "Success" : "Error",
      description: state.message,
    });

    if (state.deleted) {
      const { removeDefCard } = cardContext;
      removeDefCard(cardId);
    }

    state.message = "";
    state.deleted = false;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            card.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={actionState}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
