/*
  Warnings:

  - Added the required column `userId` to the `Url` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE Url ADD COLUMN userId INTEGER NOT NULL;

-- AlterTable
ALTER TABLE User ADD COLUMN nickname VARCHAR(191) NOT NULL,
    ADD COLUMN role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE Url ADD CONSTRAINT Url_userId_fkey FOREIGN KEY (userId) REFERENCES User(id) ON DELETE RESTRICT ON UPDATE CASCADE;
