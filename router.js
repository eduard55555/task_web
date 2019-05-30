const express = require('express');
const router = express.Router();

const instructions = require('./routes/instructions');
const requests = require('./routes/requests');

module.exports = (io) => {
  const trap = require('./routes/trap')(io);

  router.use('/', instructions);
  router.use('/*/requests', requests);
  router.use(/^\/\w+/, trap);

  return router;
};
