import { db } from "@/db";
import { definitionCardsTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function addDefinitionCard(
  collectionId: string,
  question: string,
  answer: string,
) {
  const response = await db
    .insert(definitionCardsTable)
    .values({
      collectionId,
      question,
      answer,
    })
    .returning();

  return response.at(0);
}

export async function updateDefinitionCard(
  id: string,
  question: string,
  answer: string,
) {
  const response = await db
    .update(definitionCardsTable)
    .set({
      question,
      answer,
    })
    .where(eq(definitionCardsTable.id, id))
    .execute();

  return response;
}

export interface DefinitionCard {
  id: string;
  collectionId: string;
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function getDefinitionCardsByCollectionId(collectionId: string) {
  const result: DefinitionCard[] = [];
  const response = await db.query.definitionCardsTable.findMany({
    where: eq(definitionCardsTable.collectionId, collectionId),
  });

  if (!response || response.length === 0) {
    return null;
  }

  response.forEach((card) => {
    result.push({
      id: card.id,
      collectionId: card.collectionId,
      question: card.question,
      answer: card.answer,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    });
  });

  return result;
}

export async function deleteDefinitionCard(id: string) {
  const response = await db
    .delete(definitionCardsTable)
    .where(eq(definitionCardsTable.id, id))
    .execute();

  return response;
}

export async function countDefinitionCards(collectionId: string) {
  const response = await db
    .select({ count: count() })
    .from(definitionCardsTable)
    .where(eq(definitionCardsTable.collectionId, collectionId))
    .execute();
  return response;
}
