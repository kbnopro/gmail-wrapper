import { api } from "@/trpc/react";

export const useSendMessage = () => {
  return api.message.send.useMutation();
};
