/*
  Warnings:

  - Added the required column `partId` to the `MessagePart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MessagePart" ADD COLUMN     "partId" INTEGER NOT NULL;
