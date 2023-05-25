import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation SignupUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    signupUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      firstname
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation SigninUser($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token {
        auth
        _id
      }
    }
  }
`;

export const Add_Quote = gql`
  mutation createQuote($name: String!) {
    createQuote(name: $name)
  }
`;
