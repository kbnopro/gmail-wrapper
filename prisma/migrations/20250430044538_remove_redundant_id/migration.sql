/*
  Warnings:

  - The primary key for the `MessagePart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MessagePart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MessagePart" DROP CONSTRAINT "MessagePart_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "MessagePart_pkey" PRIMARY KEY ("messageId", "partId");
