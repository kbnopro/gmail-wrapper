import { db } from "@/server/db";

import { fullSyncMessages } from "./fullSyncMessages";
import { partialSyncMessages } from "./partialSyncMessages";

export const syncMessages = async (userId: string) => {
  // Simple optimistic concurrency control
  try {
    const [syncState] = await db.user.updateManyAndReturn({
      where: {
        id: userId,
        isFullSync: false,
      },
      data: {
        isFullSync: true,
      },
      select: {
        isFullSync: true,
        latestHistoryId: true,
      },
    });
    if (!syncState?.isFullSync) {
      return;
    }

    if (!!syncState.latestHistoryId) {
      const partialSyncResult = await partialSyncMessages({
        userId,
        latestHistoryId: syncState.latestHistoryId,
      });
      if (partialSyncResult === null) {
        await fullSyncMessages(userId);
      }
    } else {
      await fullSyncMessages(userId);
    }
  } catch (e) {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        isFullSync: false,
      },
    });
    console.error(e);
    throw e;
  }

  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      isFullSync: false,
    },
  });
};
