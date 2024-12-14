type LocalizedName = {
    firstName: String
    fatherName: String
    grandfatherName: String
    familyName: String
  }
  
  type Country ={
    id: ID
    name: String
  }
  
  type Nationality ={
    country: Country
    countryId: ID
  }
  
  type NationalId ={
    idNumber: String
    expiryDate: String
  }
  
  type MaritalStatus ={
    id: ID
    name: String
  }
  
  type BasicInfoCard ={
    firstName: String
    fatherName: String
    grandfatherName: String
    familyName: String
    localizedName: LocalizedName
    nationalId: NationalId
    nationalities: [Nationality]
    maritalStatus: MaritalStatus
    dependants: Int
  }