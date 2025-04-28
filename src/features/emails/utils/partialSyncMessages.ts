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
  latestHistoryId: string | null;
}) => {
  const token = await getUserToken(userId);
  if (!token) {
    // TODO: Handle error token
    return { ok: true };
  }
  if (latestHistoryId === null) {
    return { ok: false };
  }

  let curToken = undefined;
  while (true) {
    const histories = await getGoogleHistories({
      token,
      pageToken: curToken,
      latestHistoryId,
    });

    if (!histories) {
      // cannot find history
      return { ok: false };
    }

    if (!histories.history) {
      return { ok: true };
    }

    await Promise.all(
      histories.history.map(async (historyRecord) => {
        if (!!historyRecord.messagesAdded) {
          const messages = await getGoogleMessages({
            token,
            messagesId: historyRecord.messagesAdded.map(
              ({ message }) => message.id,
            ),
          });
          await saveMessages({ messages, userId });
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
        const [newUser] = await db.user.updateManyAndReturn({
          where: {
            id: userId,
            latestHistoryId,
          },
          data: {
            latestHistoryId: historyRecord.id,
          },
        });
        if (!newUser) {
          return { ok: true };
        }
      }),
    );
    if (!histories.nextPageToken) {
      break;
    }
    curToken = histories.nextPageToken;
  }
  return { ok: true };
};
