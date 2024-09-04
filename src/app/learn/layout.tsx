import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "DigiEDU - Learning",
  description: "You're learning something new!",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
