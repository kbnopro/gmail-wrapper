"use client";

import { MAX_THREAD_PER_PAGE } from "@/config";

import { useThreadCount } from "../../hooks/useThreadCount";

export const MailCounter = ({ page }: { page: number }) => {
  const [threadCount, threadCountQuery] = useThreadCount();
  // TODO: Handle error and loading state
  if (threadCountQuery.isPending) {
    return <></>;
  }
  if (threadCountQuery.isError) {
    return <></>;
  }

  const start = 1 + (page - 1) * MAX_THREAD_PER_PAGE;
  const end = Math.min(start + MAX_THREAD_PER_PAGE - 1, threadCount);

  return (
    <div className="text-xs text-gray-500">
      {start}-{end} of {threadCount}{" "}
    </div>
  );
};
