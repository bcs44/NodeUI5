module.exports = function(app, db) {

	/**
	 * @api {get} /getLastDoctor Request last Doctor information
	 * @apiName getLastDoctor
	 * @apiGroup Doctors
	 *
	 * @apiDescription Receive information from the last doctor registered for the next one to be registered with the following ID. (Used on RegisterPage._getLastId())
	 *
	 * @apiSuccess {String}  id  Id of the last registered doctor found.
	 * @apiSuccess {String}  name  Name of the last registered doctor found.
	 * @apiSuccess {String}  password  Password of the last registered doctor found.
	 * @apiSuccess {String}  email  Email of the last registered doctor found.
	 */

	app.get('/getLastDoctor', (req, res) => {
		db.collection('docdata', function(err, collection) {
			collection.find().toArray(function(err, items) {
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

	/**
	 * @api {post} /PostNewDoctor Post a new record for a new doctor
	 * @apiName PostNewDoctor
	 * @apiGroup Doctors
	 *
	 * 
	 * @apiParamExample {json} Input
	 *    {
	 *      "id": "2",
	 *      "name": Joaquim
	 *      "password": "password",
	 *      "email": "joaquim@mail.com"
	 *    }
	 * 
	 * @apiDescription Post a new record for a new doctor (Used on RegisterPage.onRegister())
	 *
	 * @apiSuccess {String}  success  New Doctor Inserted
	 */

	app.post('/PostNewDoctor', (req, res) => {
		var doc = req.body;
		//console.log('Adding Doctor: ' + JSON.stringify(doc));
		db.collection('docdata', function(err, collection) {
			collection.insert(doc, {
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
	 * @api {get} /doctorLogin/:email/:password Get Doctor
	 * @apiGroup Doctors
	 * 
	 * @apiParam {String} email Doctor's Email
	 * @apiParam {String} password Doctor's Password
	 * 
	 * @apiSuccess {String} id Doctor's ID
	 * @apiSuccess {String} name Doctor's Name
	 * @apiSuccess {String} password Doctor's Password
	 * @apiSuccess {String} email Doctor's Email
	 * 
	 * @apiDescription Log in and sign in to the app (Used on Login.onLogin())
	 */

	app.get('/doctorLogin/:email/:password', (req, res) => {

		var myquery = {
			email: req.params.email,
			password: req.params.password
		};

		db.collection('docdata').find(myquery).toArray(function(err, items) {
			res.send(items);

		})
	});

	//TODO - tratar do delete do dotor!!!!!
	app.delete('/doctor/:id', (req, res) => {
		var docToDelete = req.params.id;
		db.collection('docdata', function(err, collection) {
			collection.remove({
				'id': docToDelete
			}, function(err) {
				res.send((err === null) ? {
					msg: ''
				} : {
					msg: 'error: ' + err
				});
			})
		})
	});

	//TODO - Tratar da edição do doutor!!!
	app.put('/doctor/:id', (req, res) => {
		var id = req.params.id;
		var doc = req.body;
		db.collection('docdata', function(err, collection) {
			collection.update({
				'id': id
			}, doc, function(err, result) {
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