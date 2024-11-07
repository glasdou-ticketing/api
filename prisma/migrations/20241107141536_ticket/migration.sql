/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_created_by_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_deleted_by_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_updated_by_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "deleted_by_id" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" "Role"[],
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "deleted_by_id" TEXT,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "issue_number" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "ticket_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_priority" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "ticket_priority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_comment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" TEXT NOT NULL,
    "updated_by_id" TEXT,
    "deleted_by_id" TEXT,
    "ticket_id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "ticket_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "ticket_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "created_by_id" TEXT NOT NULL,
    "deleted_by_id" TEXT,
    "message" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "log_type_id" INTEGER NOT NULL,

    CONSTRAINT "ticket_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_log_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "ticket_log_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ticket_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "ticket_priority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "ticket_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_comment" ADD CONSTRAINT "ticket_comment_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_log" ADD CONSTRAINT "ticket_log_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "ticket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_log" ADD CONSTRAINT "ticket_log_log_type_id_fkey" FOREIGN KEY ("log_type_id") REFERENCES "ticket_log_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_log" ADD CONSTRAINT "ticket_log_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_log" ADD CONSTRAINT "ticket_log_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
