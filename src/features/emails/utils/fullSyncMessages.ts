import { db } from "@/server/db";

import { getGoogleMessageList } from "../api/getGoogleMessageList";
import { getGoogleMessages } from "../api/getGoogleMessages";
import { getUserToken } from "./getUserToken";
import { saveMessages } from "./saveMessages";

export const fullSyncMessages = async (
  userId: string,
  shouldResync = false,
) => {
  const token = await getUserToken(userId);
  if (!token) {
    // TODO: Handle error token
    return;
  }

  // TODO: Exponential back off, handling single query fail, limit retry time

  const [user] = await db.user.updateManyAndReturn({
    where: {
      id: userId,
      isFullSyncing: false,
    },
    data: {
      isFullSyncing: true,
    },
  });

  let curToken = undefined;
  if (!user) {
    // this is not the initial trigger
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        nextPageToken: true,
      },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    if (!user.nextPageToken) {
      throw new Error("Next page token not found.");
    }
    curToken = user.nextPageToken;
  } else {
    // This is the initial request
    // Only resync if specifically requested
    if (!shouldResync) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          isFullSyncing: false,
        },
      });
      return;
    }
    await db.message.deleteMany({
      where: {
        ownerId: userId,
      },
    });
  }

  while (true) {
    const messageList = await getGoogleMessageList({
      token,
      pageToken: curToken,
    });

    const messages = await getGoogleMessages({
      token,
      messagesId: messageList.messages.map(({ id }) => id),
    });

    await saveMessages({ messages, userId });

    if (!curToken) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          latestHistoryId: messages[0]?.historyId ?? null,
        },
      });
    }

    if (!messageList.nextPageToken) {
      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          nextPageToken: null,
          isFullSyncing: false,
        },
      });
      break;
    }
    curToken = messageList.nextPageToken;
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        nextPageToken: messageList.nextPageToken,
      },
    });
  }
};
