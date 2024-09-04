"use server";

import {
  countCollectionsByCreatorId,
  createCollection,
  deleteCollection,
} from "@/db/dto/collections";
import { getUserProfile } from "@/db/dto/profiles";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function newCollectionAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name || !description) {
    return {
      message: "Please fill out all fields",
      created: false,
      collection: null,
    };
  }

  if (name.length < 3) {
    return {
      message: "Collection name is too short (min 3)",
      created: false,
      collection: null,
    };
  }

  if (description.length < 3) {
    return {
      message: "Collection description is too short (min 3)",
      created: false,
      collection: null,
    };
  }

  if (name.length > 50) {
    return {
      message: "Collection name is too long (max 50 characters)",
      created: false,
      collection: null,
    };
  }

  if (description.length > 255) {
    return {
      message: "Collection description is too long (max 255 characters)",
      created: false,
      collection: null,
    };
  }

  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/");
  }

  const collectionsCreatedAmount = await countCollectionsByCreatorId(
    data.userId,
  );
  if (!collectionsCreatedAmount || collectionsCreatedAmount >= 10) {
    return {
      message: "You have reached the maximum amount of collections",
      created: false,
      collection: null,
    };
  }

  const response = await createCollection(name, description, data.userId);

  if (!response) {
    return {
      message: "Failed to create collection",
      created: false,
      collection: null,
    };
  }
  const insertedRow = response.at(0);

  if (!insertedRow) {
    return {
      message: "Failed to create collection",
      created: false,
      collection: null,
    };
  }

  revalidatePath("/dashboard/collections", "layout");
  return {
    message: "Collection created",
    created: true,
    collection: {
      id: insertedRow.id,
      name: insertedRow.name,
      isPublic: insertedRow.isPublic,
      description: insertedRow.description,
      creatorId: insertedRow.creatorId,
      createdAt: insertedRow.createdAt,
      updatedAt: insertedRow.updatedAt,
    },
  };
}

export async function deleteCollectionAction(
  collectionId: string,
  prevState: any,
  formData: FormData,
) {
  const response = await deleteCollection(collectionId);

  if (!response) {
    return {
      message: "Failed to delete collection",
      deleted: false,
    };
  }

  revalidatePath("/dashboard/cards", "layout");
  redirect("/dashboard/cards");
}
