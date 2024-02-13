-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'INPROCESS', 'SHIPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Departments" AS ENUM ('CLOTHING', 'ACCESSORIES', 'INTERIOR');

-- CreateEnum
CREATE TYPE "StockLevels" AS ENUM ('OUT', 'LOW', 'STOCKED');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "SKU" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "searchName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "dept" "Departments" NOT NULL,
    "description" TEXT NOT NULL,
    "img_id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "stock_level" "StockLevels" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "sameBillingAddress" TEXT NOT NULL,
    "shippingFirstName" TEXT NOT NULL,
    "shippingLastName" TEXT NOT NULL,
    "shippingCompanyName" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "shippingAddressNumber" TEXT NOT NULL,
    "shippingCity" TEXT NOT NULL,
    "shippingCountry" TEXT NOT NULL,
    "shippingZip" TEXT NOT NULL,
    "shippingPhone" TEXT NOT NULL,
    "billingFirstName" TEXT NOT NULL,
    "billingLastName" TEXT NOT NULL,
    "billingCompanyName" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "billingAddressNumber" TEXT NOT NULL,
    "billingCity" TEXT NOT NULL,
    "billingCountry" TEXT NOT NULL,
    "billingZip" TEXT NOT NULL,
    "billingPhone" TEXT NOT NULL,
    "creditCardNumber" TEXT NOT NULL,
    "creditCardExpiry" TEXT NOT NULL,
    "crediCardCVC" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" TEXT NOT NULL,
    "searchName" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartProduct" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "CartProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_searchName_key" ON "Product"("searchName");

-- CreateIndex
CREATE INDEX "Product_searchName_idx" ON "Product"("searchName");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
