import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative flex h-[93vh] w-full items-center justify-center bg-cover bg-center bg-no-repeat">
        <div className="relative z-10 space-y-6 px-4 text-center md:px-6">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Educational Toolkit
          </h1>
          <p className="text-lg text-white md:text-xl">
            Discover our products and solutions designed to support educators
          </p>
          <Link
            href="/auth"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
