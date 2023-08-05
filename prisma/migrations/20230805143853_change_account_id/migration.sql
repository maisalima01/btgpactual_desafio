/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[account_number]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_number]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_number` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- DropIndex
DROP INDEX "accounts_id_key";

-- DropIndex
DROP INDEX "transactions_account_id_key";

-- AlterTable
CREATE SEQUENCE accounts_account_number_seq;
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
DROP COLUMN "id",
ALTER COLUMN "account_number" SET DEFAULT nextval('accounts_account_number_seq'),
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("account_number");
ALTER SEQUENCE accounts_account_number_seq OWNED BY "accounts"."account_number";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id",
ADD COLUMN     "account_number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_account_number_key" ON "accounts"("account_number");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_account_number_key" ON "transactions"("account_number");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_number_fkey" FOREIGN KEY ("account_number") REFERENCES "accounts"("account_number") ON DELETE RESTRICT ON UPDATE CASCADE;
