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
      messageParts: {
        select: {
          partId: true,
        },
        orderBy: {
          partId: "asc",
        },
      },
    },
    orderBy: {
      internalDate: "asc",
    },
  });
  const messagesWithBody = await Promise.all(
    messages.map(async (message) => {
      return {
        ...message,
        messageParts: await Promise.all(
          message.messageParts.map(async (part) => {
            const body = await getAwsObject({
              key: `${userId}_${message.id}_${part.partId}`,
            });
            return {
              ...part,
              body: body,
            };
          }),
        ),
      };
    }),
  );
  return messagesWithBody;
};
