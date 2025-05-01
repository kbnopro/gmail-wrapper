import type { Prisma } from "@prisma/client";

import type { Message } from "../types";

export const parseMessage = (
  message: Message,
): Omit<Prisma.MessageCreateManyInput, "ownerId"> => ({
  id: message.id,
  internalDate: new Date(parseInt(message.internalDate)),
  subject:
    message.payload.headers?.find(({ name }) => name == "Subject")?.value ?? "",
  sender:
    message.payload.headers?.find(({ name }) => name == "From")?.value ?? "",
  receiver:
    message.payload.headers?.find(({ name }) => name == "To")?.value ?? "",
  snippet: message.snippet,
  threadId: message.threadId,
});
