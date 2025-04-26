import type { Message } from "../types";

export const getGoogleMessage = async ({
  token,
  messageId,
}: {
  token: string;
  messageId: string;
}) => {
  const res = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    console.log(await res.json());
    throw new Error("Fail to fetch single message");
  }
  return (await res.json()) as Message;
};
