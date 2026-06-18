/*
  Warnings:

  - You are about to drop the column `address` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `mission` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `vision` on the `CompanyProfile` table. All the data in the column will be lost.
  - You are about to drop the column `assignedAdminId` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `UserInvitation` table. All the data in the column will be lost.
  - You are about to drop the `RolePermissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Inquiry" DROP CONSTRAINT "Inquiry_assignedAdminId_fkey";

-- AlterTable
ALTER TABLE "CompanyProfile" DROP COLUMN "address",
DROP COLUMN "contactEmail",
DROP COLUMN "mission",
DROP COLUMN "phone",
DROP COLUMN "vision";

-- AlterTable
ALTER TABLE "FooterContent" ADD COLUMN     "companyLinks" TEXT[],
ADD COLUMN     "footerDescription" TEXT,
ADD COLUMN     "footerTagline" TEXT,
ADD COLUMN     "legalLinks" TEXT[],
ADD COLUMN     "resourceLinks" TEXT[],
ADD COLUMN     "solutionLinks" TEXT[];

-- AlterTable
ALTER TABLE "HomepageContent" ADD COLUMN     "heroDescription" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "secondaryCtaLink" TEXT,
ADD COLUMN     "secondaryCtaText" TEXT,
ADD COLUMN     "sectionOrder" TEXT[] DEFAULT ARRAY['hero', 'services', 'statistics']::TEXT[],
ADD COLUMN     "servicesSectionDescription" TEXT,
ADD COLUMN     "servicesSectionTitle" TEXT,
ADD COLUMN     "statisticsSectionTitle" TEXT;

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "assignedAdminId",
ADD COLUMN     "assignedTeam" TEXT,
ADD COLUMN     "emailError" TEXT,
ADD COLUMN     "emailSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailStatus" TEXT DEFAULT 'PENDING',
ADD COLUMN     "internalNote" TEXT,
ADD COLUMN     "sentAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "UserInvitation" DROP COLUMN "role";

-- DropTable
DROP TABLE "RolePermissions";

-- DropEnum
DROP TYPE "AdminRole";

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "primaryColor" TEXT,
    "accentColor" TEXT,
    "backgroundDark" TEXT,
    "textColor" TEXT,
    "primaryLogo" TEXT,
    "darkLogo" TEXT,
    "favicon" TEXT,
    "headingFont" TEXT,
    "bodyFont" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "youtubeUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "portalName" TEXT,
    "siteName" TEXT,
    "siteDescription" TEXT,
    "supportEmail" TEXT,
    "supportPhone" TEXT,
    "defaultLanguage" TEXT DEFAULT 'English',
    "timezone" TEXT DEFAULT 'Asia/Kolkata',
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
