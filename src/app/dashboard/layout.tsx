import { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileHeader from "@/components/dashboard/DashboardMobileHeader";
import Sidebar from "@/components/dashboard/DashboardSideBar";
import DashboardMobileWarningDialog from "@/components/dashboard/DashboardMobileWarning";
import { getUserProfile } from "@/db/dto/profiles";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "EduToolkit - Dashboard",
  description: "Dashboard for the Educational Toolkit for Students.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserProfile();

  if (!data) {
    revalidatePath("/", "layout");
    redirect("/auth");
  }
  return (
    <section className="">
      <div className="flex min-h-screen w-full flex-col">
        <DashboardMobileWarningDialog />

        <MobileHeader
          email={data.email!}
          profileId={data.userId}
          profilePicture={data.avatar}
        />
        <div className="hidden w-full md:block">
          <div className="mr-7">
            <DashboardHeader
              email={data.email!}
              profileId={data.userId}
              profilePicture={data.avatar}
            />
          </div>
        </div>

        <Sidebar />
        <div className="m-4 md:mx-12">{children}</div>
      </div>
    </section>
  );
}
