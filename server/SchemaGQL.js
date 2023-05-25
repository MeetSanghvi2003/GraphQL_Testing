import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    quotes: [Quote]
    quote(by: ID): [Quote]
    myprofile: User
  }
  type User {
    _id: ID
    firstname: String
    lastname: String
    email: String
    quotes: [Quote]
  }
  type Quote {
    name: String
    by: ID
  }

  type Token {
    token: String!
  }
  type Mutation {
    signupUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): User

    signinUser(email: String!, password: String!): Token
    createQuote(name: String!): String
  }
`;

export default typeDefs;
