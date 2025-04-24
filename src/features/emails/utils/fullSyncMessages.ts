import { db } from "@/server/db";

import { getGoogleMessageList } from "../api/getGoogleMessageList";
import { getGoogleMessages } from "../api/getGoogleMessages";
import { getUserToken } from "./getUserToken";

export const fullSyncMessages = async (userId: string) => {
  // Perform a full sync
  const token = await getUserToken(userId);
  if (!token) {
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

    await db.message.createMany({
      data: messages.map((message) => {
        return {
          internalDate: new Date(parseInt(message.internalDate)),
          subject:
            message.payload.headers.find(({ name }) => name == "Subject")
              ?.value ?? "",
          snippet: message.snippet,
          threadId: message.threadId,
          ownerId: userId,
        };
      }),
      skipDuplicates: true,
    });

    if (!messageList.nextPageToken) {
      break;
    }

    curToken = messageList.nextPageToken;
  }
};
