/*
  Warnings:

  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `references` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "inReplyTo" TEXT,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "references" TEXT NOT NULL;
