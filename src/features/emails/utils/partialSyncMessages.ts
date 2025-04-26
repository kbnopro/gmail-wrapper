import { db } from "@/server/db";

import { getGoogleHistories } from "../api/getGoogleHistories";
import { getGoogleMessages } from "../api/getGoogleMessages";
import { getUserToken } from "./getUserToken";
import { saveMessages } from "./saveMessages";

export const partialSyncMessages = async ({
  userId,
  latestHistoryId,
}: {
  userId: string;
  latestHistoryId: string;
}) => {
  console.log("Partial Sync");
  const token = await getUserToken(userId);
  if (!token) {
    // TODO: Handle error token
    return;
  }
  let curToken = undefined;
  while (true) {
    const histories = await getGoogleHistories({
      token,
      pageToken: curToken,
      latestHistoryId,
    });

    if (!histories) {
      return null;
    }

    if (!histories.history) {
      return undefined;
    }

    await Promise.all(
      histories.history.map(async (historyRecord) => {
        if (!!historyRecord.messagesAdded) {
          try {
            // Error cause by added then deleted message
            // TODO: Optimize this by not adding the already deleted message
            // Or just leave it like that
            const messages = await getGoogleMessages({
              token,
              messagesId: historyRecord.messagesAdded.map(
                ({ message }) => message.id,
              ),
            });
            await saveMessages({ messages, userId });
          } catch {}
        }

        if (!!historyRecord.messagesDeleted) {
          await db.message.deleteMany({
            where: {
              id: {
                in: historyRecord.messagesDeleted.map(
                  ({ message }) => message.id,
                ),
              },
            },
          });
        }
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            latestHistoryId: historyRecord.id,
          },
        });
      }),
    );
    if (!histories.nextPageToken) {
      break;
    }
    curToken = histories.nextPageToken;
  }
};
