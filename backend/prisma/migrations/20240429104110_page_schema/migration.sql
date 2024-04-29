/*
  Warnings:

  - Added the required column `page_title` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "page_title" TEXT NOT NULL;
