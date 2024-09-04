"use client";

import Link from "next/link";
import { Home, Library, LineChart, PanelLeft, SearchIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ProfileDropdown } from "../shared/ProfileDropdown";

interface MobileHeaderProps {
  email: string;
  profileId: string;
  profilePicture: string | null;
}

export default function MobileHeader({
  email,
  profileId,
  profilePicture,
}: MobileHeaderProps) {
  let path = usePathname().split("/")[2];
  if (!path || path === "") path = "dashboard";
  const defaultClass =
    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";
  const currentClass = "flex items-center gap-4 px-2.5 text-foreground";
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 align-middle sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetTitle asChild>
            <Link href="/" className={defaultClass}>
              <div className="w-full text-left text-3xl text-foreground">
                EduToolkit
              </div>
            </Link>
          </SheetTitle>
          <nav className="mt-12 grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className={path === "dashboard" ? currentClass : defaultClass}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/cards"
              className={path === "cards" ? currentClass : defaultClass}
            >
              <Library className="h-5 w-5" />
              Collections
            </Link>
            <Link
              href="/searching"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <SearchIcon className="h-5 w-5" />
              Searching
            </Link>
            <Link
              href="/dashboard/settings"
              className={path === "settings" ? currentClass : defaultClass}
            >
              <LineChart className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <ProfileDropdown
        email={email}
        profileId={profileId}
        profilePicture={profilePicture}
      />
    </header>
  );
}
