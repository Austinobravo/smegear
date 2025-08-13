-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'New Course';
