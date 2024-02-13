import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './models/Product.model';
import { mockProductData } from 'src/__mocks__/productData';
import { ProductsService } from './products.service';
import { AllowedDepartments } from './models/AllowedDepartments';
import { GetProductsByDeptArgs } from './dto/getProductsByDept.args';
import { Prisma } from '@prisma/client';
import { CreateProductArgs } from './dto/createProduct.args';

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

  @Mutation((returns) => Product)
  createProduct(@Args() createProductDto: CreateProductArgs) {
    return this.productsService.createProduct(createProductDto);
  }
}
