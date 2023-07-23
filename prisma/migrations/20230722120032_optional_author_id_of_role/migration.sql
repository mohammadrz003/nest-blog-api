-- DropForeignKey
ALTER TABLE `Role` DROP FOREIGN KEY `Role_userId_fkey`;

-- AlterTable
ALTER TABLE `Role` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
