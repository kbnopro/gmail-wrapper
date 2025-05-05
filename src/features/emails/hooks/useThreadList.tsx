import { api } from "@/trpc/react";

export const useThreadList = ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  return api.thread.getList.useSuspenseQuery({
    search,
    page,
  });
};
