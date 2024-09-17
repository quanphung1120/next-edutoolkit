import { redirect } from "next/navigation";
import { Metadata } from "next";
import { getUserProfile } from "@/db/dto/profiles";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import Footer from "@/components/shared/Footer";
import AuthenticationForm from "@/components/auth/AuthenticationForm";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "EduToolkit - Sign In",
  description:
    "Sign in to your account to access the Educational Toolkit for Students.",
};

export default async function SuspenseAuthPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthPage />
    </Suspense>
  );
}

async function AuthPage() {
  const { data } = await getUserProfile();
  if (data) redirect("/dashboard");

  return (
    <div className="h-screen w-full items-center justify-center align-middle lg:flex">
      <div className="relative hidden h-full w-[50%] border-r bg-zinc-900 lg:flex">
        <div className="absolute inset-x-0 top-0 mx-10 my-10 h-16">
          <div className="text-4xl">Basic toolkit for Students</div>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-10 my-10 h-16 text-2xl">
          <Footer />
        </div>
      </div>
      <div className="h-full border-l lg:w-[50%]">
        <AuthenticationForm />
      </div>
    </div>
  );
}
