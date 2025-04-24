"use client";

import { api } from "@/trpc/react";

import { ThreadRow } from "./ThreadRow";

export const ThreadsTable = ({ page }: { page: number }) => {
  const [threadsList, threadsListQuery] = api.thread.getList.useSuspenseQuery({
    page,
  });
  // TODO: Handle loading and error state
  if (threadsListQuery.isLoading) {
    return <></>;
  }
  if (threadsListQuery.isError) {
    return <></>;
  }
  return (
    <div className="h-0 w-full grow overflow-auto">
      <div className="flex w-full flex-col">{threadsList.map(ThreadRow)}</div>
    </div>
  );
};
