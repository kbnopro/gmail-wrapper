import { db } from "@/server/db";

import { fullSyncMessages } from "./fullSyncMessages";
import { partialSyncMessages } from "./partialSyncMessages";

export const syncMessages = async (userId: string) => {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      latestHistoryId: true,
    },
  });
  const partialSyncQuery = await partialSyncMessages({
    userId,
    latestHistoryId: user.latestHistoryId,
  });
  if (!partialSyncQuery.ok) {
    // if partial sync does not work, stop everythin and full sync
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        nextPageToken: null,
      },
    });
    await fullSyncMessages(userId, true);
  }
  // use the rest of the query time to full sync
  await fullSyncMessages(userId);
};
