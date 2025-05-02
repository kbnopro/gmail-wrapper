/*
  Warnings:

  - You are about to drop the `MessagePart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessagePart" DROP CONSTRAINT "MessagePart_messageId_fkey";

-- DropTable
DROP TABLE "MessagePart";
