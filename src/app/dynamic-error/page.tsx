"use client";

import ErrorPage from "@/components/shared/ErrorPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function DynamicErrorSuspense() {
  return (
    <Suspense>
      <DynamicError />
    </Suspense>
  );
}

function DynamicError() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode");
  const message = searchParams.get("message");

  if (errorCode) {
    return (
      <ErrorPage
        errorCode={errorCode}
        message={message || "An unexpected error occurred."}
      />
    );
  }

  return <ErrorPage errorCode="400" message="Oops, something went wrong!" />;
}
