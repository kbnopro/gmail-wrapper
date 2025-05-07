import {
  ArrowTurnUpLeftIcon,
  ArrowTurnUpRightIcon,
} from "@heroicons/react/24/outline";
import DOMPurify from "isomorphic-dompurify";

import { getDisplayedDate } from "../../utils/getDisplayedDate";
import type { getMessages } from "../../utils/getMessages";

const parseSender = (sender: string) => {
  const search = /"(.*)" <(.*)>/.exec(sender);
  if (!search) {
    return {
      username: sender,
      email: undefined,
    };
  }
  return {
    username: search[1]!,
    email: search[2]!,
  };
};

export const Message = ({
  message,
}: {
  message: Awaited<ReturnType<typeof getMessages>>[number];
}) => {
  const { username, email } = parseSender(message.sender);
  return (
    <div className="flex h-fit w-full flex-col items-center pt-5">
      <div className="flex w-full">
        <div className="h-fit px-4">
          <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
            {username[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex h-12 w-full flex-col">
            <div className="flex w-full justify-between gap-3">
              <div className="flex h-fit gap-2">
                <div className="font-semibold">{username}</div>
                <div className="flex items-center text-xs text-gray-800">
                  {email && `<${email}>`}
                </div>
              </div>
              <div className="mr-6 flex items-center gap-4 text-gray-800">
                <div className="h-fit text-xs text-gray-600">
                  {getDisplayedDate(message.internalDate)}
                </div>
                <button className="flex rounded-full p-2 hover:bg-gray-100">
                  <ArrowTurnUpLeftIcon className="size-[18px]" />
                </button>
                <button className="flex rounded-full p-2 hover:bg-gray-100">
                  <ArrowTurnUpRightIcon className="size-[18px]" />
                </button>
              </div>
            </div>
          </div>
          <div
            className="text-md pb-5 text-xs font-normal text-gray-800"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(message.body),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
