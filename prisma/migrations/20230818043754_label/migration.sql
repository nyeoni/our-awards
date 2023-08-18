/*
  Warnings:

  - Added the required column `label` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "label" TEXT NOT NULL;
