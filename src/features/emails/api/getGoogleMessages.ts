import type { Message } from "../types";
import { parseMessage } from "../utils/parseMessage";

export const getGoogleMessages = async ({
  token,
  messagesId,
}: {
  token: string;
  messagesId: string[];
}) => {
  const boundary = "batch_boundary";

  const body = messagesId
    .flatMap((id, idx) => {
      const url = new URL(
        `/gmail/v1/users/me/messages/${id}`,
        "https://gmail.googleapis.com/gmail/v1",
      );
      url.searchParams.set("format", "full");
      return [
        `--${boundary}`,
        "Content-Type: application/http",
        `Content_ID: <item${idx + 1}>`,
        "",
        `GET ${url.href}`,
        "",
      ];
    })
    .concat([`--${boundary}--`])
    .join("\r\n");

  const res = await fetch("https://gmail.googleapis.com/batch/gmail/v1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": `multipart/mixed; boundary=${boundary} `,
    },
    body: body,
  });
  const contentType = res.headers.get("content-type");
  if (!contentType) {
    throw new Error(
      "Cannot parse batch response: content-type field not found",
    );
  }
  const responseBoundary = "--" + contentType.split("; ")[1]?.split("=")[1];
  if (!responseBoundary) {
    throw new Error("Cannot get response boundary");
  }

  if (!res.ok) {
    console.error(await res.json());
    throw new Error("Failed to fetch messages");
  }

  const responseBody = await res.text();
  const responses = responseBody.split(responseBoundary);
  return responses
    .map((response) => {
      const firstIndex = response.indexOf("{");
      const lastIndex = response.lastIndexOf("}");
      const textBody = response.slice(firstIndex, lastIndex + 1);
      const processedText = textBody.replaceAll(RegExp("\\s+", "g"), " ");
      if (processedText.length == 0) {
        return;
      }
      const data = JSON.parse(processedText) as Message;
      try {
        parseMessage(data);
      } catch {
        // TODO: Handle parse error (mostly caused by message not found)
        return undefined;
      }
      return data;
    })
    .filter((response) => !!response);
};
