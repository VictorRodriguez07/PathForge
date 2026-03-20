/*
  Warnings:

  - A unique constraint covering the columns `[challengeId,orderIndex]` on the table `test_cases` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "test_cases_challengeId_orderIndex_key" ON "test_cases"("challengeId", "orderIndex");
