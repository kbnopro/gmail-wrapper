"use client";

import { mergeAttributes, Node } from "@tiptap/core";
import Blockquote from "@tiptap/extension-blockquote";
import { EditorContent, NodeViewWrapper, useEditor } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEditorStore } from "../../stores/editor";
import { RawHtml } from "../RawHtml";

const rawHtmlComponent = (html: string) =>
  Node.create({
    name: "reactComponent",

    group: "block",

    atom: true,

    addAttributes() {
      return {
        count: {
          default: 0,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "react-component",
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ["react-component", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
      return ReactNodeViewRenderer(() => {
        return (
          <NodeViewWrapper className="react-component">
            <RawHtml html={html} />
          </NodeViewWrapper>
        );
      });
    },
  });

const Tiptap = () => {
  const rawContent = useEditorStore((state) => state.rawContent);
  const content = useEditorStore((state) => state.content);
  const setContent = useEditorStore((state) => state.setContent);
  const editor = useEditor({
    autofocus: "start",
    extensions: [
      StarterKit,
      rawHtmlComponent(rawContent),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l border-l-gray-200 pl-[1rem] my-1",
        },
      }),
    ],
    enableContentCheck: true,
    content,
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
