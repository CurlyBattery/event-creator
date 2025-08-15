/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "refresh_token";

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("refresh_token")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_refresh_token_key" ON "public"."refresh_tokens"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_user_id_key" ON "public"."refresh_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
