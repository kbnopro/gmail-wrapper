import { create } from "zustand";

import type { Message } from "../types";

interface StoreType {
  type: "none" | "send" | "reply" | "forward";
  headerSubject: string;
  recipients: string[];
  subject: string;
  content: string;
  rawContent: string;
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
    set((state) => {
      return {};
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
