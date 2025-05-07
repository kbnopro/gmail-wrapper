SELECT
  DISTINCT ON ("threadId") id,
  "internalDate",
  subject,
  snippet,
  "threadId",
  "ownerId",
  receiver,
  sender,
  content,
  "messageId",
  "references",
  "replyTo"
FROM
  "Message"
ORDER BY
  "threadId",
  "internalDate";