import { api } from "@/trpc/react";

export const useThreadList = (page: number) => {
  return api.thread.getList.useSuspenseQuery({
    page,
  });
};
