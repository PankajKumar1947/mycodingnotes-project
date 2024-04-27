-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_bookmark_id_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "bookmark_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_bookmark_id_fkey" FOREIGN KEY ("bookmark_id") REFERENCES "Bookmark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
