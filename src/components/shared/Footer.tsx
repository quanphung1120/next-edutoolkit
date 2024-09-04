import GitHubIcon from "@/components/shared/svgs/GitHubIcon";
import GoogleIcon from "@/components/shared/svgs/GoogleIcon";
import Link from "next/link";

export default async function Footer() {
  return (
    <div className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-8">
          <Link href="#">
            <GoogleIcon height={8} width={8} />
            <span className="sr-only">Gmail</span>
          </Link>
          <Link href="#">
            <GitHubIcon height={8} width={8} />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        <p className="mt-4 text-sm md:mt-0">
          &copy; Educational Toolkit Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}
