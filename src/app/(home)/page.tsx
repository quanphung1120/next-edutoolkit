import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex h-[85vh] w-full flex-col gap-12 md:text-left">
      <div className="mt-32 flex w-full flex-col items-center justify-center gap-8 align-middle">
        <h1 className="mx-0 w-full text-center text-5xl font-bold text-primary md:w-[480px] md:text-7xl">
          Providing basic toolkit for students
        </h1>
        <h2 className="w-full text-center text-xl text-primary md:w-[580px]">
          Improving students learning experience with reliable and affordable
          solutions.
        </h2>
      </div>
      <div className="flex w-full items-center justify-center gap-5 align-middle">
        <Link
          href="/auth"
          className={buttonVariants({ variant: "outline", size: "lg" })}
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
  );
}
