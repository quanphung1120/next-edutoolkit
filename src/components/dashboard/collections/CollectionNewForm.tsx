"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "@/components/ui/use-toast";
import { Collection } from "@/db/dto/collections";
import { newCollectionAction } from "@/server-actions/collection-actions";
import { useCollection } from "@/context/CollectionContext";
import { PlusIcon } from "lucide-react";

export default function NewCollectionForm() {
  const { addCollection } = useCollection();
  const [open, setOpen] = useState(false);
  const [state, actionState] = useActionState(newCollectionAction, {
    message: "",
    created: false,
    collection: null,
  });

  useEffect(() => {
    if (state && state.message) {
      toast({
        title: state.created ? "Success" : "Error",
        description: state.message,
      });

      if (state.created && state.collection) {
        const insertedCollection: Collection = { ...state.collection };
        addCollection(insertedCollection);
      }

      setOpen(false);
    }
  }, [state, addCollection]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="flex items-center justify-start align-middle"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New collection
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form action={actionState}>
          <DialogHeader>
            <DialogTitle>New Collection</DialogTitle>
            <DialogDescription>
              Create a new collection to organize your flashcards.
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-4" />
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col items-start justify-start gap-4 align-middle">
              <Label htmlFor="name">Collection Name</Label>
              <Input
                id="name"
                name="name"
                className="w-full"
                placeholder="Type your collection's name here"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-4 align-middle">
              <Label htmlFor="desscription">Collection Desscription</Label>
              <Textarea
                id="description"
                name="description"
                className="w-full"
                placeholder="Type your collection's description here."
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
      Create now
    </Button>
  );
}
