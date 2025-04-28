/*
  Warnings:

  - You are about to drop the column `isFullSync` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isFullSync",
ADD COLUMN     "firstSynced" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFullSyncing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPartialSyncing" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nextPageToken" TEXT;
