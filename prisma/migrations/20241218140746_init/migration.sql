-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Accept', 'Reject', 'Pending');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageBox" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MessageBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatBox" (
    "id" SERIAL NOT NULL,
    "UserId1" TEXT NOT NULL,
    "UserId2" TEXT NOT NULL,

    CONSTRAINT "ChatBox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "chatBoxId" INTEGER NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Friendship" (
    "id" SERIAL NOT NULL,
    "userId1" TEXT NOT NULL,
    "userId2" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MessageBox_userId_key" ON "MessageBox"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBox_UserId1_key" ON "ChatBox"("UserId1");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBox_UserId2_key" ON "ChatBox"("UserId2");

-- AddForeignKey
ALTER TABLE "MessageBox" ADD CONSTRAINT "MessageBox_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBox" ADD CONSTRAINT "ChatBox_UserId1_fkey" FOREIGN KEY ("UserId1") REFERENCES "MessageBox"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBox" ADD CONSTRAINT "ChatBox_UserId2_fkey" FOREIGN KEY ("UserId2") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chatBoxId_fkey" FOREIGN KEY ("chatBoxId") REFERENCES "ChatBox"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
