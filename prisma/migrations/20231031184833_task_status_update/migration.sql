-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'open';
