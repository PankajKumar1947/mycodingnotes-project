-- AlterTable
CREATE SEQUENCE markdown_id_seq;
ALTER TABLE "Markdown" ALTER COLUMN "id" SET DEFAULT nextval('markdown_id_seq');
ALTER SEQUENCE markdown_id_seq OWNED BY "Markdown"."id";
