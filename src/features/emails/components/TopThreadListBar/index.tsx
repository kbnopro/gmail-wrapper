import { Pagination } from "./Pagination";
import { RefreshButton } from "./RefreshButton";

export const TopThreadListBar = ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  return (
    <div className="flex h-12 w-full items-center justify-between px-3">
      <RefreshButton />
      <Pagination page={page} search={search} />
    </div>
  );
};
