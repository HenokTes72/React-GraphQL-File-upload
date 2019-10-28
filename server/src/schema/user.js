import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phonenumber: String!
    address: String!
    zipcode: String!
    picture: String!
    document: String!
  }

  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phonenumber: String!
      address: String!
      zipcode: String!
      picture: Upload!
      document: Upload!
    ): User!
  }
`;

export default userSchema;
