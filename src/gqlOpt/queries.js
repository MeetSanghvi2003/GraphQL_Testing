import { gql } from "@apollo/client";
export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quotes {
      name
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfile {
    user: myprofile {
      firstname
      lastname
      email
      quotes {
        name
      }
    }
  }
`;
