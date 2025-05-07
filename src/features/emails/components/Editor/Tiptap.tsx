"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEditorStore } from "../../stores/editor";

const Tiptap = () => {
  const content = useEditorStore((state) => state.content);
  const setContent = useEditorStore((state) => state.setContent);
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class: "focus:outline-0 text-sm text-gray-700 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div
      className="grow cursor-text overflow-auto"
      onClick={() => {
        editor?.commands.focus();
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
