import { db } from "@/server/db";

import { deleteAwsObject } from "../api/deleteAwsObject";

export const deleteMessages = async ({
  userId,
  messagesId,
}: {
  userId: string;
  messagesId?: string[];
}) => {
  const parts = await db.messagePart.findMany({
    where: {
      message: {
        ownerId: userId,
        id: {
          in: messagesId,
        },
      },
    },
    select: {
      messageId: true,
      partId: true,
    },
  });
  const messages = await db.message.deleteMany({
    where: {
      ownerId: userId,
      id: {
        in: messagesId,
      },
    },
  });

  await Promise.all(
    parts.map(async (part) => {
      await deleteAwsObject({
        key: `${userId}_${part.messageId}_${part.partId}`,
      });
    }),
  );

  return messages;
};
