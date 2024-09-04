"use client";

import Link from "next/link";
import {
  Calendar,
  Globe,
  Home,
  Library,
  LineChart,
  SearchIcon,
  Settings,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  let path = usePathname().split("/")[2];
  if (!path || path === "") path = "dashboard";
  const currentClass =
    "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  const defaultClass =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8";
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background md:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <Link href="/" className={defaultClass}>
          <div className="w-full text-center text-3xl text-foreground">E</div>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard"
              className={path === "dashboard" ? currentClass : defaultClass}
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/cards"
              className={path === "cards" ? currentClass : defaultClass}
            >
              <Library className="h-5 w-5" />
              <span className="sr-only">Collections</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Collections</TooltipContent>
        </Tooltip>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="dashboard/timetable"
              className={path === "timetable" ? currentClass : defaultClass}
            >
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Timetable</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Timetable</TooltipContent>
        </Tooltip> */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Searching</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Searching</TooltipContent>
        </Tooltip>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LineChart className="h-5 w-5" />
              <span className="sr-only">Analytics</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Analytics</TooltipContent>
        </Tooltip> */}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/dashboard/settings"
              className={path === "settings" ? currentClass : defaultClass}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
