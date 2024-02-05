import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Product } from './models/Product.model';
import { mockProductData } from 'src/__mocks__/productData';
import { ProductsService } from './products.service';
import { AllowedDepartments } from './models/AllowedDepartments';
import { GetProductsByDeptArgs } from './dto/getProductsByDept.args';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  getProducts() {
    return mockProductData;
  }

  @Query((returns) => [Product], { nullable: true })
  getProductsByDept(
    @Args()
    args: GetProductsByDeptArgs,
  ) {
    console.log(args);
    if (!args?.dept) return mockProductData;

    const product = this.productsService.findByDept(args?.dept);
    return product;
  }

  @Query((returns) => Product, { nullable: true })
  getProductBySearchName(@Args('searchName') searchName: string) {
    const product = this.productsService.findBySearchName(searchName);
    return product;
  }

  @Query((returns) => Product, { nullable: true })
  getProductBySKU(@Args('SKU', { type: () => Int }) SKU: number) {
    const product = this.productsService.findBySKU(SKU);
    return product;
  }
}
