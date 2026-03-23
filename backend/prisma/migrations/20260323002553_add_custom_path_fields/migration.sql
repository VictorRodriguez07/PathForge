/*
  Warnings:

  - Changed the type of `currentLevel` on the `user_paths` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "user_paths" DROP CONSTRAINT "user_paths_pathTemplateId_fkey";

-- DropIndex
DROP INDEX "user_paths_pathTemplateId_idx";

-- AlterTable
ALTER TABLE "user_paths" ADD COLUMN     "customTitle" TEXT,
ADD COLUMN     "isCustom" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "currentLevel",
ADD COLUMN     "currentLevel" TEXT NOT NULL,
ALTER COLUMN "pathTemplateId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_paths" ADD CONSTRAINT "user_paths_pathTemplateId_fkey" FOREIGN KEY ("pathTemplateId") REFERENCES "path_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;
