"use client";

import { buttonVariants } from "@/components/ui/button";
import { Collection } from "@/db/dto/collections";
import { ColumnDef } from "@tanstack/react-table";
import { LibraryIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Collection>[] = [
  {
    id: "icon",
    cell: () => {
      return (
        <div className="hidden w-full items-center justify-center align-middle md:flex">
          <LibraryIcon className="h-4 w-4 text-right text-muted-foreground" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const collectionId: string = row.original.id;
      return (
        <Link
          prefetch={false}
          className="h-fit w-fit underline underline-offset-1 hover:text-blue-700"
          href={`/learn/${collectionId}`}
        >
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground">{row.original.description}</p>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      return (
        <div>
          <div className="hidden md:block">Created Date</div>
          <div className="block md:hidden">Created</div>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount: string = row.getValue("createdAt");
      const formatted = new Date(amount).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div className="text-muted-foreground">{formatted}</div>;
    },
  },
  {
    id: "Edit",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/cards/${row.original.id}`}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Edit
        </Link>
      );
    },
  },
];
