import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class OrderItem {
  @Field()
  @IsString()
  @IsNotEmpty()
  searchName: string;

  @Field((type) => Int)
  @IsNumber()
  @Min(0)
  qty: number;

  @Field((type) => Float)
  @IsNumber()
  @Min(0)
  price: number;
}
