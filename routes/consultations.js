module.exports = function(app, db) {

	/**
	 * @api {post} /PostNewConsultation Insert a new Consultation
	 * @apiGroup Consultations
	 *
	 * @apiParamExample {json} Input
	 *    {
	 *      "idPat": "2",
	 *      "namePat": "Bruna"
	 *      "speciality": "Dentist",
	 *      "time": "12:15:00"
	 *      "date": "02/03/2019",
	 *      "observations": "Electrocardiogram done"
	 *    }
	 *  
	 * @apiDescription Insert a new Consultation (Used on CreateConsultations.onCreateConsultations())
	 *
	 * @apiSuccess  {String} Success New Consultation inserted
	 * 
	 */

	app.post('/PostNewConsultation', (req, res) => {
		console.log("aqui ja entra");
		var cons = req.body;
		db.collection('consdata', function(err, collection) {
			collection.insert(cons, {
				safe: true
			}, function(err, result) {
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
	 * @api {get} /getConsultationByPatientId/:id Get consultations by Patient's Id
	 * @apiName consultation
	 * @apiGroup Consultations
	 *
	 * @apiParam {String} id Patient's Id
	 *  
	 * @apiDescription Get a Consultation by Patient's Id (Used on Details.getData())
	 *
	 * @apiSuccess  {String} idPat Patient's ID
	 * @apiSuccess  {String} namePat Patient's Name
	 * @apiSuccess  {String} speciality Consultation's Speciality
	 * @apiSuccess  {String} time Consultation's Time
	 * @apiSuccess  {String} date Consultation's Date
	 * 
	 */

	app.get('/getConsultationByPatientId/:id', (req, res) => {
		var consId = req.params.id;
		db.collection('consdata', function(err, collection) {
			collection.find({
				idPat: consId
			}).toArray(function(err, items) {
				res.send(items);
			});

		})
	});

	/**
	 * @api {delete} /deleteConsultationById/:id Delete consultation by Id
	 * @apiGroup Consultations
	 * @apiParam {String} id Consultation's id.
	 * @apiSuccess {String} Success Consultation Deleted
	 * @apiDescription Delete Consultation by Id (Used on CreateConsultations._onDelete())
	 */

	app.delete('/deleteConsultationById/:id', (req, res) => {
		var consToDelete = req.params.id;
		var ObjectId = require('mongodb').ObjectId;
		var oConsToDelete = ObjectId(consToDelete);
		db.collection('consdata', function(err, collection) {
			collection.remove({
				'_id': oConsToDelete
			}, function(err) {
				res.send((err === null) ? {
					msg: ''
				} : {
					msg: 'error: ' + err
				});
			})
		})
	});

	/**
	 * @api {put} /UpdateConsultationById/:id Modify a Consultation by Id
	 * @apiGroup Consultations
	 * 
	 * 
	 * @apiParam {String} id Consultation's Id
	 * 
	 * @apiParamExample {json} Input
	 *    {
	 *      "_id": "5c504711fadf3e2ac4fee135",
	 *      "idPat": "1"
	 *      "namePat": "Bruna",
	 *      "speciality": "Cardiology"
	 *      "time": "13:44:56",
	 *      "date": "01/02/2019"
	 * 		"observations": "Ending the medication for blood pressure"
	 *    }
	 *
	 * @apiSuccess {String} Success Consultation Modified
	 * 
	 * 
	 * @apiDescription Modify a Patient by Id (Used on LadingPage.handlebtn_Save())
	 * 
	 */

	app.put('/UpdateConsultationById/:id', (req, res) => {
		var consToEdit = req.params.id;
		var ObjectId = require('mongodb').ObjectId;
		var oconsToEdit = ObjectId(consToEdit);
		console.log(oconsToEdit);
		var cons = req.body;
		console.log(cons);
		db.collection('consdata', function(err, collection) {
			collection.update({
				'_id': oconsToEdit
			}, cons, function(err, result) {
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
}