var express = require('express');
var router = express.Router();
const geolib = require('geolib');
var Vehicle = require('../models/vehicle');
var History = require('../models/history');


/* GET all vehicle. */
router.get('/list', function (req, res, next) {
  Vehicle.find({}, function (err, result) {
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
router.get('/fetch-one/:id', function (req, res, next) {
  let _id = req.params.id;
  Vehicle.find({ _id: _id }, function (err, result) {
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
  let data = req.body;
  //console.log(data);

  var vehicle = new Vehicle({ uid: data.uid, name: data.name, pos_lat: data.pos_lat, pos_lon: data.pos_lon });
  
  vehicle.save().then((vehicle) => {
    const history_obj = { vehicle: vehicle, uid: data.uid, pos_lat: data.pos_lat, pos_lon: data.pos_lon, timestamp: Date.now() };
    //vehicle.history.push(history_obj);
    //vehicle.save();
    const history = new History(history_obj);
    history.save();
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
router.post('/update', async function (req, res, next) {
  let data = req.body;
  let vehicle = await Vehicle.findOne({ _id: data._id });

  vehicle.name = data.name;
  vehicle.pos_lat = data.pos_lat;
  vehicle.pos_lon = data.pos_lon;

  const history_obj = { vehicle: vehicle, uid: data.uid, pos_lat: data.pos_lat, pos_lon: data.pos_lon, timestamp: Date.now() };
  const vehicle_history_obj = { vehicle: vehicle._id, uid: data.uid, pos_lat: data.pos_lat, pos_lon: data.pos_lon, timestamp: Date.now() };
  
  const history = new History(history_obj);

  vehicle.history.push(vehicle_history_obj);

  vehicle.save().then(() => {
    history.save();
    res.json({
      status: "success",
      data: {
        vehicle: vehicle
      },
      message: "Vehicle updated successfuly"
    });
  }).catch((error) => {
    res.json({
      status: "error",
      data: {
        vehicle: vehicle
      },
      message: "Failed to update"
    });
  });
});

/* GET all vehicle history. */
router.get('/history', function (req, res, next) {
  History.
    find({}).
    populate('vehicle').
    exec(function (err, history) {
      if (err) return handleError(err);
      res.json(history);
    });
});

/* GET vehicle history by id. */
router.get('/history/:id', function (req, res, next) {
  let _id = req.params.id;
  History.
    find({ vehicle: _id }, function (err, result) {
      if (err) return handleError(err);
      res.json(result);
    });
});

/**
 * 
 * @param {latitude 1} lat1 
 * @param {longitude 1} lon1 
 * @param {timestamp 1} t1 
 * @param {latitude 2} lat2 
 * @param {longitude 2} lon2 
 * @param {timestamp 2} t2 
 */
function getVehicleSpeed(lat1, lon1, t1, lat2, lon2, t2) {
  let speed = geolib.getSpeed(
    { latitude: lat1, longitude: lon1, time: t1 },
    { latitude: lat2, longitude: lon2, time: t2 }
  );

  return speed;
}

module.exports = router;