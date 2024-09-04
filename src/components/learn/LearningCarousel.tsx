"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DefinitionCard } from "@/db/dto/definition-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CardFlip from "./LearningCardFlip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Header } from "./LearningHeader";

interface LearningPageProps {
  collectionId: string;
  collectionName: string;
  cards: DefinitionCard[];
}

export default function LearningPage({
  collectionId,
  cards,
  collectionName,
}: LearningPageProps) {
  const [cardsState, setCardsState] = useState<DefinitionCard[]>(cards);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [{ current, count }, setCarouselState] = useState({
    current: 0,
    count: 0,
  });

  const shuffleCards = useCallback(() => {
    setCardsState((prevCards) =>
      [...prevCards].sort(() => Math.random() - 0.5),
    );
    api?.scrollTo(0);
    setCarouselState((state) => ({ ...state, current: 1 }));
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCarouselState({
        current: api.selectedScrollSnap() + 1,
        count: api.scrollSnapList().length,
      });
    };

    updateCurrent();
    api.on("select", updateCurrent);

    const previousLearnHistory = localStorage.getItem(
      "learn-history-" + collectionId,
    );
    const page = parseInt(previousLearnHistory || "", 10);

    if (!isNaN(page) && page > 0 && page <= api.scrollSnapList().length) {
      api.scrollTo(page - 1);
      setCarouselState((state) => ({ ...state, current: page }));
    }

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api, collectionId]);

  useEffect(() => {
    if (current > 0) {
      localStorage.setItem("learn-history-" + collectionId, current.toString());
    }
  }, [current, collectionId]);

  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const MemoizedHeader = useMemo(
    () => (
      <Header
        cardsLength={count}
        currentCardIndex={current}
        shuffleCards={shuffleCards}
        collectionName={collectionName}
      />
    ),
    [count, current, shuffleCards, collectionName],
  );

  return (
    <div className="h-max w-full">
      {MemoizedHeader}
      <div className="mx-auto box-border flex w-[95%] items-center justify-start align-middle">
        <div className="mx-auto w-full">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {cardsState.map((card) => (
                <CarouselItem
                  className="flex cursor-pointer items-center justify-center"
                  key={card.id}
                >
                  <div className="w-screen p-1">
                    <div className="h-[calc(100vh-4rem-7rem)]">
                      <CardFlip question={card.question} answer={card.answer} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="relative mx-auto mt-8 flex w-full items-center justify-center gap-5 align-middle">
            <Button
              type="submit"
              variant="outline"
              onClick={handlePrevious}
              disabled={current <= 1}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button
              type="submit"
              variant="outline"
              onClick={handleNext}
              disabled={current === count}
            >
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
