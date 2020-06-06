const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;

var vehicleSchema = new Schema({
    uid: {type: String, unique : true, required: true},
    name: {type: String, required: true},
    pos_lat: {type: String, required: true},
    pos_lon: {type: String, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Vehicle', vehicleSchema);