-- CreateTable
CREATE TABLE "career_recommendations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recommendations" JSONB NOT NULL,
    "userProfile" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "career_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "career_recommendations_userId_idx" ON "career_recommendations"("userId");

-- AddForeignKey
ALTER TABLE "career_recommendations" ADD CONSTRAINT "career_recommendations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
