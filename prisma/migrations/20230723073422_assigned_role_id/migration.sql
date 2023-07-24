/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - Added the required column `assignedRoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `ownerId`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `roleId`,
    ADD COLUMN `assignedRoleId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_assignedRoleId_fkey` FOREIGN KEY (`assignedRoleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
