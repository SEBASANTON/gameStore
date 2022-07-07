//Models
const { Game } = require('../models/game.model');
const { Review } = require('../models/review.model');
const { GameInConsole } = require('../models/gameInConsole.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { Console } = require('../models/console.model');

const getAllGame = catchAsync(async (req, res, next) => {
  const games = await Game.findAll({
    attributes: ['id', 'title', 'genre'],
    include: [
      { model: Review, attributes: ['id', 'comment'] },
      {
        model: Console,
        attributes: ['id', 'name', 'company'],
      },
    ],
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    games,
  });
});

const createGame = catchAsync(async (req, res, next) => {
  const { title, genre } = req.body;

  const newGame = await Game.create({
    title,
    genre,
  });

  res.status(201).json({
    status: 'success',
    newGame,
  });
});

const updateGame = catchAsync(async (req, res, next) => {
  const { game } = req;
  const { title, genre } = req.body;

  await game.update({ title, genre });

  res.status(204).json({
    status: 'success',
  });
});

const deleteGame = catchAsync(async (req, res, next) => {
  const { game } = req;

  await game.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { gameId } = req.params;
  const { comment } = req.body;

  const game = await Game.findOne({ where: { id: gameId, status: 'active' } });

  if (game) {
    const newReview = await Review.create({
      userId: 3,
      gameId,
      comment,
    });

    res.status(201).json({
      status: 'success',
      newReview,
    });
  } else {
    return next(
      new AppError('Game does not exist with given Id or is disabled', 404)
    );
  }
});

module.exports = {
  getAllGame,
  createGame,
  updateGame,
  deleteGame,
  createReview,
};
