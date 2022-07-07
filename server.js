const { app } = require('./app');

//Models
const { User } = require('./models/user.model');
const { Review } = require('./models/review.model');
const { Game } = require('./models/game.model');
const { Console } = require('./models/console.model');

//Utils
const { db } = require('./util/database');

//Database authenticated
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

//Init models relations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

Game.hasMany(Review, { foreignKey: 'gameId' });
Review.belongsTo(Game);

Game.belongsToMany(Console, { through: 'gameInConsole' });
Console.belongsToMany(Game, { through: 'gameInConsole' });

//Database synced with models' relations
db.sync(/* { force: true } */)
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Spin up server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
