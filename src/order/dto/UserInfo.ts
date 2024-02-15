import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

@InputType()
export class UserInfo {
  @Field()
  @IsBoolean()
  sameBillingAddress: boolean;

  @Field()
  @IsString()
  @MaxLength(30)
  shippingFirstName: string;

  @Field()
  @IsString()
  @MaxLength(50)
  shippingLastName: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(100)
  @ValidateIf((object) => object.hasOwnProperty('shippingCompanyName'))
  shippingCompanyName: string;

  @Field()
  @IsString()
  @MaxLength(100)
  shippingAddress: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(20)
  @ValidateIf((object) => object.hasOwnProperty('shippingAddressNumber'))
  shippingAddressNumber: string;

  @Field()
  @IsString()
  @MaxLength(50)
  shippingCity: string;

  @Field()
  @IsString()
  @MaxLength(50)
  shippingCountry: string;

  @Field()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  shippingZip: string;

  @Field()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  shippingPhone: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(30)
  @ValidateIf((object) => object.hasOwnProperty('billingFirstName'))
  billingFirstName: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(50)
  @ValidateIf((object) => object.hasOwnProperty('billingLastName'))
  billingLastName: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(100)
  @ValidateIf((object) => object.hasOwnProperty('billingCompanyName'))
  billingCompanyName: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(100)
  @ValidateIf((object) => object.hasOwnProperty('billingAddress'))
  billingAddress: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(20)
  @ValidateIf((object) => object.hasOwnProperty('billingAddressNumber'))
  billingAddressNumber: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(50)
  @ValidateIf((object) => object.hasOwnProperty('billingCity'))
  billingCity: string;

  @Field({ nullable: true })
  @IsString()
  @MaxLength(50)
  @ValidateIf((object) => object.hasOwnProperty('billingCountry'))
  billingCountry: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  @ValidateIf((object) => object.hasOwnProperty('billingZip'))
  billingZip: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  @ValidateIf((object) => object.hasOwnProperty('billingPhone'))
  billingPhone: string;

  @Field()
  @IsString()
  @MinLength(16)
  @MaxLength(16)
  creditCardNumber: string;

  @Field()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  creditCardExpiry: string;

  @Field()
  @IsString()
  @MinLength(3)
  @MaxLength(4)
  creditCardCVC: string;
}
