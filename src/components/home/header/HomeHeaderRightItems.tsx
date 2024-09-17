import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import { getUserProfile } from "@/db/dto/profiles";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileDropdown from "./mobile/MobileDropdown";

export default async function NavRightItems() {
  const { data } = await getUserProfile();

  return data ? (
    <LoggedInItems
      profileId={data.id}
      email={data.email!}
      profilePicture={data.avatar}
    />
  ) : (
    <UnloginItems />
  );
}

function UnloginItems() {
  return (
    <div className="flex items-center justify-end gap-4">
      <Link href="/contact" className={buttonVariants({ variant: "outline" })}>
        Contact
      </Link>
      <Link href="/auth" className={buttonVariants({ variant: "default" })}>
        Sign In
      </Link>
      <div className="block md:hidden">
        <MenuIcon size={24} />
      </div>
    </div>
  );
}

interface LoggedInItemsProps {
  profileId: string;
  email: string;
  profilePicture?: string | null;
}

function LoggedInItems({
  profileId,
  email,
  profilePicture,
}: LoggedInItemsProps) {
  return (
    <div className="flex items-center justify-end gap-4">
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "hidden md:flex",
        )}
      >
        Dashboard
      </Link>
      <ProfileDropdown
        profileId={profileId}
        email={email}
        profilePicture={profilePicture}
      />
      <div className="block md:hidden">
        <MobileDropdown />
      </div>
    </div>
  );
}
