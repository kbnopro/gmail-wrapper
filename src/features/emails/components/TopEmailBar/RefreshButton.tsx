"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import { useSyncMessages } from "../../hooks/useSyncMessages";

export const RefreshButton = () => {
  const syncMessageQuery = useSyncMessages();
  return (
    <button
      onClick={() => {
        syncMessageQuery.mutate();
      }}
      className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-0"
    >
      <ArrowPathIcon
        className={clsx("size-5", syncMessageQuery.isPending && "animate-spin")}
      />
    </button>
  );
};
