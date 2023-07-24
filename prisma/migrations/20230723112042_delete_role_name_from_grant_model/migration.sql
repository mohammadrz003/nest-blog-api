/*
  Warnings:

  - You are about to drop the column `role` on the `Grant` table. All the data in the column will be lost.
  - Added the required column `action` to the `Grant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `attributes` to the `Grant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource` to the `Grant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Grant_role_key` ON `Grant`;

-- AlterTable
ALTER TABLE `Grant` DROP COLUMN `role`,
    ADD COLUMN `action` VARCHAR(191) NOT NULL,
    ADD COLUMN `attributes` VARCHAR(191) NOT NULL,
    ADD COLUMN `resource` VARCHAR(191) NOT NULL;
