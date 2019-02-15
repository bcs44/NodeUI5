const doctorRoutes = require('./doctors');
const patientsRoutes = require('./patients');
const consultRoutes = require('./consultations');

module.exports = function (app, db) {
	doctorRoutes(app, db);
	patientsRoutes(app, db);
	consultRoutes(app, db);

}