import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $phonenumber: String!
    $address: String!
    $zipcode: String!
    $picture: Upload!
    $document: Upload!
  ) {
    createUser(
      name: $name
      email: $email
      phonenumber: $phonenumber
      address: $address
      zipcode: $zipcode
      picture: $picture
      document: $document
    ) {
      id
    }
  }
`;

export const GET_USERS = gql`
  query users {
    users {
      id
      name
      email
      phonenumber
      address
      zipcode
      picture
      document
    }
  }
`;
