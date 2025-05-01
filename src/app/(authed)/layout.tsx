import "@/styles/globals.css";

import { type Metadata } from "next";

import { AccountButton } from "@/components/AccountButton";
import { SideBar } from "@/components/SideBar";
import { SearchBar } from "@/features/emails/components/SearchBar";

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
      <div className="flex h-screen max-h-screen w-0 grow flex-col">
        <div className="flex h-16 w-full shrink-0 items-center">
          <SearchBar />
          <div className="flex grow justify-end px-2 md:px-4">
            <AccountButton />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
