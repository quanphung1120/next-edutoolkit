"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const path = usePathname().split("/")[3];

  const isActive = (pathname: string) => {
    if (!path && pathname == "profile") {
      return true;
    }

    return path == pathname;
  };

  const linkClass = (pathname: string) => {
    return isActive(pathname) ? "font-semibold text-primary" : "";
  };

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      <Link href="/dashboard/settings/" className={linkClass("profile")}>
        Profile
      </Link>
      <Link
        href="/dashboard/settings/security"
        className={linkClass("security")}
      >
        Security
      </Link>
      <Link
        href="/dashboard/settings/activities"
        className={linkClass("activities")}
      >
        Activities
      </Link>
      <Link
        href="dashboard/settings/advanced"
        className={linkClass("advanced")}
      >
        Advanced
      </Link>
    </nav>
  );
}
