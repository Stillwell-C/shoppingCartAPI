/*
  Warnings:

  - You are about to drop the column `crediCardCVC` on the `Order` table. All the data in the column will be lost.
  - Added the required column `creditCardCVC` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sameBillingAddress` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "crediCardCVC",
ADD COLUMN     "creditCardCVC" TEXT NOT NULL,
DROP COLUMN "sameBillingAddress",
ADD COLUMN     "sameBillingAddress" BOOLEAN NOT NULL;
