"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

import { useThreadCount } from "../../hooks/useThreadCount";
import { MailCounter } from "./MailCounter";

export const Pagination = ({ page }: { page: number }) => {
  const [threadCount, threadCountQuery] = useThreadCount();
  if (threadCountQuery.isLoading) {
    return <></>;
  }
  if (threadCountQuery.isError) {
    return <></>;
  }

  const hasPrevPage = page != 1;
  const hasNextPage = threadCount > page * 50;
  return (
    <div className="flex h-full w-fit items-center gap-2">
      <MailCounter page={page} />
      <Link
        href={hasPrevPage ? `/emails/${page - 1}` : `/emails/${page}`}
        className={clsx(
          "flex size-10 cursor-pointer items-center justify-center rounded-full",
          hasPrevPage && "hover:bg-gray-100",
        )}
      >
        <ChevronLeftIcon
          className={clsx(
            "size-3",
            hasPrevPage ? "text-gray-700" : "text-gray-400",
          )}
          strokeWidth={2.5}
        />
      </Link>
      <Link
        href={hasNextPage ? `/emails/${page + 1}` : `/emails/${page}`}
        className={clsx(
          "flex size-10 cursor-pointer items-center justify-center rounded-full",
          hasNextPage && "hover:bg-gray-100",
        )}
      >
        <ChevronRightIcon
          className={clsx(
            "size-3",
            hasNextPage ? "text-gray-700" : "text-gray-400",
          )}
          strokeWidth={2.5}
        />
      </Link>
    </div>
  );
};
