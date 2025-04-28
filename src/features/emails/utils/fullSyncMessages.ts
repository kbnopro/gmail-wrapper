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
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      nextPageToken: true,
    },
  });

  if (user.nextPageToken === null) {
    if (!shouldResync) {
      return;
    }
    await db.message.deleteMany({
      where: {
        ownerId: userId,
      },
    });
  }

  let curToken = user.nextPageToken ?? undefined;

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

    // Optimistic concurrency control
    const [user] = await db.user.updateManyAndReturn({
      where: {
        id: userId,
        nextPageToken: curToken ?? null,
      },
      data: {
        nextPageToken: messageList.nextPageToken ?? null,
      },
    });
    if (!user) {
      break;
    }
    curToken = messageList.nextPageToken;
    if (!messageList.nextPageToken) {
      break;
    }
  }
};
