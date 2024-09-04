"use client";

import { Button } from "@/components/ui/button";
import { ShuffleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  collectionName: string;
  currentCardIndex: number;
  cardsLength: number;
  shuffleCards: () => void;
}

export function Header({
  collectionName,
  currentCardIndex,
  cardsLength,
  shuffleCards,
}: HeaderProps) {
  const { back } = useRouter();
  return (
    <div className="w-full">
      <header className="sticky inset-0 top-0 z-50 h-16 w-full content-center bg-background shadow">
        <nav className="relative mx-auto flex h-fit w-[90%] items-center justify-center gap-4 px-6 md:px-12">
          <div className="absolute left-0">{/* App Logo */}</div>

          <div className="flex flex-col items-center justify-center align-middle">
            <h1 className="text-sm font-semibold">{collectionName}</h1>

            <h2 className="text-sm font-light text-foreground/60">
              {currentCardIndex} / {cardsLength}
            </h2>
          </div>
          <div className="absolute right-0 flex items-center justify-end gap-4 align-middle">
            <Button
              onClick={shuffleCards}
              variant="outline"
              className="text-sm font-semibold"
            >
              <ShuffleIcon className="h-4 w-4" />
            </Button>
            <Button onClick={back} className="text-sm font-semibold">
              Exit
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
}
