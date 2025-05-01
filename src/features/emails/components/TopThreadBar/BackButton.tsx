"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { useThreadPage } from "../../hooks/useThreadPage";

export const BackButton = ({ threadId }: { threadId: string }) => {
  const [threadPage, threadPageQuery] = useThreadPage(threadId);

  return (
    <Link
      href={
        threadPageQuery.isLoading
          ? `/email/${threadId}`
          : `/emails/${threadPage}`
      }
      className="flex size-10 items-center justify-center rounded-full p-2 hover:bg-gray-100"
    >
      <ArrowLeftIcon className="size-4" />
    </Link>
  );
};
