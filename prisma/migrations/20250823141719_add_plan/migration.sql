-- CreateEnum
CREATE TYPE "public"."SubscriptionPlan" AS ENUM ('FREE', 'PRO');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "subscription_plan" "public"."SubscriptionPlan" NOT NULL DEFAULT 'FREE';
