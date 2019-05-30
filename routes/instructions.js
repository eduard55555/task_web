const express = require('express');
const router = express.Router();

/* Instruction page. */
router.all('/', (req, res) => {
  res.render('instructions');
});

module.exports = router;
