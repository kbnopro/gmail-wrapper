import Link from "next/link";

import type { DisplayedThread } from "../../types";

export const ThreadRow = ({
  subject,
  threadId,
  snippet,
  internalDate,
  sender,
  receiver,
  email,
}: DisplayedThread & { email: string }) => {
  const isSender = sender.includes(email);
  console.log(sender, receiver);

  const dislayedName = (name: string) => {
    return name
      .replace(RegExp("<.*>"), "")
      .replace(RegExp("@.*"), "")
      .replaceAll('"', "");
  };

  return (
    <Link
      href={`/email/${threadId}`}
      key={threadId}
      className="flex h-fit w-full cursor-pointer border-t border-t-gray-200 px-6 py-2 hover:border-t-gray-300 hover:shadow-md"
    >
      <div className="flex w-0 grow items-center gap-10">
        <div className="line-clamp-1 shrink-0 grow-0 basis-44 text-wrap text-sm font-medium">
          {isSender ? `To: ${dislayedName(receiver)}` : dislayedName(sender)}
        </div>
        <div className="grow truncate text-sm text-gray-500">
          <span className="text-gray-800">{subject.trim()}</span>
          {snippet.length ? " - " : ""}
          <span>{snippet.trim()}</span>
        </div>
        <div className="shrink-0 text-sm text-gray-500">
          {internalDate ?? (
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200"></div>
          )}
        </div>
      </div>
    </Link>
  );
};
