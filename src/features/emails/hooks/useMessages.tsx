import { api } from "@/trpc/react";

export const useMessages = (threadId: string) => {
  return api.message.getAll.useSuspenseQuery({ threadId });
};
