/*
  Warnings:

  - A unique constraint covering the columns `[pathTemplateId,orderIndex]` on the table `path_modules` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "path_modules_pathTemplateId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "path_modules_pathTemplateId_orderIndex_key" ON "path_modules"("pathTemplateId", "orderIndex");
