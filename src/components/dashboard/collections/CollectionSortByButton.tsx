"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon, CheckIcon } from "lucide-react";

export enum SortBy {
  Activity = "Sort by activity",
  Recent = "Sort by recent",
}

interface SortByButtonProps {
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
}

export default function CollectionSortByButton({
  sortBy,
  setSortBy,
}: SortByButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
        <div className="flex items-center justify-center gap-3 align-middle">
          <ArrowUpDownIcon className="h-4 w-4" />
          {sortBy}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-1">
        {/* Dropdown items */}

        <DropdownMenuItem
          onClick={() => setSortBy(SortBy.Activity)}
          className="h-10 w-40 cursor-pointer"
        >
          <span>Sort by activity</span>
          <DropdownMenuShortcut
            className={sortBy != SortBy.Activity ? "hidden" : ""}
          >
            <CheckIcon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setSortBy(SortBy.Recent)}
          className="h-10 cursor-pointer"
        >
          <span>Sort by recent</span>
          <DropdownMenuShortcut
            className={sortBy != SortBy.Recent ? "hidden" : ""}
          >
            <CheckIcon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        {/* Dropdown items end */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
