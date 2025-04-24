import "@/styles/globals.css";

import { type Metadata } from "next";

import { SideBar } from "@/components/SideBar";

export const metadata: Metadata = {
  title: "Gmail Wrapper",
  description: "Gmail Wrapper for Lyra Training",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="max-w-screen flex h-screen max-h-screen w-screen bg-slate-100/60">
      <SideBar />
      {children}
    </div>
  );
}
