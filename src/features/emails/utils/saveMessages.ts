import { db } from "@/server/db";

import type { Message } from "../types";
import { parseMessage } from "./parseMessage";

export const saveMessages = async ({
  messages,
  userId,
}: {
  messages: Message[];
  userId: string;
}) => {
  return db.message.createMany({
    data: messages.map((message) => {
      return {
        ...parseMessage(message),
        ownerId: userId,
      };
    }),
    skipDuplicates: true,
  });
};
