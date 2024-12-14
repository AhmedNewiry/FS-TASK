import { DocumentNode, gql } from "@apollo/client";

export const GET_USER_NAME_QUERY:DocumentNode = gql`
   query User($userId: Float!) {
    user(id: $userId) {
      firstName
      fatherName
      grandfatherName
      familyName
    
    }
  }
`;
