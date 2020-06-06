var express = require('express');
var router = express.Router();

/* POST create vehicle. */
router.post('/create', function(req, res, next) {
  res.send('create a vehicle');
});

/* POST update a vehicle. */
router.post('/update', function(req, res, next) {
  res.send('update a vehicle');
});

module.exports = router;
