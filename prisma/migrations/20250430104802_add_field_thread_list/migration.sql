DROP VIEW "ThreadList";

CREATE VIEW "ThreadList" AS SELECT
  DISTINCT ON ("threadId") id,
  "internalDate",
  subject,
  snippet,
  "threadId",
  "ownerId",
  receiver,
  sender
FROM
  "Message"
ORDER BY
  "threadId",
  "internalDate";
