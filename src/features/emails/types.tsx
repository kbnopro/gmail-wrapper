import { type db } from "@/server/db";

interface MessageHeader {
  name: string;
  value: string;
}

interface MessagePart {
  partId: string;
  mimeType: string;
  filename?: string;
  headers?: MessageHeader[];
  body: {
    size: number;
    data: string;
  };
  parts: MessagePart[];
}

export interface Message {
  id: string;
  threadId: string;
  internalDate: string;
  snippet: string;
  historyId: string;
  payload: MessagePart;
}

export interface MessageList {
  messages: Pick<Message, "id" | "threadId">[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

export type Thread = Awaited<ReturnType<typeof db.message.findMany>>[number];
export type DisplayedThread = Omit<Thread, "internalDate"> & {
  internalDate?: string;
};

export interface HistoryList {
  historyId: string;
  nextPageToken?: string;
  history?: {
    id: string;
    messagesAdded?: {
      message: Message;
    }[];
    messagesDeleted?: {
      message: Message;
    }[];
  }[];
}
