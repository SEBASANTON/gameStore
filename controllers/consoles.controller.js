//Models
const { Console } = require('../models/console.model');
const { Game } = require('../models/game.model');
const { GameInConsole } = require('../models/gameInConsole.model');

//Utils
const { catchAsync } = require('../util/catchAsync');

const getAllConsole = catchAsync(async (req, res, next) => {
  const consoles = await Console.findAll({
    attributes: ['id', 'name', 'company'],
    include: [{ model: Game, attributes: ['id', 'title', 'genre'] }],
    where: { status: 'active' },
  });

  res.status(200).json({
    status: 'success',
    consoles,
  });
});

const createConsole = catchAsync(async (req, res, next) => {
  const { name, company } = req.body;

  const newConsole = await Console.create({
    name,
    company,
  });

  res.status(201).json({
    status: 'success',
    newConsole,
  });
});

const updateConsole = catchAsync(async (req, res, next) => {
  const { console } = req;
  const { name } = req.body;

  await console.update({ name });

  res.status(204).json({
    status: 'success',
  });
});

const deleteConsole = catchAsync(async (req, res, next) => {
  const { console } = req;

  await console.update({ status: 'disabled' });

  res.status(204).json({
    status: 'success',
  });
});

const assignGamesToConsole = catchAsync(async (req, res, next) => {
  const { gameId, consoleId } = req.body;

  const gameInConsole = await GameInConsole.create({ gameId, consoleId });

  res.status(201).json({
    status: 'success',
    gameInConsole,
  });
});

module.exports = {
  getAllConsole,
  createConsole,
  updateConsole,
  deleteConsole,
  assignGamesToConsole,
};
