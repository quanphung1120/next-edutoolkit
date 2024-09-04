import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getUserProfile } from "@/db/dto/profiles";

export default async function MobileDropdown() {
  const { data } = await getUserProfile();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex w-full flex-col items-start space-y-4 p-4">
          <Link
            href="/products"
            className="text-sm underline-offset-4 hover:underline"
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="/pricing"
            className="text-sm underline-offset-4 hover:underline"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm underline-offset-4 hover:underline"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm underline-offset-4 hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
        </div>

        <div className={data ? "block" : "hidden"}>
          <Separator className="my-6" />

          <SheetFooter className="mt-3 flex w-full flex-col items-center justify-start gap-4 align-middle">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
              prefetch={false}
            >
              Dashboard
            </Link>
            <a
              href="/auth/logout"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Logout
            </a>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
