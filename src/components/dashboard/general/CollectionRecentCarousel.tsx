"use client";

import { useRef, useEffect, useState } from "react";
import CollectionBox from "./CollectionRecentBox";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleHelpIcon,
  LibraryBigIcon,
  LibraryIcon,
} from "lucide-react";
import { RecentCollections } from "@/app/dashboard/(general)/page";
import { Button } from "@/components/ui/button";

interface CollectionRecentStudyProps {
  collections: RecentCollections[];
}

export default function CollectionRecentStudy({
  collections,
}: CollectionRecentStudyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkForOverflow = () => {
    const container = containerRef.current;
    if (container) {
      const isOverflow = container.scrollWidth > container.clientWidth;
      setIsOverflowing(isOverflow);
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth,
      );
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -480, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 480, behavior: "smooth" });
    }
  };

  useEffect(() => {
    checkForOverflow();

    // Re-check on window resize
    const handleResize = () => checkForOverflow();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check after every scroll
    const container = containerRef.current;
    if (container) {
      const handleScroll = () => checkForOverflow();
      container.addEventListener("scroll", handleScroll);

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (collections.length === 0) {
    return (
      <div className="flex h-[195px] w-full items-center justify-center align-middle">
        <div className="flex flex-col items-center justify-center gap-3 align-middle">
          <LibraryIcon className="h-12 w-12 text-muted-foreground" />
          <h1 className="text-sm font-semibold">NO RECENT</h1>
          <h2 className="text-muted-foreground">
            Welcome, you did not study any collections yet.
          </h2>
          <Button>Start searching</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Scroll Button */}
      {isOverflowing && canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="flex w-full gap-4 overflow-hidden scroll-smooth"
      >
        {collections.map((collection) => (
          <CollectionBox
            key={collection.id}
            id={collection.id}
            cardsAmount={collection.cardsAmount}
            name={collection.name}
            description={collection.description}
            authorName={collection.authorName}
            profilePicture={collection.profilePicture}
          />
        ))}
      </div>

      {/* Right Scroll Button */}
      {isOverflowing && canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
