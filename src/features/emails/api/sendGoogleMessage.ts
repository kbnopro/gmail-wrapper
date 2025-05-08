import type { GoogleMessage } from "../types";

type SendMessage = Pick<GoogleMessage, "raw"> &
  Partial<Pick<GoogleMessage, "threadId">>;

export const sendGoogleMessage = async ({
  message,
  token,
}: {
  message: SendMessage;
  token: string;
}) => {
  const url = new URL(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
  );
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    console.error(await res.json());
    throw new Error("Error sending messages");
  }

  return (await res.json()) as GoogleMessage;
};
