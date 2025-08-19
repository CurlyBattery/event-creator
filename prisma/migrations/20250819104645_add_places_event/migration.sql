/*
  Warnings:

  - Added the required column `places` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "is_publish" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "places" INTEGER NOT NULL;
