import ModeToggle from "@/components/shared/ThemeSwitcher";
import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="border-t px-8 py-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-12 align-middle md:flex-row">
        <div className="flex flex-col items-start justify-start text-left align-middle">
          <h1 className="text-3xl font-bold">EduToolkit</h1>
          <p className="mt-4 flex w-full items-center justify-start gap-1 text-left align-middle text-sm text-muted-foreground">
            A product by
            <BrandDescriptionLink />
          </p>
          <p className="flex w-full items-center justify-start gap-1 text-left align-middle text-sm text-muted-foreground">
            Created and maintained by
            <AuthorDescriptionLink />
          </p>
          <div className="mt-4">
            <ModeToggle />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-3 items-start gap-10 md:mt-0">
          <div className="mt-4 flex flex-col justify-center space-y-4 text-sm">
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Products
            </Link>
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Services
            </Link>
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              About
            </Link>
          </div>
          <div className="mt-4 flex flex-col justify-center space-y-4 text-sm">
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Contact
            </Link>
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Privacy
            </Link>
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Terms
            </Link>
          </div>
          <div className="mt-4 flex flex-col justify-center space-y-4 text-sm">
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              EduToolkit
            </Link>
            <Link
              href=""
              className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Blog (Coming soon)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BrandDescriptionLink() {
  return (
    <Link
      href="/about"
      className="text-sm font-medium text-neutral-600 dark:text-sky-500"
    >
      EduToolkit
    </Link>
  );
}

function AuthorDescriptionLink() {
  return (
    <Link
      href="https://github.com/quanphungg"
      className="text-sm font-medium text-neutral-600 dark:text-sky-500"
    >
      quanphungg_
    </Link>
  );
}
