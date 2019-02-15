module.exports = function(app, db) {

	/**
	 * @api {post} /PostNewConsultation Insert a new Consultation
	 * @apiGroup Consultations
	 *
	 * @apiParamExample {json} Input
	 *    {
	 *      "idPat": "2",
	 *      "namePat": Bruna
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
	 * @api {get} /getConsultationById/:id Get a consultation by Id
	 * @apiName consultation
	 * @apiGroup Consultations
	 *
	 * @apiParam {String} id Consultation's Id
	 *  
	 * @apiDescription Get a Consultation by Id (Used on Details.getData())
	 *
	 * @apiSuccess  {String} idPat Patient's ID
	 * @apiSuccess  {String} namePat Patient's Name
	 * @apiSuccess  {String} speciality Consultation's Speciality
	 * @apiSuccess  {String} time Consultation's Time
	 * @apiSuccess  {String} date Consultation's Date
	 * 
	 */

	app.get('/getConsultationById/:id', (req, res) => {
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

	//TODO - FAZER CENA DA APIDOC
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