interface MessageHeader {
  name: string;
  value: string;
}

interface MessagePart {
  partId: string;
  mimeType: string;
  filename?: string;
  headers: MessageHeader[];
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
