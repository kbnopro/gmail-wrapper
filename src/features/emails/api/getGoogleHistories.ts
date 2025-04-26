import type { HistoryList } from "../types";

export const getGoogleHistories = async ({
  token,
  pageToken,
  latestHistoryId,
}: {
  token: string;
  pageToken?: string;
  latestHistoryId: string;
}) => {
  const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/history");
  url.searchParams.set("maxResults", "50");
  url.searchParams.set("startHistoryId", latestHistoryId);
  if (pageToken) {
    url.searchParams.set("pageToken", pageToken);
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    if (res.status == 404) {
      return null;
    }
    console.error(await res.json());
    throw new Error("Error querying google thread list");
  }
  return (await res.json()) as HistoryList;
};
