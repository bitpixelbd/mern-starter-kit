-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author_name" TEXT,
    "category" VARCHAR(200),
    "short_desc" VARCHAR(200),
    "description" VARCHAR(200),
    "content" VARCHAR(200),
    "author_image" VARCHAR(200),
    "blog_image" VARCHAR(200),

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
