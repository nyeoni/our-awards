/*
  Warnings:

  - You are about to drop the column `image` on the `Award` table. All the data in the column will be lost.
  - Added the required column `content` to the `Award` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" DROP COLUMN "image",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "host" TEXT NOT NULL;
