import { DocumentNode, gql } from "@apollo/client";

export const USER_BASIC_INFO_QUERY:DocumentNode = gql`
  query User($userId: Float!) {
    user(id: $userId) {
      firstName
      fatherName
      grandfatherName
      familyName
      localizedName {
        firstName
        fatherName
        grandfatherName
        familyName
      }
      nationalId {
        idNumber
        expiryDate
      }
      nationalities {
        country {
          id
          name
        }
      }
      maritalStatus {
        id
        name
      }
      dependants
    }
  }
`;
