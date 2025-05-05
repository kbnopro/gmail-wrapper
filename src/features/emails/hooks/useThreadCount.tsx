import { api } from "@/trpc/react";

export const useThreadCount = (search: string) => {
  return api.thread.count.useSuspenseQuery({ search });
};
