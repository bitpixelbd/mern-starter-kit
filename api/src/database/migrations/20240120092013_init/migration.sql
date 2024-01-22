/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Car";

-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT,
    "wheel" INTEGER,
    "price" DOUBLE PRECISION,
    "is_verified" BOOLEAN NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);
