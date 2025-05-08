import { simpleParser } from "mailparser";

import { db } from "@/server/db";

import { putAwsObject } from "../api/putAwsObject";
import type { GoogleMessage } from "../types";

export const saveMessages = async ({
  messages,
  userId,
}: {
  messages: GoogleMessage[];
  userId: string;
}) => {
  const parsedMessages = await Promise.all(
    messages.map(async (message) => ({
      ...message,
      content: await simpleParser(
        Buffer.from(message.raw, "base64").toString(),
      ),
    })),
  );

  await Promise.all(
    parsedMessages.map(async (message) => {
      await putAwsObject({
        key: message.id,
        body: message.content.html
          ? message.content.html
          : (message.content.text ?? ""),
        contentType: message.content.html ? "text/html" : "text/plain",
      });
    }),
  );

  return db.$transaction(async (tx) => {
    await tx.message.createMany({
      data: parsedMessages
        .map((message) => {
          const receivers = message.content.to
            ? [message.content.to]
                .flat()
                .map((receiver) => receiver.text)
                .join("\n")
            : "";
          return {
            id: message.id,
            ownerId: userId,
            internalDate: new Date(parseInt(message.internalDate)),
            subject: message.content.subject ?? "",
            sender: message.content.from?.text ?? "",
            receiver: receivers,
            snippet: message.snippet,
            threadId: message.threadId,
            content: message.content.text ?? "",
            messageId: message.content.messageId ?? "",
            replyTo: message.content.replyTo?.text,
            references: [message.content.references ?? ""].flat().join(" "),
          };
        })
        .filter((message) => !!message),
      skipDuplicates: true,
    });
  });
};
