import { ProfileDropdown } from "@/components/shared/ProfileDropdown";
import Link from "next/link";
import { getUserProfile } from "@/db/dto/profiles";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import MailBox from "./DashboardMailBox";

export default async function DashboardHeader() {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/auth");
    redirect("/auth");
  }

  const navItemsClass =
    "transition-colors text-sm hover:text-foreground/80 text-foreground/60";
  return (
    <header className="h-16 w-full content-center">
      <nav className="h-max">
        <div className="flex items-center justify-end gap-12 align-middle">
          <div className="flex items-center justify-end gap-5 align-middle">
            <div className="hidden items-center justify-end gap-4 align-middle md:flex">
              <Link href="/products" className={navItemsClass}>
                Help
              </Link>
              <Link href="/products" className={navItemsClass}>
                Docs
              </Link>
              <Link href="/products" className={navItemsClass}>
                Announcement
              </Link>
            </div>
            <MailBox />
            <ProfileDropdown
              profileId={data.id!}
              email={data.email!}
              profilePicture={data.avatar}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
