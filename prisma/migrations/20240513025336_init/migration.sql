-- CreateTable
CREATE TABLE `Project` (
    `projectId` VARCHAR(191) NOT NULL,
    `projectName` VARCHAR(191) NOT NULL,
    `projectDescription` VARCHAR(191) NOT NULL,
    `projectLiveLink` VARCHAR(191) NOT NULL,
    `frontendCodeLink` VARCHAR(191) NOT NULL,
    `backendCodeLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_projectId_key`(`projectId`),
    PRIMARY KEY (`projectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Technology` (
    `technologyId` VARCHAR(191) NOT NULL,
    `technologyName` VARCHAR(191) NOT NULL,
    `technologyDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Technology_technologyId_key`(`technologyId`),
    PRIMARY KEY (`technologyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `messageId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `senderEmail` VARCHAR(191) NOT NULL,
    `senderContactNumber` INTEGER NOT NULL,
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Message_messageId_key`(`messageId`),
    PRIMARY KEY (`messageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `adminId` VARCHAR(191) NOT NULL,
    `adminEmail` VARCHAR(191) NOT NULL,
    `adminPassword` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_adminId_key`(`adminId`),
    PRIMARY KEY (`adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `blogId` VARCHAR(191) NOT NULL,
    `blogTitle` VARCHAR(191) NOT NULL,
    `blogContent` VARCHAR(191) NOT NULL,
    `blogImage` VARCHAR(191) NOT NULL,
    `blogCategory` VARCHAR(191) NOT NULL,
    `blogCreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `blogUpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Blog_blogId_key`(`blogId`),
    PRIMARY KEY (`blogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `commentId` VARCHAR(191) NOT NULL,
    `commentContent` VARCHAR(191) NOT NULL,
    `commentAuthor` VARCHAR(191) NOT NULL,
    `commentCreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `blogId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Comment_commentId_key`(`commentId`),
    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BlogTag` (
    `blogTagId` VARCHAR(191) NOT NULL,
    `blogTagName` VARCHAR(191) NOT NULL,
    `blogTagDescription` VARCHAR(191) NOT NULL,
    `blogTagCreatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `blogTagUpdatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BlogTag_blogTagId_key`(`blogTagId`),
    PRIMARY KEY (`blogTagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToTechnology` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ProjectToTechnology_AB_unique`(`A`, `B`),
    INDEX `_ProjectToTechnology_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BlogToBlogTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_BlogToBlogTag_AB_unique`(`A`, `B`),
    INDEX `_BlogToBlogTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`blogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTechnology` ADD CONSTRAINT `_ProjectToTechnology_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`projectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToTechnology` ADD CONSTRAINT `_ProjectToTechnology_B_fkey` FOREIGN KEY (`B`) REFERENCES `Technology`(`technologyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Blog`(`blogId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BlogToBlogTag` ADD CONSTRAINT `_BlogToBlogTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `BlogTag`(`blogTagId`) ON DELETE CASCADE ON UPDATE CASCADE;
