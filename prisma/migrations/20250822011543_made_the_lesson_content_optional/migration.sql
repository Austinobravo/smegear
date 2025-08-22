-- AlterTable
ALTER TABLE "Lesson" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "content" SET DEFAULT 'New Lesson';
