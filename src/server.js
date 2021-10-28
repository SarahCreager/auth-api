'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const authRoutes = require('./routes/auth.js');
const v1Routes = require('./routes/v1.js');

// TODO: add v2 route
// const v2Routes = require('./routes/v2');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(logger);

// routes
app.use('/api/v1', v1Routes);
// Add v2 protected routes. 
// app.use('/api/v2', v2Routes);
app.use(authRoutes);

// Error Catching
app.use('*', notFoundHandler);
app.use(errorHandler);

// exports
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
