import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInfo {
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
