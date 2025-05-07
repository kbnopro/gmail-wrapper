"use client";

import { useEditorStore } from "../../stores/editor";
import { Header } from "./Header";
import { Recipients } from "./Recipients";
import { Subject } from "./Subject";

export const Editor = () => {
  const editorType = useEditorStore((state) => state.type);
  if (editorType == "none") {
    return <></>;
  }
  return (
    <div className="fixed bottom-0 right-10 flex size-[600px] flex-col overflow-hidden rounded-t-lg bg-white shadow-xl shadow-gray-400">
      <Header />
      <div className="flex flex-col px-4">
        <Recipients />
        <Subject />
      </div>
    </div>
  );
};
