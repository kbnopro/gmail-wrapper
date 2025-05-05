SELECT
  DISTINCT ON ("threadId") id,
  "internalDate",
  subject,
  snippet,
  "threadId",
  "ownerId",
  receiver,
  sender,
  content
FROM
  "Message"
ORDER BY
  "threadId",
  "internalDate";