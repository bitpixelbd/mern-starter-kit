/*
  Warnings:

  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_user_id_fkey";

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "user_id",
ADD COLUMN     "owner_id" INTEGER;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
