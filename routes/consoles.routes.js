const express = require('express');

//Controllers
const {
  getAllConsole,
  createConsole,
  updateConsole,
  deleteConsole,
  assignGamesToConsole,
} = require('../controllers/consoles.controller');

//Middlewares
const { consoleExist } = require('../middlewares/consoles.middleware');
const {
  createConsoleValidators,
  updateConsoleValidators,
} = require('../middlewares/validatiors.middleware');
const { protectSesssion } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', getAllConsole);

router.use(protectSesssion);

router.post('/', createConsoleValidators, createConsole);

router.post('/assign-game', assignGamesToConsole);

router
  .route('/:id')
  .patch(updateConsoleValidators, consoleExist, updateConsole)
  .delete(consoleExist, deleteConsole);

module.exports = { consolesRouter: router };
