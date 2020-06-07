const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
var Schema = mongoose.Schema;

var historySchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    uid: {type: String, required: true},
    pos_lat: {type: String, required: true},
    pos_lon: {type: String, required: true},
    timestamp: {type: Number, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('History', historySchema);