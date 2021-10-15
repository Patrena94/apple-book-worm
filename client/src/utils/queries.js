import gql from 'graphql-tag';

export const QUERY_USER = gql`
  query users($username: String) {
    users(username: $username) {
      _id
      username
      email
      bookCount
      savedBooks
      }
    }
  }
`;