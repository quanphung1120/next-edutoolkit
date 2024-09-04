import { Metadata } from "next";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MobileHeader from "@/components/dashboard/DashboardMobileHeader";
import Sidebar from "@/components/dashboard/DashboardSideBar";
import DashboardMobileWarningDialog from "@/components/dashboard/DashboardMobileWarning";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "EduToolkit - Dashboard",
  description: "Dashboard for the Educational Toolkit for Students.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="">
      <div className="flex min-h-screen w-full flex-col">
        <DashboardMobileWarningDialog />

        <MobileHeader />
        <div className="hidden w-full md:block">
          <div className="mr-7">
            <DashboardHeader />
          </div>
        </div>

        <Sidebar />
        <div className="m-4 md:mx-12">{children}</div>
      </div>
    </section>
  );
}
