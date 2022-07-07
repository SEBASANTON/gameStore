const { DataTypes } = require('sequelize');
const { db } = require('../util/database');

//Models
const { Game } = require('./game.model');
const { Console } = require('./console.model');

const GameInConsole = db.define('gameInConsole', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  gameId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Game,
      key: 'id',
    },
  },
  consoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Console,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

module.exports = { GameInConsole };
