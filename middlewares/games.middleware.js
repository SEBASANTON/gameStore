//Models
const { Game } = require('../models/game.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

const gameExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const game = await Game.findOne({ where: { id, status: 'active' } });

  if (!game) {
    return next(
      new AppError('Game does not exist with given Id or is disabled', 404)
    );
  }

  req.game = game;
  next();
});

module.exports = { gameExist };
