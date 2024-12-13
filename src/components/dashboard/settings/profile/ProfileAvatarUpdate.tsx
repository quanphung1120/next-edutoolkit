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
import { toast } from "@/components/ui/use-toast";
import { useRef, useState, useActionState } from "react";
import { uploadProfilePicture } from "@/server-actions/profile-action";

export default function Avatar() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [state, actionState] = useActionState(uploadProfilePicture, {
    message: "",
    uploaded: false,
  });

  if (state && state.message && state.message !== "") {
    toast({
      title: state.uploaded ? "Success" : "Error",
      description: state.message,
    });

    state.message = "";
    state.uploaded = false;

    // Reset the file input
    setPictureFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form action={actionState}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            This is your public profile picture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            ref={fileInputRef}
            id="pictureFile"
            name="pictureFile"
            type="file"
            accept=".jpg, .jpeg"
            // Handle file selection
            onChange={(e) => {
              if (!e.target.files || e.target.files.length === 0) {
                setPictureFile(null);
                return;
              }
              setPictureFile(e.target.files[0]);
            }}
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-6 align-middle">
          <SaveButton file={pictureFile} />
          <span className="text-sm text-muted-foreground">
            Only file under 3MB is allowed
          </span>
        </CardFooter>
      </Card>
    </form>
  );
}

interface SaveButtonProps {
  file: File | null;
}

function SaveButton({ file }: SaveButtonProps) {
  const { pending } = useFormStatus();
  return (
    // Validate the file
    (<Button type="submit" size="sm" disabled={pending || !validateFile(file)}>Save changes
          </Button>)
  );
}

function validateFile(file: File | null) {
  const FILE_SIZE_LIMIT = 3 * 1024 * 1024;
  if (!file) {
    return false;
  }
  if (file.size > FILE_SIZE_LIMIT) {
    return false;
  }
  if (!file.type.startsWith("image/")) {
    return false;
  }
  return true;
}
