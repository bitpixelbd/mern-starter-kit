/*
  Warnings:

  - You are about to drop the column `IsCanceled` on the `Participants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participants" DROP COLUMN "IsCanceled",
ADD COLUMN     "isCanceled" BOOLEAN NOT NULL DEFAULT false;
