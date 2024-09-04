import Link from "next/link";
import React from "react";

export default function NavigationItems() {
  return (
    <div className="hidden w-max items-center justify-start gap-6 align-middle md:flex">
      <Link
        href="/products"
        className="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground"
        prefetch={false}
      >
        Products
      </Link>

      <Link
        href="/pricing"
        className="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground"
        prefetch={false}
      >
        Pricing
      </Link>

      <Link
        href="/docs"
        className="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground"
        prefetch={false}
      >
        Documentation
      </Link>

      <Link
        href="/about"
        className="text-sm font-normal text-foreground/60 transition-colors hover:text-foreground"
        prefetch={false}
      >
        About
      </Link>
    </div>
  );
}
