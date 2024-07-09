/*
  Warnings:

  - A unique constraint covering the columns `[refereeEmail]` on the table `referral` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `referral_refereeEmail_key` ON `referral`(`refereeEmail`);
