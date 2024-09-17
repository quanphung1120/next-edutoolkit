import { PropsWithChildren } from "react";

interface GridBackgroundProps extends PropsWithChildren<{}> {}

export function GridBackground({ children }: GridBackgroundProps) {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20 flex items-center justify-between gap-10 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 align-middle text-4xl font-bold sm:text-7xl">
        {children}
      </div>
    </div>
  );
}
