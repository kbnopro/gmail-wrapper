import { api } from "@/trpc/react";

export const useSyncMessages = () => {
  const utils = api.useUtils();
  return api.message.syncMessage.useMutation({
    async onSettled() {
      await utils.message.getList.invalidate();
    },
  });
};
