import { db } from "@/server/db";

import { getGoogleMessageList } from "../api/getGoogleMessageList";
import { getGoogleMessages } from "../api/getGoogleMessages";
import { getUserToken } from "./getUserToken";

export const syncMessages = async (userId: string) => {
  const token = await getUserToken(userId);
  if (!token) {
    return;
  }

  // TODO: Exponential back off, handling single query fail, limit retry time
  let curToken = undefined;
  while (true) {
    const messageList = await getGoogleMessageList({
      token,
      pageToken: curToken,
    });

    const messages = await getGoogleMessages(
      token,
      messageList.messages.map(({ id }) => id),
    );

    await db.message.createMany({
      data: messages.map((message) => {
        const dateLen = message.internalDate.length;
        const internalDate = message.internalDate.substring(0, dateLen - 3);
        return {
          internalDate: new Date(parseInt(internalDate)),
          subject: message.payload.headers.find(() => true)?.value ?? "",
          snippet: message.snippet,
          threadId: message.threadId,
          ownerId: userId,
        };
      }),
    });

    curToken = messageList.nextPageToken;
  }
};
