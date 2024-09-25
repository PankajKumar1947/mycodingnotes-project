/*
  Warnings:

  - You are about to drop the column `post_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `Like` table. All the data in the column will be lost.
  - Added the required column `page_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page_id` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "post_id",
ADD COLUMN     "page_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "post_id",
ADD COLUMN     "page_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
