import { type db } from "@/server/db";

export interface Message {
  id: string;
  threadId: string;
  internalDate: string;
  snippet: string;
  historyId: string;
  raw: string;
  error?: string;
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
