import type { getMessages } from "../../utils/getMessages";

export const Message = ({
  message,
}: {
  message: Awaited<ReturnType<typeof getMessages>>[number];
}) => {
  return (
    <div className="h-fit w-full flex-col items-center">
      {message.messageParts.map((part) => {
        return (
          <div
            key={part.partId}
            dangerouslySetInnerHTML={{ __html: part.body }}
          ></div>
        );
      })}
    </div>
  );
};
