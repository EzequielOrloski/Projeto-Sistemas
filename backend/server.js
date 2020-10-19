const cors     = require('cors');
const express  = require('express');
const mongoose = require('mongoose');

const bodyPar  = require('body-parser');

const uri = "mongodb://localhost:27017";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.Promisse = global.Promise;
mongoose.set('useFindAndModify', false);

const app = express();
app.use(cors());

app.use(bodyPar.json());
app.use(bodyPar.urlencoded({ 'extended': false }));

const routerPlanners = require('./routes/planners');
const routerBeacons  = require('./routes/beacons');
const routerUser = require('./routes/authController');
const routerConfig = require('./routes/config');

app.use('/auth', routerUser);
app.use('/planner', routerPlanners);
app.use('/beacons', routerBeacons);
app.use('/config', routerConfig);
app.listen(5000, () => {
	console.log("Servidor rodando na porta 5000");
});