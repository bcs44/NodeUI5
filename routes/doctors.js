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
	 *      "name": "Joaquim"
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

	/**
	 * @api {delete} /DeleteDoctorById/:id Delete Doctor by Id
	 * @apiGroup Doctors
	 * @apiParam {String} id Doctor's id.
	 * @apiSuccess {String} Success Doctor Deleted
	 * @apiDescription Delete Doctor by Id (Used on RegisterPage.onDelete())
	 */

	app.delete('/DeleteDoctorById/:id', (req, res) => {
		var docToDelete = req.params.id;
		console.log(docToDelete);
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

	/**
	 * @api {put} /UpdateDoctorById/:id Modify a Doctor by Id
	 * @apiGroup Doctors
	 * 
	 * 
	 * @apiParam {String} id Doctor's Id
	 * 
	 * @apiParamExample {json} Input
	 *    {
	 *      "id": "1"
	 *		"name": "Manuel"
	 *		"password": "pass"
	 *		"email": "manuel@email.com"
	 *    }
	 *
	 * @apiSuccess {String} Success Doctor Modified
	 * 
	 * 
	 * @apiDescription Modify a Doctor by Id (Used on RegisterPage.onEdit())
	 * 
	 */

	app.put('/UpdateDoctorById/:id', (req, res) => {
		var id = req.params.id;
		var doc = req.body;
		console.log(id);
		console.log(doc);
		db.collection('docdata', function(err, collection) {
			collection.update({
				'id': id
			}, doc, function(err, result) {
				if (err) {
					res.send({
						'error': err
					});
				} else {
					//console.log('Success: ' + JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		});
	});

	/**
	 * @api {get} /GetDoctorById/:id Get a Doctor by Id
	 * @apiGroup Doctors
	 *
	 * @apiParam {String} id Doctor's Id
	 *  
	 * @apiDescription Get a Doctor by Id (Used on LadingPage.handleSearch())
	 *
	 * @apiSuccess  {String} id Doctor's ID
	 * @apiSuccess  {String} name Doctor's Name
	 * @apiSuccess  {String} password Doctor's Password
	 * @apiSuccess  {String} email Doctor's Email
	 * 
	 */

	app.get('/GetDoctorById/:id', (req, res) => {
		console.log("entrou");
		var docId = req.params.id;
		db.collection('docdata', function(err, collection) {
			collection.find({
				id: docId
			}).toArray(function(err, items) {
				res.send(items);
			});

		})
	});

}