/*
  Warnings:

  - You are about to drop the column `name` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the `Grant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[role]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Grant` DROP FOREIGN KEY `Grant_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `Grant` DROP FOREIGN KEY `Grant_userId_fkey`;

-- DropIndex
DROP INDEX `Role_name_key` ON `Role`;

-- AlterTable
ALTER TABLE `Role` DROP COLUMN `name`,
    ADD COLUMN `role` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Grant`;

-- CreateIndex
CREATE UNIQUE INDEX `Role_role_key` ON `Role`(`role`);
