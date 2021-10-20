const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async(parent, args, context) => {
        if(context.user){
          const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          // .populate('savedBooks');

          return userData;
        }

        throw new AuthenticationError('Not logged in');
      }
    },
   Mutation: {
     addUser: async (parent, args) =>{
       const user = await User.create(args);
       const token = signToken(user);
       
       return {token, user};
     },
     login: async (parent, {email, password}) =>{
       const user = await User.findOne({ email });
       if(!user) {
        throw new AuthenticationError('Incorrect credentials');
       }

       const correctPwd = await user.isCorrectPassword(password);
       if (!correctPwd){
        throw new AuthenticationError('Incorrect credentials');
       }
       const token = signToken(user);
       return { token, user };

     },

     saveBook: async (parent, { bookData }, context) => {
       console.log(context.user)
       if(context.user) {
         const updateUser = await User.findOneAndUpdate({
           _id: context.user._id},
           {$addToSet: {savedBooks: bookData}},
           {new: true},
         );
         return updateUser;
       }
       throw new AuthenticationError('login to add Book to collection'); 
     },
     removeBook: async(parent, { bookId }, context) =>{
       if(context.user) {
         const updateUser = await User.findOneAndUpdate({
           _id: context.user._id },
           {$pull: {savedBooks: {bookId: bookId}}},
           {new: true},
         );
         return updateUser;
       }
       throw new AuthenticationError('login in to remove book from collection!');
     }
   } 
  };
  
  module.exports = resolvers;