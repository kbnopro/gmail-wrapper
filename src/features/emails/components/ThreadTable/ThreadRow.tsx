import type { Thread } from "../../types";

export const ThreadRow = ({ subject, threadId }: Thread) => {
  return (
    <div key={threadId} className="h-fit w-full">
      {subject}
    </div>
  );
};
