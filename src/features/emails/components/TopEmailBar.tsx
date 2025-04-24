import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export const TopEmailBar = ({ page }: { page: number }) => {
  const hasPrevPage = page != 1;
  const hasNextPage = true;
  return (
    <div className="flex h-12 w-full items-center justify-between px-3">
      <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100">
        <ArrowPathIcon className="size-5" />
      </button>
      <div className="flex h-full w-fit items-center gap-2">
        <div className="text-xs text-gray-500">12-34 of 5678 </div>
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
    </div>
  );
};
