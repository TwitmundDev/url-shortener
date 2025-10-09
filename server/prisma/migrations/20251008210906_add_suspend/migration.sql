/*
  Warnings:

  - You are about to drop the column `lastPasswordChange` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE User DROP COLUMN `lastPasswordChange`,
    ADD COLUMN `isSuspended` BOOLEAN NOT NULL DEFAULT false;
