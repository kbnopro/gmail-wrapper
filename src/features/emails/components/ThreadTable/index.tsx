"use client";

import { useThreadList } from "@/features/emails/hooks/useThreadList";

import { ThreadRow } from "./ThreadRow";

export const ThreadsTable = ({ page }: { page: number }) => {
  const [threadsList, threadsListQuery] = useThreadList(page);
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
        {threadsList.map(ThreadRow)}
      </div>
    </div>
  );
};
