"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";
import { useEffect, useState, useActionState } from "react";
import { toast } from "@/components/ui/use-toast";
import { updateDisplayName } from "@/server-actions/profile-action";

interface DisplayNameProps {
  displayName: string | undefined;
}

export default function DisplayName({ displayName }: DisplayNameProps) {
  const [newDisplayName, setNewDisplayName] = useState(displayName);
  const [state, actionState] = useActionState(updateDisplayName, {
    message: "",
    updated: false,
  });

  useEffect(() => {
    if (state && state.message) {
      toast({
        title: state.updated ? "Success" : "Error",
        description: state.message,
      });

      if (state.updated) displayName = newDisplayName;
    }
  }, [state]);

  return (
    <form action={actionState}>
      <Card>
        <CardHeader>
          <CardTitle>Display Name</CardTitle>
          <CardDescription>
            This is the name that will be displayed in the profile page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            value={newDisplayName}
            onChange={(e) => setNewDisplayName(e.target.value)}
            placeholder="Display Name"
          />
        </CardContent>
        <CardFooter className="border-t p-6">
          <SaveButton
            oldDisplayName={displayName}
            newDisplayName={newDisplayName}
          />
        </CardFooter>
      </Card>
    </form>
  );
}

interface SaveButtonProps {
  newDisplayName: string | undefined;
  oldDisplayName: string | undefined;
}

function SaveButton({ newDisplayName, oldDisplayName }: SaveButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="sm"
      disabled={pending || newDisplayName?.trim() == oldDisplayName?.trim()}
    >
      Save changes
    </Button>
  );
}
