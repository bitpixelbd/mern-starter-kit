-- CreateTable
CREATE TABLE "test_users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" VARCHAR(200),
    "phone" VARCHAR(200),
    "password" TEXT,

    CONSTRAINT "test_users_pkey" PRIMARY KEY ("id")
);
