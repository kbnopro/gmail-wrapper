import type { getMessages } from "./utils/getMessages";
import type { getThreadList } from "./utils/getThreadList";

export interface GoogleMessage {
  id: string;
  threadId: string;
  internalDate: string;
  snippet: string;
  historyId: string;
  raw: string;
  error?: string;
}

export interface GoogleMessageList {
  messages: Pick<GoogleMessage, "id" | "threadId">[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

export type Thread = Awaited<ReturnType<typeof getThreadList>>[number];

export type DisplayedThread = Omit<Thread, "internalDate" | "content"> & {
  internalDate?: string;
};

export type Message = Awaited<ReturnType<typeof getMessages>>[number];

export interface HistoryList {
  historyId: string;
  nextPageToken?: string;
  history?: {
    id: string;
    messagesAdded?: {
      message: GoogleMessage;
    }[];
    messagesDeleted?: {
      message: GoogleMessage;
    }[];
  }[];
}
