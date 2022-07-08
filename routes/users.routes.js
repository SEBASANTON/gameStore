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
const {
  createUserValidators,
} = require('../middlewares/validatiors.middleware');
const { userExists } = require('../middlewares/users.middleware');
const {
  protectSesssion,
  protectUser,
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/signup').post(createUserValidators, createUser);

router.post('/login', login);

router.use(protectSesssion);

router.route('/').get(getAllUsers);

router
  .use('/:id', userExists)
  .route('/:id')
  .patch(protectUser, updateUser)
  .delete(protectUser, deleteUser);

module.exports = { usersRouter: router };
