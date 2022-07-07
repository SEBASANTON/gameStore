const express = require('express');
const cors = require('cors');

//Controllers
const { globalErrorHandler } = require('./controllers/errors.constroller');

//Routers
const { usersRouter } = require('./routes/users.routes');
const { gamesRouter } = require('./routes/games.routes');
const { consolesRouter } = require('./routes/consoles.routes');

const app = express();

app.use(cors());

//Enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/consoles', consolesRouter);

app.use(globalErrorHandler);

module.exports = { app };
