/*
  Warnings:

  - You are about to drop the column `client_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[customer_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_client_id_fkey";

-- DropIndex
DROP INDEX "accounts_client_id_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "client_id",
ADD COLUMN     "customer_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "document_number" INTEGER NOT NULL,
    "issuer" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "cel_phone" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "income" DOUBLE PRECISION NOT NULL,
    "civil_status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_id_key" ON "customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_document_number_key" ON "customers"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_customer_id_key" ON "accounts"("customer_id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
