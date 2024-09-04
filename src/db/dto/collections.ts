import "server-only";
import { db } from "@/db";
import { collectionsTable, learnedCollectionsTable } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { isValidPostgresUUID } from "@/lib/utils";
import { cache } from "react";

export interface Collection {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getCollectionById(id: string) {
  if (!isValidPostgresUUID(id)) {
    return null;
  }

  const response = await db.query.collectionsTable.findFirst({
    where: eq(collectionsTable.id, id),
  });

  if (!response) return null;

  return response;
}

export async function getCollectionsByCreatorId(creatorId: string) {
  if (!isValidPostgresUUID(creatorId)) {
    return null;
  }

  const response = await db.query.collectionsTable.findMany({
    where: eq(collectionsTable.creatorId, creatorId),
  });

  if (!response) return null;

  return response;
}

export async function countCollectionsByCreatorId(creatorId: string) {
  if (!isValidPostgresUUID(creatorId)) {
    return null;
  }

  const response = await db.select({ count: count() }).from(collectionsTable);

  if (!response || response.length === 0) return 0;

  return response[0].count;
}

export async function createCollection(
  name: string,
  description: string,
  creatorId: string,
) {
  const response = await db
    .insert(collectionsTable)
    .values({
      name,
      description,
      creatorId,
    })
    .returning();

  return response;
}

export async function updateCollection(
  id: string,
  name: string,
  description: string,
) {
  const response = await db
    .update(collectionsTable)
    .set({
      name,
      description,
    })
    .where(eq(collectionsTable.id, id))
    .execute();

  return response;
}

export async function deleteCollection(id: string) {
  const response = await db
    .delete(collectionsTable)
    .where(eq(collectionsTable.id, id))
    .execute();

  return response;
}

export async function getCollectionWithCardsById(id: string) {
  if (!isValidPostgresUUID(id)) {
    return null;
  }

  const response = await db.query.collectionsTable.findFirst({
    where: eq(collectionsTable.id, id),
    with: {
      definitionCards: true,
    },
  });

  return response;
}

// Not too important so we can cache this!
export const getCollectionsFromHistory = cache(async (userId: string) => {
  if (!isValidPostgresUUID(userId)) {
    return null;
  }

  const response = await db.query.learnedCollectionsTable.findMany({
    where: eq(learnedCollectionsTable.userId, userId),
    with: {
      collection: true,
      user: true,
    },
  });

  return response;
});

export async function addCollectionToHistory(
  userId: string,
  collectionId: string,
) {
  if (!isValidPostgresUUID(userId) || !isValidPostgresUUID(collectionId)) {
    return null;
  }
  // Insert the learned collection into the table
  await db
    .insert(learnedCollectionsTable)
    .values({
      userId,
      collectionId,
    })
    .onConflictDoUpdate({
      target: [
        learnedCollectionsTable.userId,
        learnedCollectionsTable.collectionId,
      ],
      set: {
        learnedAt: new Date(),
      },
    })
    .execute();

  await deleteOldLearnedCollections(userId);
}

async function deleteOldLearnedCollections(userId: string) {
  if (!isValidPostgresUUID(userId)) {
    return null;
  }
  // Get the IDs of the oldest entries to be deleted
  const oldEntries = await db
    .select({
      id: learnedCollectionsTable.id,
    })
    .from(learnedCollectionsTable)
    .where(eq(learnedCollectionsTable.userId, userId))
    .orderBy(desc(learnedCollectionsTable.learnedAt))
    .offset(10); // Fetch only the oldest entries to keep the latest 10

  // Extract IDs
  const idsToDelete = oldEntries.map((entry) => entry.id);

  // Delete those entries
  if (idsToDelete.length > 0) {
    idsToDelete.forEach(async (id) => {
      await db
        .delete(learnedCollectionsTable)
        .where(eq(learnedCollectionsTable.id, id));
    });
  }
}
