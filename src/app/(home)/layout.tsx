import React from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/home/header/HomeHeader";

export const runtime = "edge";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      <div className="mx-auto h-full">{children}</div>
      <Footer />
    </section>
  );
}
