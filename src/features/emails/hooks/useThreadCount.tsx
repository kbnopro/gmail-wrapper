import { api } from "@/trpc/react";

export const useThreadCount = () => {
  return api.thread.count.useSuspenseQuery();
};
