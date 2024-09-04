"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { handleAddDefinitionCard } from "@/server-actions/card-actions";
import { useCard } from "@/context/CardContext";

interface CardNewFormProps {
  collectionId: string;
}

export default function CardNewForm({ collectionId }: CardNewFormProps) {
  const { addDefCard } = useCard();

  const [open, setOpen] = useState(false);

  const bindedHandleAddDefinitionCard = handleAddDefinitionCard.bind(
    null,
    collectionId,
  );

  const [state, actionState] = useFormState(bindedHandleAddDefinitionCard, {
    message: "",
    created: false,
    card: null,
  });

  useEffect(() => {
    if (state && state.message && state.message !== "") {
      toast({
        title: state.created ? "Success" : "Error",
        description: state.message,
      });

      if (state.created && state.card) {
        addDefCard(state.card);
      }

      // Close the form dialog whether success or failure
      setOpen(false);
    }
  }, [state, addDefCard]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="sm">
          New Definition Card...
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form action={actionState}>
          <DialogHeader>
            <DialogTitle>New Definition Card</DialogTitle>
            <DialogDescription>
              Add a new definition card for your collection.
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-4" />
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col items-start justify-start gap-4 align-middle">
              <Label htmlFor="description">Question field</Label>
              <Textarea
                id="question"
                name="question"
                className="w-full"
                placeholder="Type your question here."
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-4 align-middle">
              <Label htmlFor="description">Answer field</Label>
              <Textarea
                id="answer"
                name="answer"
                className="min-h-52 w-full"
                placeholder="Type your answers here."
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      Save changes
    </Button>
  );
}
