/*
  Warnings:

  - You are about to drop the column `inReplyTo` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "inReplyTo",
ADD COLUMN     "replyTo" TEXT;

DROP VIEW "ThreadList";

CREATE VIEW "ThreadList" AS SELECT
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
