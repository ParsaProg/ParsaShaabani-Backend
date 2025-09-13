-- CreateTable
CREATE TABLE "public"."Gallery" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "enCategory" TEXT NOT NULL,
    "faCategory" TEXT NOT NULL,
    "farsiTitle" TEXT NOT NULL,
    "englishTitle" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "faDesc" TEXT NOT NULL,
    "enDesc" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConnectionMessages" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConnectionMessages_pkey" PRIMARY KEY ("id")
);
