import type { Thread } from "../../types";
import { MediumDate, ShortTime } from "../../utils/dateTimeFormat";

export const ThreadRow = ({
  subject,
  threadId,
  snippet,
  internalDate,
}: Thread) => {
  const date = new Date(internalDate);
  const now = new Date(Date.now());
  const displayedDate = () => {
    if (date.getFullYear() == now.getFullYear()) {
      if (date.getMonth() == now.getMonth() && date.getDay() == now.getDay()) {
        return ShortTime.format(date);
      }
      return MediumDate.format(date).split(",")[0];
    }
    return MediumDate.format(date);
  };
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
        <div className="shrink-0 text-sm text-gray-500">{displayedDate()}</div>
      </div>
    </div>
  );
};
