-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "public"."user_verifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_verifications_user_id_key" ON "public"."user_verifications"("user_id");

-- AddForeignKey
ALTER TABLE "public"."user_verifications" ADD CONSTRAINT "user_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
