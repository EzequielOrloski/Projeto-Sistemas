const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const beaconsSchema = new Schema({
	name: { type: String, required: true },
	x: { type: Number, required: true },
	y: { type: Number, required: true },
},{
	timestamps: true,
});

const Beacons = mongoose.model('Beacons', beaconsSchema);
module.exports = Beacons;