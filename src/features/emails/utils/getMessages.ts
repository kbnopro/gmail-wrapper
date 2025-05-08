import { db } from "@/server/db";

import { getAwsObject } from "../api/getAwsObject";

export const getMessages = async ({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) => {
  const messages = await db.message.findMany({
    where: {
      threadId,
      ownerId: userId,
    },
    select: {
      id: true,
      sender: true,
      receiver: true,
      internalDate: true,
      subject: true,
      references: true,
      replyTo: true,
      messageId: true,
      threadId: true,
    },
    orderBy: {
      internalDate: "asc",
    },
  });
  const messagesWithBody = await Promise.all(
    messages.map(async (message) => {
      return {
        ...message,
        body: await getAwsObject({ key: message.id }),
      };
    }),
  );
  return messagesWithBody;
};
