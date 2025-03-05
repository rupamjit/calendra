/*
  Warnings:

  - You are about to drop the column `timeGap` on the `DayAvalaibility` table. All the data in the column will be lost.
  - Added the required column `timeGap` to the `Avalaibility` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Avalaibility` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Avalaibility" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "timeGap" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "DayAvalaibility" DROP COLUMN "timeGap";
