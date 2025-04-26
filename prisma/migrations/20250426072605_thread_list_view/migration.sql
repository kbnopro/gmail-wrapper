CREATE OR REPLACE VIEW "ThreadList" AS SELECT
  "threadId",
  "internalDate",
  subject,
  snippet,
  "ownerId",
  id
FROM
  (
    SELECT
      DISTINCT ON ("Message"."threadId") "Message"."threadId",
      "Message"."internalDate",
      "Message".subject,
      "Message".snippet,
      "Message"."ownerId",
      "Message".id
    FROM
      "Message"
    ORDER BY
      "Message"."threadId",
      "Message"."internalDate"
  ) unnamed_subquery
ORDER BY
  "internalDate" DESC;
