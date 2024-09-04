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
import DeleteConfirm from "./CardDeleteForm";
import { useCard } from "@/context/CardContext";

export default function CardListing() {
  const { defCards } = useCard();

  if (defCards.length === 0) {
    return <></>;
  }

  let index = 1;

  return (
    <div className="w-full">
      {defCards.map((card) => (
        <Card className="mb-8 w-full" key={card.id}>
          <CardHeader>
            <CardTitle>Question {index++}</CardTitle>
            <CardDescription className="whitespace-pre-line">
              {card.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-blue-800">Answer: </div>
            <div className="whitespace-pre-line font-bold">{card.answer}</div>
          </CardContent>
          <CardFooter className="flex w-full items-center justify-end gap-4 border-t p-4 align-middle">
            <Button variant="outline">Edit</Button>
            <DeleteConfirm cardId={card.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
