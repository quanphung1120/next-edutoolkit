import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { DashboardIcon } from "@radix-ui/react-icons";
import {
  LogOutIcon,
  MailIcon,
  PowerIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

interface ProfileDropdownProps {
  profileId: string;
  email: string;
  profilePicture: string | undefined | null;
}

export function ProfileDropdown({
  email,
  profilePicture,
  profileId,
}: ProfileDropdownProps) {
  const menuItemClass = "mt-2 cursor-pointer text-muted-foreground";
  const iconClass = "mr-2 h-4 w-4";
  const firstLetter = email.charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={profilePicture!} />
          <AvatarFallback>{firstLetter}</AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 mt-3 w-72 p-2">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-2">
            <div className="my-3">
              <div className="text-sm font-semibold">{email}</div>
              <div className="mt-3 text-sm font-normal text-muted-foreground">
                {profileId}
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemClass}>
          <Link
            href="/dashboard/settings/profile"
            className="flex w-full items-center"
            prefetch={false}
          >
            <SettingsIcon className={iconClass} />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass}>
          <Link
            href="/dashboard/settings"
            className="flex w-full items-center"
            prefetch={false}
          >
            <SettingsIcon className={iconClass} />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemClass}>
          <Link
            href="/dashboard"
            className="flex w-full items-center"
            prefetch={false}
          >
            <DashboardIcon className={iconClass} />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass}>
          <Link
            href="/support"
            className="flex w-full items-center align-middle"
            prefetch={false}
          >
            <MailIcon className={iconClass} />
            Contact Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={menuItemClass}>
          <a
            href="/auth/logout"
            className="flex w-full items-center align-middle"
          >
            <LogOutIcon className={iconClass} />
            Logout
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
