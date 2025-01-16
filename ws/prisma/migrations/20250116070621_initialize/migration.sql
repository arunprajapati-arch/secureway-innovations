-- CreateTable
CREATE TABLE "Student" (
    "rollNo" TEXT NOT NULL,
    "rfId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("rollNo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_rollNo_key" ON "Student"("rollNo");

-- CreateIndex
CREATE UNIQUE INDEX "Student_rfId_key" ON "Student"("rfId");
