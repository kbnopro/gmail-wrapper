/*
  Warnings:

  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN "content" TEXT NOT NULL;

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
  content
FROM
  "Message"
ORDER BY
  "threadId",
  "internalDate";
