"use client";
import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export const NavigationLinks = ({
  children,
  href,
  ...props
}: Omit<LinkProps, "href"> & { href: string; children: ReactNode }) => {
  const pathname = usePathname();
  const active = href.startsWith(pathname) && (pathname != "/" || href == "/");
  return (
    <div className="pr-4">
      <Link
        href={href}
        className={clsx(
          "mr-2 flex h-8 w-full items-center gap-4 rounded-r-full pl-7 text-gray-700",
          active ? "bg-blue-100" : "hover:bg-gray-100",
        )}
        {...props}
      >
        {children}
      </Link>
    </div>
  );
};
