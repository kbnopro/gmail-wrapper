import { XMarkIcon } from "@heroicons/react/24/outline";

import { useEditorStore } from "../../stores/editor";

export const Header = () => {
  const editorState = useEditorStore((state) => state);
  if (editorState.type == "none") {
    return <></>;
  }
  const subject =
    editorState.type == "send" ? "New Message" : editorState.headerSubject;
  return (
    <div className="flex h-fit w-full items-center bg-blue-50 p-3 text-sm font-medium">
      <div className="h-fit grow">{subject}</div>
      <button
        onClick={() => {
          editorState.setNone();
        }}
      >
        <XMarkIcon className="size-4" strokeWidth={2.5} />
      </button>
    </div>
  );
};
