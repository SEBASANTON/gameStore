const { body, validationResult } = require('express-validator');

const { AppError } = require('../util/appError');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Array has errors
    const errorMsgs = errors.array().map(err => err.msg);

    const message = errorMsgs.join('. ');

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric()
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];
const updateUserValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must provide a valid email'),
  checkResult,
];

const createGameValidators = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('genre').notEmpty().withMessage('Title cannot be empty'),
  checkResult,
];

const updateGameValidators = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  checkResult,
];

const createConsoleValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('company').notEmpty().withMessage('Company cannot be empty'),
  checkResult,
];

const updateConsoleValidators = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  checkResult,
];

module.exports = {
  createUserValidators,
  updateUserValidators,
  createGameValidators,
  updateGameValidators,
  createConsoleValidators,
  updateConsoleValidators,
};
