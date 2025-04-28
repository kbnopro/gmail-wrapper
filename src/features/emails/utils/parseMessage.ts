import type { Message } from "../types";

export const parseMessage = (message: Message) => ({
  id: message.id,
  internalDate: new Date(parseInt(message.internalDate)),
  subject:
    message.payload.headers?.find(({ name }) => name == "Subject")?.value ?? "",
  snippet: message.snippet,
  threadId: message.threadId,
});
