import type { MessageList } from "../types";

export const getGoogleMessageList = async ({
  token,
  pageToken,
}: {
  token: string;
  pageToken?: string;
}) => {
  const url = new URL(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages",
  );
  url.searchParams.set("maxResults", "20");
  if (pageToken) {
    url.searchParams.set("pageToken", pageToken);
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    console.error(await res.json());
    throw new Error("Error querying google thread list");
  }
  return (await res.json()) as MessageList;
};
