-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
