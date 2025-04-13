/*
  Warnings:

  - Made the column `study_course` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "study_course" SET NOT NULL;
