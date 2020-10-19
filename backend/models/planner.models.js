const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
	name: { type: String, required: true },
	beacons: [
		{
			name: { type: String, required: true },
			x: { type: Number, required: true },
			y: { type: Number, required: true },
		}
	],
	img: 
		{ 
			data: Buffer,
			contentType: String
		}
	}
);

const Planner = mongoose.model('Planner', PlannerSchema);
module.exports = Planner;