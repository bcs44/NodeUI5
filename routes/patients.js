module.exports = function (app, db) {

	/**
	 * @api {post} /PostNewPat Insert a new Patient
	 * @apiGroup Patients
	 *
	 * @apiParamExample {json} Input
	 *    {
	 *      "designation": "diabetic",
	 * 		"dob": "16/04/1995",
	 * 		"gender": "Female",
	 * 		"id": "1",
	 * 		"name": "Bruna",
	 * 		"doctor": "2"
	 *    }
	 *  
	 * @apiDescription Insert a new Patient (Used on LandigPage.handleOperationBtncreate())
	 *
	 * @apiSuccess  {String} Success New Patient inserted
	 * 
	 */

	app.post('/PostNewPat', (req, res) => {
		console.log("aqui ja entra");
		var pat = req.body;
		db.collection('patdata', function (err, collection) {
			collection.insert(pat, {
				safe: true
			}, function (err, result) {
				if (err) {
					res.send({
						'error': 'An error has occurred'
					});
				} else {
					res.send(result[0]);
				}
			});
		});
	});


	/**
	 * @api {put} /UpdatePatientById/:id Modify a Patient by Id
	 * @apiGroup Patients
	 * 
	 * 
	 * @apiParam {String} id Patients's Id
	 * 
	 * @apiParamExample {json} Input
	 *    {
	 *      "id": "2",
	 *      "name": Bruna
	 *      "dob": "16/04/1995",
	 *      "gender": "Female"
	 *      "designation": "Asthmatic Patient",
	 *      "doctor": 2
	 *    }
	 *
	 * @apiSuccess {String} Success Patient Modified
	 * 
	 * 
	 * @apiDescription Modify a Patient by Id (Used on LadingPage.handlebtn_Save())
	 * 
	 */

	app.put('/UpdatePatientById/:id', (req, res) => {
		var id = req.params.id;
		var pat = req.body;
		db.collection('patdata', function (err, collection) {
			collection.update({
				'id': id
			}, pat, function (err, result) {
				if (err) {
					res.send({
						'error': 'An error has occurred'
					});
				} else {
					//console.log('Success: ' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		});
	});

	/**
	 * @api {get} /getPatientById/:id Get a Patient by Id
	 * @apiName patient
	 * @apiGroup Patients
	 *
	 * @apiParam {String} id Patients's Id
	 *  
	 * @apiDescription Get a Patient by Id (Used on LadingPage.handleSearch())
	 *
	 * @apiSuccess  {String} id Patient's ID
	 * @apiSuccess  {String} name Patient's Name
	 * @apiSuccess  {String} dob Patient's Date of Birthday
	 * @apiSuccess  {String} gender Patient's Gender
	 * @apiSuccess  {String} designation Patient's Designation
	 * @apiSuccess  {String} doctor Doctor's ID
	 */

	app.get('/getPatientById/:id', (req, res) => {
		var patId = req.params.id;
		db.collection('patdata', function (err, collection) {
			collection.find({
				id: patId
			}).toArray(function (err, items) {
				res.send(items);
			});

		})
	});

	/**
	 * @api {delete} /DeletePatientById/:id Delete Patient by Id
	 * @apiGroup Patients
	 * @apiParam {String} id Patient's id.
	 * @apiSuccess {String} Success Patient Deleted
	 * @apiDescription Delete Patient by Id (Used on LadingPage.handlebtn_Delete())
	 */

	app.delete('/DeletePatientById/:id', (req, res) => {
		var patToDelete = req.params.id;
		db.collection('patdata', function (err, collection) {
			collection.remove({
				'id': patToDelete
			}, function (err) {
				res.send((err === null) ? {
					msg: ''
				} : {
						msg: 'error: ' + err
					});
			})
		})
	});

	/**
	 * @api {get} /GetPatientByDoctor/:doctor Get Patient by Doctor's Id.
	 * @apiName patientByDoctor
	 * @apiGroup Patients
	 *
	 * @apiParam {String} doctor Doctor's Id.
	 * 
	 * @apiDescription Get Patient by Doctor's Id. (Used on LadingPage.handleOperationBtncreate(), LadingPage.getData(), CreateConsultations._getPatients())
	 *
	 * @apiSuccess  {String} id Patient's ID
	 * @apiSuccess  {String} name Patient's Name
	 * @apiSuccess  {String} dob Patient's Date of Birthday
	 * @apiSuccess  {String} gender Patient's Gender
	 * @apiSuccess  {String} designation Patient's Designation
	 * @apiSuccess  {String} doctor Doctor's ID
	 */

	app.get('/GetPatientByDoctor/:doctor', (req, res) => {
		var patDoctor = req.params.doctor;
		db.collection('patdata', function (err, collection) {
			collection.find({
				doctor: patDoctor
			}).toArray(function (err, items) {
				res.send(items);
			});

		})
	});

	/**
	 * @api {get} /GetLastPatient Get information from the last Patient registered.
	 * @apiName GetLastPatient
	 * @apiGroup Patients
	 *
	 * 
	 * @apiDescription Receive information from the last Patient registered for the next one to be registered with the following ID. (Used on LadingPage._getLastId())
	 *
	 * @apiSuccess  {String} id Patient's ID
	 * @apiSuccess  {String} name Patient's Name
	 * @apiSuccess  {String} dob Patient's Date of Birthday
	 * @apiSuccess  {String} gender Patient's Gender
	 * @apiSuccess  {String} designation Patient's Designation
	 * @apiSuccess  {String} doctor Doctor's ID
	 */

	app.get('/GetLastPatient', (req, res) => {
		db.collection('patdata', function (err, collection) {
			collection.find().toArray(function (err, items) {
				//console.log(items);
				var x = 0;
				for (var i = 0; i < items.length; i++) {
					if (items[i].id > x) {
						x = items[i].id;
						var items2 = items[i];
					}
				}
				res.send(items2);
			});
		});
	});

}