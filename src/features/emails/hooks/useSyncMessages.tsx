import { api } from "@/trpc/react";

export const useSyncMessages = () => {
  const utils = api.useUtils();
  return api.message.sync.useMutation({
    async onSettled() {
      await utils.thread.getList.invalidate();
    },
  });
};
