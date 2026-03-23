-- CreateTable
CREATE TABLE "concepts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" "Level" NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "concepts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "concept_on_modules" (
    "moduleId" TEXT NOT NULL,
    "conceptId" TEXT NOT NULL,

    CONSTRAINT "concept_on_modules_pkey" PRIMARY KEY ("moduleId","conceptId")
);

-- CreateIndex
CREATE UNIQUE INDEX "concepts_slug_key" ON "concepts"("slug");

-- CreateIndex
CREATE INDEX "concepts_subjectId_idx" ON "concepts"("subjectId");

-- CreateIndex
CREATE INDEX "concepts_level_idx" ON "concepts"("level");

-- AddForeignKey
ALTER TABLE "concepts" ADD CONSTRAINT "concepts_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concept_on_modules" ADD CONSTRAINT "concept_on_modules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "path_modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "concept_on_modules" ADD CONSTRAINT "concept_on_modules_conceptId_fkey" FOREIGN KEY ("conceptId") REFERENCES "concepts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
