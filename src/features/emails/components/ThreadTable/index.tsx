"use client";

import { useEffect, useState } from "react";

import { useThreadList } from "@/features/emails/hooks/useThreadList";

import type { DisplayedThread } from "../../types";
import { getDisplayedDate } from "../../utils/getDisplayedDate";
import { ThreadRow } from "./ThreadRow";

export const ThreadsTable = ({
  page,
  email,
  search,
}: {
  page: number;
  email: string;
  search: string;
}) => {
  const [threadsList, threadsListQuery] = useThreadList({ page, search });
  const [displayedThreadsList, setDisplayedThreadList] = useState<
    DisplayedThread[]
  >(threadsList.map((thread) => ({ ...thread, internalDate: undefined })));

  useEffect(() => {
    setDisplayedThreadList(
      threadsList.map((thread, idx) => ({
        ...thread,
        internalDate: getDisplayedDate(threadsList[idx]!.internalDate),
      })),
    );
  }, [threadsList, setDisplayedThreadList]);

  // TODO: Handle loading and error state
  if (threadsListQuery.isLoading) {
    return <></>;
  }
  if (threadsListQuery.isError) {
    return <></>;
  }
  return (
    <div className="flex h-0 w-full grow overflow-y-auto">
      <div className="flex w-0 max-w-full grow flex-col">
        {displayedThreadsList.map((thread) => (
          <ThreadRow email={email} key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
};
