import DOMPurify from "isomorphic-dompurify";

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
    <div className="h-fit w-full flex-col items-center pt-5">
      <div className="flex">
        <div className="h-fit px-4">
          <div className="flex size-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
            {username[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-12 flex-col">
            <div className="flex h-fit gap-2">
              <div className="font-semibold">{username}</div>
              <div className="flex items-center text-xs text-gray-800">
                {email && `<${email}>`}
              </div>
            </div>
          </div>
          <div
            className="text-md pb-4 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(message.body),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
