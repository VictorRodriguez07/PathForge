/*
  Warnings:

  - A unique constraint covering the columns `[cognitoId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cognitoId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "cognitoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cognitoId_key" ON "users"("cognitoId");

-- CreateIndex
CREATE INDEX "users_cognitoId_idx" ON "users"("cognitoId");
