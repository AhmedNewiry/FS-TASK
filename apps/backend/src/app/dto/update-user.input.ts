import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
class LocalizedNameInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  fatherName?: string;

  @Field({ nullable: true })
  grandfatherName?: string;

  @Field({ nullable: true })
  familyName?: string;
}

@InputType()
class NationalIdInput {
  @Field({ nullable: true })
  idNumber?: string;

  @Field(() => Date, { nullable: true })
  expiryDate?: Date;
}

@InputType()
class CountryInput {
  @Field()
  id: string;

  @Field()
  name: string;
}

@InputType()
class NationalityInput {
  @Field(() => CountryInput)
  country: { 
    id: string; 
    name: string; 
  };

  @Field(() => Int)
  countryId: number;
}

@InputType()
class MaritalStatusInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  fatherName?: string;

  @Field({ nullable: true })
  grandfatherName?: string;

  @Field({ nullable: true })
  familyName?: string;

  @Field(() => LocalizedNameInput, { nullable: true })
  localizedName?: LocalizedNameInput;

  @Field(() => NationalIdInput, { nullable: true })
  nationalId?: NationalIdInput;

  @Field(() => [NationalityInput], { nullable: true })
  nationalities?: NationalityInput[];

  @Field(() => MaritalStatusInput, { nullable: true })
  maritalStatus?: MaritalStatusInput;

  @Field(() => Int, { nullable: true })
  dependants?: number;
}
