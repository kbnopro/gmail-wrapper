import { create } from "zustand";

interface StoreType {
  type: "none" | "send" | "reply" | "forward";
  headerSubject: string;
  recipients: string[];
  subject: string;
  setSend: () => void;
  setNone: () => void;
  addRecipients: (email: string) => void;
  removeRecipients: (email: string) => void;
  setSubject: (subject: string) => void;
}

export const useEditorStore = create<StoreType>((set) => ({
  type: "none",
  headerSubject: "",
  recipients: [],
  subject: "",
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
        };
      }
      return state;
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
}));
