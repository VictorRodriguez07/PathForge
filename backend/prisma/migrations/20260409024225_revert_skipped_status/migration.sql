/*
  Warnings:

  - The values [SKIPPED] on the enum `StepStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `knownTechSlugs` on the `career_roadmaps` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StepStatus_new" AS ENUM ('LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "career_roadmap_steps" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "career_roadmap_steps" ALTER COLUMN "status" TYPE "StepStatus_new" USING ("status"::text::"StepStatus_new");
ALTER TYPE "StepStatus" RENAME TO "StepStatus_old";
ALTER TYPE "StepStatus_new" RENAME TO "StepStatus";
DROP TYPE "StepStatus_old";
ALTER TABLE "career_roadmap_steps" ALTER COLUMN "status" SET DEFAULT 'LOCKED';
COMMIT;

-- AlterTable
ALTER TABLE "career_roadmaps" DROP COLUMN "knownTechSlugs";
