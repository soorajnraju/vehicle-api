var express = require('express');
var router = express.Router();
var Vehicle = require('../models/vehicle');


/* GET all vehicle. */
router.get('/list', function (req, res, next) {
  Vehicle.find({}, function(err, result) {
    if (err) {
      res.json({
        status: "error",
        data: null,
        message: "Failed to retrieve data"
      });
    } else {
      res.json({
        status: "success",
        data: {
          vehicles: result
        },
        message: "Successfully retrieved data"
      });
    }
  });
});

/** GET one*/
router.get('/:id', function (req, res, next) {
  let _id = req.params.id;
  Vehicle.find({_id: _id}, function(err, result) {
    if (err) {
      res.json({
        status: "error",
        data: null,
        message: "Failed to retrieve data"
      });
    } else {
      res.json({
        status: "success",
        data: {
          vehicles: result
        },
        message: "Successfully retrieved data"
      });
    }
  });
});

/* POST create vehicle. */
router.post('/create', function (req, res, next) {
  var data = req.body;
  //console.log(data);
  const vehicle = new Vehicle({ uid: data.uid, name: data.name, pos_lat: data.pos_lat, pos_lon: data.pos_lon });
  vehicle.save().then(() => {
    res.json({
      status: "success",
      data: {
        vehicle: vehicle
      },
      message: "New vehicle created successfully"
    });
  }).catch((error) => {
    res.json({
      status: "error",
      data: {
        vehicle: vehicle
      },
      message: "Failed to create a new vehicle"
    });
  });
});

/* POST update a vehicle. */
router.post('/update', function (req, res, next) {
  res.send('update a vehicle');
});

module.exports = router;