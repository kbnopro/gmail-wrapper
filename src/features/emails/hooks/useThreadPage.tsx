import { api } from "@/trpc/react";

export const useThreadPage = (threadId: string) => {
  return api.thread.getPage.useSuspenseQuery({ threadId });
};
