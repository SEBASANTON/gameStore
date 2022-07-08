const express = require('express');

//Controllers
const {
  getAllGame,
  createGame,
  updateGame,
  deleteGame,
  createReview,
} = require('../controllers/games.controller');

//Middlewares
const { gameExist } = require('../middlewares/games.middleware');
const {
  createGameValidators,
  updateGameValidators,
} = require('../middlewares/validatiors.middleware');
const { protectSesssion } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/').get(getAllGame);

router.use(protectSesssion);

router.post('/', createGameValidators, createGame);

router
  .route('/:id')
  .patch(updateGameValidators, gameExist, updateGame)
  .delete(gameExist, deleteGame);

router.route('/reviews/:gameId').post(createReview);

module.exports = { gamesRouter: router };
