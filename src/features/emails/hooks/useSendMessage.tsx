import { api } from "@/trpc/react";

export const useSendMessage = () => {
  const utils = api.useUtils();
  return api.message.send.useMutation({
    async onSettled() {
      await utils.thread.getList.invalidate();
      await utils.thread.count.invalidate();
    },
  });
};
