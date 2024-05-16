/*
  Warnings:

  - Added the required column `projectImageLink` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectMockupImageLink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `projectImageLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `projectMockupImageLink` VARCHAR(191) NOT NULL;
