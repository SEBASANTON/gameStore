//Models
const { Console } = require('../models/console.model');

//Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

const consoleExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const console = await Console.findOne({ where: { id, status: 'active' } });

  if (!console) {
    return next(
      new AppError('Console does not exist with given Id or is disabled', 404)
    );
  }

  req.console = console;
  next();
});

module.exports = { consoleExist };
