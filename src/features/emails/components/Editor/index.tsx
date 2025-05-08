"use client";

import { useEditorStore } from "../../stores/editor";
import { Header } from "./Header";
import { Recipients } from "./Recipients";
import { SendButton } from "./SendButton";
import { Subject } from "./Subject";
import Tiptap from "./TipTap";

export const Editor = () => {
  const editorType = useEditorStore((state) => state.type);
  if (editorType == "none") {
    return <></>;
  }
  return (
    <div className="fixed bottom-0 right-10 flex size-[600px] flex-col overflow-hidden rounded-t-lg bg-white shadow-xl shadow-gray-400">
      <Header />
      <div className="flex h-0 w-full grow flex-col px-4 pb-3">
        <Recipients />
        <Subject />
        <Tiptap />
        <div className="mt-2 flex h-fit w-full justify-end">
          <SendButton />
        </div>
      </div>
    </div>
  );
};
