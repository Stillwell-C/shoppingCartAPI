import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { OrderStatus } from '@prisma/client';
import { FindOrderOrderItem } from './FindOrderOrderItem';

@ObjectType()
export class FindOrderReturnData {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  orderStatus: OrderStatus;

  @Field(() => Float)
  orderTotal: number;

  @Field(() => [FindOrderOrderItem])
  orderItems: FindOrderOrderItem[];

  @Field()
  sameBillingAddress: boolean;

  @Field()
  shippingFirstName: string;

  @Field()
  shippingLastName: string;

  @Field({ nullable: true })
  shippingCompanyName: string;

  @Field()
  shippingAddress: string;

  @Field({ nullable: true })
  shippingAddressNumber: string;

  @Field()
  shippingCity: string;

  @Field()
  shippingCountry: string;

  @Field()
  shippingZip: string;

  @Field()
  shippingPhone: string;

  @Field({ nullable: true })
  billingFirstName: string;

  @Field({ nullable: true })
  billingLastName: string;

  @Field({ nullable: true })
  billingCompanyName: string;

  @Field({ nullable: true })
  billingAddress: string;

  @Field({ nullable: true })
  billingAddressNumber: string;

  @Field({ nullable: true })
  billingCity: string;

  @Field({ nullable: true })
  billingCountry: string;

  @Field({ nullable: true })
  billingZip: string;

  @Field({ nullable: true })
  billingPhone: string;

  @Field()
  creditCardNumber: string;

  @Field()
  creditCardExpiry: string;

  @Field()
  creditCardCVC: string;
}
