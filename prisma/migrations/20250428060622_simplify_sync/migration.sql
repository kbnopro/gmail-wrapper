/*
  Warnings:

  - You are about to drop the column `firstSynced` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isFullSyncing` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPartialSyncing` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstSynced",
DROP COLUMN "isFullSyncing",
DROP COLUMN "isPartialSyncing";
