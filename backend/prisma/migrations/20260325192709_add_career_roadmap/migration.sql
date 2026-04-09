-- CreateEnum
CREATE TYPE "RoadmapStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "StepStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "career_roadmaps" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "careerSlug" TEXT NOT NULL,
    "careerTitle" TEXT NOT NULL,
    "status" "RoadmapStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "careerRecommendationId" TEXT NOT NULL,

    CONSTRAINT "career_roadmaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "career_roadmap_steps" (
    "id" TEXT NOT NULL,
    "techSlug" TEXT NOT NULL,
    "techLabel" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "status" "StepStatus" NOT NULL DEFAULT 'LOCKED',
    "roadmapId" TEXT NOT NULL,
    "pathTemplateId" TEXT,
    "userPathId" TEXT,

    CONSTRAINT "career_roadmap_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "career_roadmaps_userId_idx" ON "career_roadmaps"("userId");

-- CreateIndex
CREATE INDEX "career_roadmaps_careerRecommendationId_idx" ON "career_roadmaps"("careerRecommendationId");

-- CreateIndex
CREATE INDEX "career_roadmap_steps_roadmapId_idx" ON "career_roadmap_steps"("roadmapId");

-- CreateIndex
CREATE INDEX "career_roadmap_steps_userPathId_idx" ON "career_roadmap_steps"("userPathId");

-- CreateIndex
CREATE UNIQUE INDEX "career_roadmap_steps_roadmapId_order_key" ON "career_roadmap_steps"("roadmapId", "order");

-- AddForeignKey
ALTER TABLE "career_roadmaps" ADD CONSTRAINT "career_roadmaps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_roadmaps" ADD CONSTRAINT "career_roadmaps_careerRecommendationId_fkey" FOREIGN KEY ("careerRecommendationId") REFERENCES "career_recommendations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_roadmap_steps" ADD CONSTRAINT "career_roadmap_steps_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "career_roadmaps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_roadmap_steps" ADD CONSTRAINT "career_roadmap_steps_pathTemplateId_fkey" FOREIGN KEY ("pathTemplateId") REFERENCES "path_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_roadmap_steps" ADD CONSTRAINT "career_roadmap_steps_userPathId_fkey" FOREIGN KEY ("userPathId") REFERENCES "user_paths"("id") ON DELETE SET NULL ON UPDATE CASCADE;
