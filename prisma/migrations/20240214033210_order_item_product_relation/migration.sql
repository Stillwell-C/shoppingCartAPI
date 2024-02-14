-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_searchName_fkey" FOREIGN KEY ("searchName") REFERENCES "Product"("searchName") ON DELETE RESTRICT ON UPDATE CASCADE;
