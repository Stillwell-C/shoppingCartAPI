-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shippingCompanyName" DROP NOT NULL,
ALTER COLUMN "shippingAddressNumber" DROP NOT NULL,
ALTER COLUMN "billingFirstName" DROP NOT NULL,
ALTER COLUMN "billingLastName" DROP NOT NULL,
ALTER COLUMN "billingCompanyName" DROP NOT NULL,
ALTER COLUMN "billingAddress" DROP NOT NULL,
ALTER COLUMN "billingAddressNumber" DROP NOT NULL,
ALTER COLUMN "billingCity" DROP NOT NULL,
ALTER COLUMN "billingCountry" DROP NOT NULL,
ALTER COLUMN "billingZip" DROP NOT NULL,
ALTER COLUMN "billingPhone" DROP NOT NULL;
