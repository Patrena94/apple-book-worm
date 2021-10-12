// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User{
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
}
type Book{
  // bookId: string
  authors:[String]
  description: String
  title: String
  // image: research
  // link: research
}
type Auth{
  token: ID!
  user: User
}
}
  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    // saveBook(book: array, bookID: ID!, image: img!, link, link!): User
    removeBook(bookId: ID!): User
  }
  
`;

// export the typeDefs
module.exports = typeDefs;