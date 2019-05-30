const express = require('express');
const router = express.Router();

/* Request history */
router.all('/', (req, res) => {
  res.render('requests');
});

module.exports = router;
