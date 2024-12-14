import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LocalizedName {
  @Field()
  firstName: string;

  @Field()
  fatherName: string;

  @Field()
  grandfatherName: string;

  @Field()
  familyName: string;
}

@ObjectType()
export class NationalId {
  @Field()
  idNumber: string;

  @Field()
  expiryDate: string;
}

@ObjectType()
export class Country {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Nationality {
  @Field(() => Int)
  countryId: number;

  @Field(() => Country)
  country: Country;
}

@ObjectType()
export class MaritalStatus {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  fatherName: string;

  @Field()
  grandfatherName: string;

  @Field()
  familyName: string;

  @Field(() => LocalizedName)
  localizedName: LocalizedName;

  @Field(() => NationalId)
  nationalId: NationalId;

  @Field(() => [Nationality])
  nationalities: Nationality[];

  @Field(() => MaritalStatus)
  maritalStatus: MaritalStatus;

  @Field(() => Int)
  dependants: number;
}
