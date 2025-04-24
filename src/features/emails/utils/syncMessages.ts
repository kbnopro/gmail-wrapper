import { db } from "@/server/db";

import { fullSyncMessages } from "./fullSyncMessages";

export const syncMessages = async (userId: string) => {
  // Simple optimistic concurrency control
  const syncState = await db.user.update({
    where: {
      id: userId,
      isFullSync: false,
    },
    data: {
      isFullSync: true,
    },
  });
  if (!syncState) {
    return;
  }
  // TODO: Implement partial sync
  await fullSyncMessages(userId);

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      isFullSync: false,
    },
  });
};
