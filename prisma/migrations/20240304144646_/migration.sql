/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `setId` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `subtitle` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `type` ENUM('Base', 'Event', 'Leader', 'Token', 'Unit', 'Upgrade') NULL,
    `cost` INTEGER NULL,
    `power` INTEGER NULL,
    `hp` INTEGER NULL,
    `frontText` VARCHAR(191) NULL,
    `frontArt` VARCHAR(191) NULL,
    `doubleSided` BOOLEAN NOT NULL,
    `backText` VARCHAR(191) NULL,
    `backArt` VARCHAR(191) NULL,
    `rarity` ENUM('C', 'U', 'R', 'L') NULL,
    `cardType` ENUM('Base', 'Event', 'Leader', 'Token', 'Unit', 'Upgrade') NULL,
    `unique` BOOLEAN NULL,
    `artist` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `set` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aspect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aspectsOnCards` (
    `aspectId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`aspectId`, `cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trait` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `traitsOnCards` (
    `traitId` INTEGER NOT NULL,
    `cardId` INTEGER NOT NULL,

    PRIMARY KEY (`traitId`, `cardId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `keyword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `card` ADD CONSTRAINT `card_setId_fkey` FOREIGN KEY (`setId`) REFERENCES `set`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aspectsOnCards` ADD CONSTRAINT `aspectsOnCards_aspectId_fkey` FOREIGN KEY (`aspectId`) REFERENCES `aspect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aspectsOnCards` ADD CONSTRAINT `aspectsOnCards_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traitsOnCards` ADD CONSTRAINT `traitsOnCards_traitId_fkey` FOREIGN KEY (`traitId`) REFERENCES `trait`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `traitsOnCards` ADD CONSTRAINT `traitsOnCards_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
