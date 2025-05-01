import { db } from "@/server/db";

import { putAwsObject } from "../api/putAwsObject";
import type { Message } from "../types";
import { parseMessage } from "./parseMessage";

export const saveMessages = async ({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) => {
  await Promise.all(
    messages.map(async (message) => {
      const mainPart = message.payload;
      if (mainPart.mimeType.startsWith("multipart")) {
        await Promise.all(
          mainPart.parts.map(async (part) => {
            await putAwsObject({
              key: `${userId}_${message.id}_${part.partId}`,
              body: part.body.data,
              contentType: part.mimeType,
            });
          }),
        );
      } else {
        await putAwsObject({
          key: `${userId}_${message.id}_0`,
          body: mainPart.body.data,
          contentType: mainPart.mimeType,
        });
      }
    }),
  );

  return db.$transaction(async (tx) => {
    await tx.message.createMany({
      data: messages
        .map((message) => {
          try {
            parseMessage(message);
          } catch {
            // TODO: Handle parse error (mostly caused by message not found)
            return undefined;
          }
          return {
            ...parseMessage(message),
            ownerId: userId,
          };
        })
        .filter((message) => !!message),
      skipDuplicates: true,
    });
    return await tx.messagePart.createMany({
      data: messages
        .flatMap((message) => {
          try {
            parseMessage(message);
          } catch {
            // TODO: Handle parse error (mostly caused by message not found)
            return undefined;
          }
          const mainPart = message.payload;
          return mainPart.mimeType.startsWith("multipart")
            ? mainPart.parts.map((part) => {
                return {
                  messageId: message.id,
                  partId: parseInt(part.partId),
                };
              })
            : [
                {
                  messageId: message.id,
                  partId: 0,
                },
              ];
        })
        .filter((message) => !!message),
      skipDuplicates: true,
    });
  });
};
