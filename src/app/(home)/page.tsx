import { Button, buttonVariants } from "@/components/ui/button";
import { GridBackground } from "@/components/ui/grid-background";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-[95vh] w-full">
      <GridBackground>
        <div className="mx-11 flex flex-col content-center items-center justify-center gap-12 text-center align-middle md:justify-start md:text-left">
          <div className="flex flex-col items-center justify-start gap-8 align-middle md:items-start">
            <h1 className="w-full text-5xl text-zinc-100 md:w-[480px] md:text-7xl">
              Providing basic toolkit for students
            </h1>
            <h2 className="w-full text-xl font-normal text-zinc-300 md:w-[580px]">
              Improving students learning experience with cutting-edge
              technology.
            </h2>
          </div>
          <div className="flex w-full items-center justify-center gap-5 align-middle md:justify-start">
            <Link
              href="/auth"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "border border-primary-foreground text-primary",
              })}
            >
              Register
            </Link>

            <Link
              href="/auth"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Contact
            </Link>
          </div>
        </div>
      </GridBackground>
    </div>
  );
}
