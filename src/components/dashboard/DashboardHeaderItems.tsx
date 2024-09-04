"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const fullPath = usePathname();
  const parts = fullPath.split("/").filter(Boolean);

  let desiredPath = `/${parts.join("/")}`;
  if (parts.length > 2) {
    desiredPath = `/${parts[0]}/${parts[1]}`;
  }

  return (
    <div className="ml-8 hidden w-max items-start justify-between gap-8 md:flex">
      <NagivatorButton
        name="General"
        link="/dashboard"
        pathname={desiredPath}
      />
      <NagivatorButton
        name="Cards"
        link="/dashboard/cards"
        pathname={desiredPath}
      />
      <NagivatorButton
        name="Deadlines"
        link="/dashboard/deadlines"
        pathname={desiredPath}
      />
      <NagivatorButton
        name="Settings"
        link="/dashboard/settings"
        pathname={desiredPath}
      />
    </div>
  );
}

interface NagivatorButtonProps {
  name: string;
  link: string;
  pathname: string;
}

function NagivatorButton({ name, link, pathname }: NagivatorButtonProps) {
  const isActive = link === pathname;
  const baseClasses = "h-max w-max text-sm transition-colors";
  const textColor = isActive
    ? "text-primary"
    : "text-foreground/60 hover:text-foreground/80";

  return (
    <Link className={`${baseClasses} ${textColor}`} href={link}>
      {name}
    </Link>
  );
}
