module.exports = function(app, db) {



/**
 * @api {post} /consultation Insert a new Consultation
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

	//usado (CreateConsultations - onCreateConsultations)
	app.post('/consultation', (req, res) => {
		var cons = req.body;
	//	console.log('Adding consultation: ' + JSON.stringify(cons));
		db.collection('consdata', function(err, collection) {
			collection.insert(cons, {
				safe: true
			}, function(err, result) {
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
 * @api {get} /consultation/:id Get a consultation by Id
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

	//usado (Details-getData)
	app.get('/consultation/:id', (req, res) => {
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
 * @api {delete} /consultation/:id Delete consultation by Id
 * @apiGroup Consultations
 * @apiParam {String} id Consultation's id.
 * @apiSuccess {String} Success Consultation Deleted
 * @apiDescription Delete Consultation by Id (Used on CreateConsultations._onDelete())
 */

app.delete('/consultation/:id', (req, res) => {
	var consToDelete = req.params.id;
	var ObjectId = require('mongodb').ObjectId;
	var oConsToDelete =  ObjectId(consToDelete);
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




	app.get('/consultations', (req, res) => {
		db.collection('consdata', function(err, collection) {
			collection.find().toArray(function(err, items) {
				//console.log(items);
				res.send(items);
			});
		});
	});
	

	app.put('/consultation/:id', (req, res) => {
		var consToEdit = req.params.id;
		var ObjectId = require('mongodb').ObjectId;
		var oconsToEdit =  ObjectId(consToEdit);
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