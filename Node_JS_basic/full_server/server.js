import routes from './routes';

const express = require('express');

const app = express();
const PORT = 1245;

app.use('/', routes);

app.listen(PORT);

module.exports = app;
