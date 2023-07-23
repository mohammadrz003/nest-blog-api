/*
  Warnings:

  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_userId_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
