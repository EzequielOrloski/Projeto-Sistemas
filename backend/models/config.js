const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
	broker:   { type: String, required: true },
	topicoin: { type: String, required: true },
	topicoou: { type: String, required: true },
	unidades: { type: String, required: true },
	db: { type: String, required: true },
	}
);

const Config = mongoose.model('Config', ConfigSchema);
module.exports = Config;