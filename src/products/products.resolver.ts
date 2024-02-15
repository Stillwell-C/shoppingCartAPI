import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './models/Product.model';
import { ProductsService } from './products.service';
import { GetProductsArgs } from './dto/getProducts.args';
import { CreateProductArgs } from './dto/createProduct.args';
import { ProductArgs } from './dto/product.args';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => Product)
  product(@Args() args: ProductArgs) {
    const product = this.productsService.findProduct(
      args?.searchName,
      args?.SKU,
    );
    return product;
  }

  @Query(() => [Product])
  async products(
    @Args()
    args: GetProductsArgs,
  ) {
    const products = await this.productsService.findProducts(args?.dept);
    const sortedProducts = products.sort((a, b) => a.SKU - b.SKU);
    return sortedProducts;
  }

  @Mutation((returns) => Product)
  createProduct(@Args() createProductDto: CreateProductArgs) {
    return this.productsService.createProduct(createProductDto);
  }
}
