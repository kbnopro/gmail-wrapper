import { db } from "@/server/db";

import { fullSyncMessages } from "./fullSyncMessages";
import { partialSyncMessages } from "./partialSyncMessages";

export const syncMessages = async (userId: string) => {
  const [user] = await db.user.updateManyAndReturn({
    where: {
      id: userId,
      isPartialSyncing: false,
    },
    data: {
      isPartialSyncing: true,
    },
    select: {
      latestHistoryId: true,
    },
  });
  if (!user) {
    return;
  }
  const partialSyncQuery = await partialSyncMessages({
    userId,
    latestHistoryId: user.latestHistoryId,
  });
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      isPartialSyncing: false,
    },
  });
  if (!partialSyncQuery.ok) {
    // if partial sync does not work, stop everythin and full sync
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isFullSyncing: false,
        nextPageToken: null,
      },
    });
    await fullSyncMessages(userId, true);
  }
  // use the rest of the query time to full sync
  await fullSyncMessages(userId);
};
