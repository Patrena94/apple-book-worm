const router = require('express').Router();
const{createUser, getSingleUser, saveBook, deleteBook, login}=require('../../controllers/user-controller');

//import middleware
const { authMiddleware } = require ('../../utils/auth');

//authMiddleware token to verify user

router.route('/').post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('books/:bookId').delete(authMiddleware, deleteBook);


moudule.exports =router;