"use server";

import {
  getUserProfile,
  updateProfileAvatar,
  updateProfileBirthdate,
  updateProfileDisplayName,
} from "@/db/dto/profiles";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateDisplayName(prevState: any, formData: FormData) {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  const displayName = formData.get("displayName") as string;
  await updateProfileDisplayName(data.userId, displayName);

  revalidatePath("/", "layout");
  return {
    message: "Display name updated",
    updated: true,
  };
}

export async function updateBirthdate(birthdate: Date | undefined) {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  if (!birthdate) {
    return {
      message: "No date provided",
      updated: false,
    };
  }
  revalidatePath("/", "layout");
  await updateProfileBirthdate(data.userId, birthdate);

  return {
    message: "Birthdate updated successfully",
    updated: true,
  };
}

export async function uploadProfilePicture(prevState: any, formData: FormData) {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  const picture = formData.get("pictureFile") as File;

  if (!picture) {
    return {
      uploaded: false,
      message: "No file provided",
    };
  }

  if (!picture.type.startsWith("image/")) {
    return {
      uploaded: false,
      message: "Invalid file type",
    };
  }

  const FILE_SIZE_LIMIT = 3 * 1024 * 1024;
  if (picture.size > FILE_SIZE_LIMIT) {
    return {
      uploaded: false,
      message: "File too large",
    };
  }

  const supabase = createClient();
  const path = `${data.userId}/${picture.name}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(path, picture);

  if (error) {
    console.warn("Error uploading file: ", error.message);
    return {
      uploaded: false,
      message: error.message,
    };
  }

  await updateProfileAvatar(data.userId, picture.name);

  // Revalidate the layout to update the profile picture
  revalidatePath("/", "layout");

  return {
    message: "File uploaded",
    uploaded: true,
  };
}
