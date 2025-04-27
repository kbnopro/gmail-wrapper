import { Pagination } from "./Pagination";
import { RefreshButton } from "./RefreshButton";

export const TopEmailBar = ({ page }: { page: number }) => {
  return (
    <div className="flex h-12 w-full items-center justify-between px-3">
      <RefreshButton />
      <Pagination page={page} />
    </div>
  );
};
