import { db } from "@/server/db";

import { getGoogleMessageList } from "../api/getGoogleMessageList";
import { getGoogleMessages } from "../api/getGoogleMessages";
import { getUserToken } from "./getUserToken";
import { saveMessages } from "./saveMessages";

export const fullSyncMessages = async (userId: string) => {
  const token = await getUserToken(userId);
  if (!token) {
    // TODO: Handle error token
    return;
  }

  // TODO: Exponential back off, handling single query fail, limit retry time

  await db.message.deleteMany({
    where: {
      ownerId: userId,
    },
  });

  let curToken = undefined;
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
      break;
    }

    curToken = messageList.nextPageToken;
  }
};
