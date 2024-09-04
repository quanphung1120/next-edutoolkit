"use client";

import { CldImage } from "next-cloudinary";
import { Suspense } from "react";

interface OptimizedImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
function OptimizedImage({ alt, src, width, height }: OptimizedImageProps) {
  return (
    <Suspense>
      <CldImage
        alt={alt}
        src={src}
        width={width}
        height={height}
        crop={{
          type: "auto",
          source: true,
        }}
      />
    </Suspense>
  );
}

export default OptimizedImage;
