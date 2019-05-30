const express = require('express');
const router = express.Router();
const trap = require('../controllers/trap');

/* Saving request to DB */
module.exports = (io) => {
  return router.all('/', (req, res) => {
    trap.save(req, io);
    res.statusCode = 200;
    res.send();
  });
};
