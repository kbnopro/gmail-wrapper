"use client";
import { useMessages } from "../../hooks/useMessages";
import { useEditorStore } from "../../stores/editor";
import { MessageRow } from "./MessageRow";

export const ThreadBody = ({ threadId }: { threadId: string }) => {
  const [messages, messagesQuery] = useMessages(threadId);
  const setForward = useEditorStore((state) => state.setForward);

  if (messagesQuery.isLoading) {
    return <></>;
  }

  const subject = messages[0]!.subject;

  return (
    <div className="flex h-0 w-full grow flex-col overflow-y-auto">
      <div className="h-12 w-full shrink-0 grow-0 pl-[72px] pt-3 text-2xl text-gray-800">
        {subject}
      </div>
      <div className="divide-y-gray-100 flex h-fit w-full flex-col divide-y">
        {messages.map((message) => (
          <MessageRow
            key={message.id}
            message={message}
            setForward={setForward}
          />
        ))}
      </div>
    </div>
  );
};
