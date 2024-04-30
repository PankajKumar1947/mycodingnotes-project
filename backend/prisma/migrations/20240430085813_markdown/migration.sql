/*
  Warnings:

  - Added the required column `content` to the `Markdown` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Markdown" ADD COLUMN     "content" TEXT NOT NULL;
