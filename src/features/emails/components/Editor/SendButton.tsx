"use client";

import { useSendMessage } from "../../hooks/useSendMessage";
import { useEditorStore } from "../../stores/editor";

export const SendButton = () => {
  const sendMessageQuery = useSendMessage();
  const editorState = useEditorStore((state) => state);
  return (
    <button
      onClick={() => {
        sendMessageQuery.mutate({
          replyContext: editorState.replyContext,
          type: editorState.type,
          subject: editorState.subject,
          recipients: editorState.recipients,
          html: editorState.content.replace(
            RegExp("<react-component.*", "g"),
            editorState.rawContent,
          ),
        });
        editorState.setNone();
      }}
      disabled={sendMessageQuery.isPending}
      className="rounded-full bg-blue-700 px-5 py-2 text-white shadow-blue-900 hover:shadow-lg hover:ring-1"
    >
      {sendMessageQuery.isPending ? "Sending" : "Send"}
    </button>
  );
};
