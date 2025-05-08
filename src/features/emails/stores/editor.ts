import { create } from "zustand";

import type { Message } from "../types";

const dateTimeFormater = new Intl.DateTimeFormat("en-us", {
  dateStyle: "medium",
  timeStyle: "medium",
});
const replyDateTime = (date: Date) => {
  return dateTimeFormater.format(date);
};
interface StoreType {
  type: "none" | "send" | "reply" | "forward";
  headerSubject: string;
  recipients: string[];
  subject: string;
  content: string;
  rawContent: string;
  replyContext?: {
    threadId: string;
    references: string;
    inReplyTo: string;
  };
  setSend: () => void;
  setNone: () => void;
  setForward: (message: Message) => void;
  setReply: (message: Message) => void;
  addRecipients: (email: string) => void;
  removeRecipients: (email: string) => void;
  setSubject: (subject: string) => void;
  setContent: (content: string) => void;
}

export const useEditorStore = create<StoreType>((set) => ({
  type: "none",
  headerSubject: "",
  recipients: [],
  subject: "",
  content: "",
  rawContent: "",
  setNone: () => {
    set(() => ({ type: "none" }));
  },
  setSend: () => {
    set((state) => {
      if (state.type != "send") {
        return {
          ...state,
          type: "send",
          headerSubject: "New Message",
          recipients: [],
          subject: "",
          content: "",
          rawContent: "",
        };
      }
      return state;
    });
  },
  setForward: (message: Message) => {
    set(() => {
      const hasPrependedSubject = ["Re: ", "Fwd: "].some((start) =>
        message.subject.startsWith(start),
      );
      const indexOfCollon = message.subject.indexOf(":");
      const subject = `Fwd: ${hasPrependedSubject ? message.subject.substring(indexOfCollon + 2) : message.subject}`;
      const content = `
      <p></p>
      <p>----------- Forwarded message ----------</p>
      <p>From: ${message.sender}</p>
      <p>Subject: ${message.subject}</p>
      <p>To: ${message.receiver}</p>
      <p></p>
      <react-component></react-component>
      `;
      return {
        type: "forward",
        headerSubject: subject,
        subject: subject,
        content: content,
        rawContent: message.body,
        recipients: [],
      };
    });
  },
  setReply: (message: Message) => {
    const hasPrependedSubject = ["Re: ", "Fwd: "].some((start) =>
      message.subject.startsWith(start),
    );

    const content = `
      <p></p>
      <p></p>
      At ${replyDateTime(message.internalDate)}, ${message.sender} wrote:
      <blockquote>
        <react-component></react-component>
      </blockquote>
    `;
    const indexOfCollon = message.subject.indexOf(":");
    const subject = `Re: ${hasPrependedSubject ? message.subject.substring(indexOfCollon + 2) : message.subject}`;
    set(() => {
      return {
        type: "reply",
        headerSubject: subject,
        subject: subject,
        content,
        rawContent: message.body,
        recipients: [message.replyTo ?? message.sender],
        replyContext: {
          inReplyTo: message.id,
          references: `${message.references} ${message.id}`,
          threadId: message.threadId,
        },
      };
    });
  },
  addRecipients(email) {
    set((state) => {
      if (!email.length) return {};
      if (!!state.recipients.find((value) => value == email.trim())) {
        // make sure emails are unique
        return {};
      }
      return {
        recipients: [...state.recipients, email],
      };
    });
  },
  removeRecipients(email) {
    set((state) => {
      return {
        recipients: [...state.recipients.filter((value) => value != email)],
      };
    });
  },
  setSubject(subject) {
    set(() => {
      return {
        subject,
      };
    });
  },
  setContent(content) {
    set(() => {
      return {
        content,
      };
    });
  },
}));
