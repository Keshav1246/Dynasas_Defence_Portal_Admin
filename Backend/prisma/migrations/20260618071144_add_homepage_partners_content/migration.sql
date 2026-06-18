-- AlterTable
ALTER TABLE "HomepageContent" ADD COLUMN     "partnersButtonLink" TEXT,
ADD COLUMN     "partnersButtonText" TEXT,
ADD COLUMN     "partnersSectionDescription" TEXT,
ADD COLUMN     "partnersSectionLabel" TEXT,
ADD COLUMN     "partnersSectionTitle" TEXT;

-- AlterTable
ALTER TABLE "Partner" ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0;
