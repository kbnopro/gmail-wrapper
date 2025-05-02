import { db } from "@/server/db";

import { deleteAwsObject } from "../api/deleteAwsObject";

export const deleteMessages = async ({
  userId,
  messagesId,
}: {
  userId: string;
  messagesId?: string[];
}) => {
  const messages = await db.message.findMany({
    where: {
      ownerId: userId,
      id: {
        in: messagesId,
      },
    },
  });
  await db.message.deleteMany({
    where: {
      ownerId: userId,
      id: {
        in: messagesId,
      },
    },
  });
  await Promise.all(
    messages.map(async (message) => {
      await deleteAwsObject({ key: message.id });
    }),
  );

  return messages;
};
