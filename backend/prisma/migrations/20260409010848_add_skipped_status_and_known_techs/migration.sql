-- AlterEnum
ALTER TYPE "StepStatus" ADD VALUE 'SKIPPED';

-- AlterTable
ALTER TABLE "career_roadmaps" ADD COLUMN     "knownTechSlugs" TEXT[];
