const express = require('express');

//Controllers
const {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

//Middlewares
const { userExists } = require('../middlewares/users.middleware');
const {
  createUserValidators,
  updateUserValidators
} = require('../middlewares/validatiors.middleware');

const router = express.Router();

router.route('/').get(getAllUsers);

router.route('/signup').post(createUserValidators, createUser);

router.route('/login').post()

router
  .route('/:id')
  .patch( updateUserValidators, userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
