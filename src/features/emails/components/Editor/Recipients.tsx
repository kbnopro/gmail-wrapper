"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

import { useEditorStore } from "../../stores/editor";

export const Recipients = () => {
  const editorType = useEditorStore((state) => state.type);
  const inputElement = useRef<null | HTMLInputElement>(null);
  const recipients = useEditorStore((state) => state.recipients);
  const recipientsLength = recipients.length;
  const addRecipients = useEditorStore((state) => state.addRecipients);
  const removeRecipients = useEditorStore((state) => state.removeRecipients);
  if (editorType == "none") {
    return <></>;
  }
  return (
    <div
      tabIndex={0}
      className="group flex min-h-10 w-full shrink-0 cursor-text items-center border-b border-gray-200 py-2 text-sm text-gray-700"
      onClick={() => {
        inputElement.current?.focus();
      }}
    >
      <div className="hidden w-full flex-wrap items-center gap-2 group-focus-within:flex">
        <div>To:</div>
        {recipients.map((value) => (
          <div
            className="flex size-fit items-center gap-1 rounded-xl border border-gray-400 px-2 py-px"
            key={value}
          >
            {value}
            <button
              className="focus:outline-0"
              onClick={() => {
                removeRecipients(value);
              }}
            >
              <XMarkIcon className="size-[14px]" strokeWidth={2.5} />
            </button>
          </div>
        ))}
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addRecipients(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
          ref={inputElement}
          autoFocus
          className="w-20 shrink-0 grow focus:outline-0"
        />
      </div>
      <div className="flex items-center gap-2 group-focus-within:hidden">
        {recipientsLength ? (
          <>
            <div>{recipients[0]!}</div>
            {recipientsLength > 1 && (
              <div className="rounded-md border border-gray-400 bg-gray-100 px-1 py-px text-xs font-medium text-gray-800">{`${recipientsLength - 1} more`}</div>
            )}
          </>
        ) : (
          <div className="text-gray-500">Recipients</div>
        )}
      </div>
    </div>
  );
};
