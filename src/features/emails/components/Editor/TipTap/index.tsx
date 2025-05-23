"use client";

import { mergeAttributes, Node } from "@tiptap/core";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, NodeViewWrapper, useEditor } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { useEditorStore } from "../../../stores/editor";
import { RawHtml } from "../../RawHtml";
import { FunctionBar } from "./FunctionBar";

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
  const setCurrentContent = useEditorStore((state) => state.setCurrentContent);
  const editor = useEditor(
    {
      autofocus: "start",
      extensions: [
        StarterKit.configure({
          blockquote: {
            HTMLAttributes: {
              class: "border-l border-l-gray-200 pl-[1rem] my-1",
            },
          },
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
          defaultAlignment: "left",
        }),
        rawHtmlComponent(rawContent),
      ],
      enableContentCheck: true,
      content,
      editorProps: {
        attributes: {
          class: "focus:outline-0 text-sm text-gray-700 py-2",
        },
      },
      onUpdate: ({ editor }) => {
        setCurrentContent(editor.getHTML());
      },
      immediatelyRender: false,
    },
    [content],
  );

  return (
    <div className="relative flex h-0 w-full grow flex-col">
      <div
        className="w-full grow cursor-text overflow-auto"
        onClick={() => {
          editor?.commands.focus();
        }}
      >
        <EditorContent editor={editor} />
      </div>
      <FunctionBar editor={editor} />
    </div>
  );
};

export default Tiptap;
