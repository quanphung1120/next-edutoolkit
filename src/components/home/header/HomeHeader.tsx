import AppLogo from "@/components/shared/AppLogo";
import NavRightItems from "./HomeHeaderRightItems";

import React from "react";

export default async function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-center shadow">
      <nav className="flex h-max w-full items-center justify-between px-4 md:px-16">
        <div className="flex items-center justify-start gap-11 align-middle">
          <AppLogo />
          {/* <NavigationItems /> */}
        </div>
        <NavRightItems />
      </nav>
    </header>
  );
}
