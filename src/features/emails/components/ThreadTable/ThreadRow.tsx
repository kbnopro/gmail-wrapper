import { useEffect, useState } from "react";

import type { Thread } from "../../types";

const MediumDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

const ShortTime = new Intl.DateTimeFormat("en-US", {
  timeStyle: "short",
});
const getDisplayedDate = (date: Date) => {
  const now = new Date(Date.now());
  if (date.getFullYear() == now.getFullYear()) {
    if (date.getMonth() == now.getMonth() && date.getDate() == now.getDate()) {
      return ShortTime.format(date);
    }
    return MediumDate.format(date).split(",")[0];
  }
  return MediumDate.format(date);
};

export const ThreadRow = ({
  subject,
  threadId,
  snippet,
  internalDate,
}: Thread) => {
  const [displayedDate, setDisplayedDate] = useState<string | null>(null);
  useEffect(() => {
    const date = new Date(internalDate);
    setDisplayedDate(getDisplayedDate(date) ?? "");
  }, [internalDate]);
  return (
    <div
      key={threadId}
      className="flex h-fit w-full cursor-pointer border-t border-t-gray-200 px-6 py-2 hover:border-t-gray-300 hover:shadow-md"
    >
      <div className="flex w-0 grow gap-16">
        <div className="grow truncate text-gray-500">
          <span className="text-gray-800">{subject.trim()}</span>
          {" - "}
          <span>{snippet.trim()}</span>
        </div>
        <div className="shrink-0 text-sm text-gray-500">
          {displayedDate ?? (
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200"></div>
          )}
        </div>
      </div>
    </div>
  );
};
