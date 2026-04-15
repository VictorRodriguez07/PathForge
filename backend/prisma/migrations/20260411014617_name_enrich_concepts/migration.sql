-- AlterTable
ALTER TABLE "concepts" ADD COLUMN     "codeExample" TEXT,
ADD COLUMN     "commonMistakes" TEXT[],
ADD COLUMN     "description" TEXT,
ADD COLUMN     "explanation" TEXT,
ADD COLUMN     "practicalTips" TEXT[],
ADD COLUMN     "resources" JSONB,
ADD COLUMN     "whyMatters" TEXT;
