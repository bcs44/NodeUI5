sap.ui.controller("com.bsilva.app.controller.RegisterPage", {

	onInit: function () {

		that = this;
		that.getOwnerComponent().getRouter().getRoute("RegisterPage").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function (evt) {
		that = this;
		this._editable = evt.getParameter("arguments").edit;
		var _idDoctor = evt.getParameter("arguments").idDoctor;

		if (this._editable === "true") {
			this.createEditModel(_idDoctor);
		}
		else {

			var newDoctor = new sap.ui.model.json.JSONModel();
			newDoctor.setDefaultBindingMode("TwoWay");
			that.getView().setModel(newDoctor, "DoctorModel");
			that._getLastId();
		}

	},

	createEditModel: function (idDoctor) {

		var oEditDoctorModel = new sap.ui.model.json.JSONModel();

		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/GetDoctorById/" + idDoctor,
			dataType: "json",
			async: false,
			success: function (data, textStatus, jqXHR) {
				oEditDoctorModel.setData(data[0]);
			}
		});
		this.getView().byId("_buttonDelete").setVisible(true);
		this.getView().byId("_buttonEdit").setVisible(true);

		that.getView().setModel(oEditDoctorModel, "DoctorModel");

	},

	_getLastId: function () {

		var patdata;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/getLastDoctor",
			dataType: "json",
			async: false,
			success: function (data, textStatus, jqXHR) {
				patdata = data;
			}
		});

		console.log(patdata);

		var newDoctor = this.getView().getModel("DoctorModel");
		newDoctor.setData({
			id: parseInt(patdata.id) + 1,
			name: "",
			password: "",
			email: "",
		});
		this.getView().byId("_buttonRegister").setVisible(true);
	},

	onRegister: function () {

		var newDoctor = this.getView().getModel("DoctorModel");
		var docData = newDoctor.getData();

		var aData = jQuery.ajax({
			type: "POST",
			url: "/PostNewDoctor",
			dataType: "json",
			data: docData,
			async: false,
			success: function (response, status) {

			}
		});
		this.getOwnerComponent().getRouter()
			.navTo("Login");

	},


	onDelete: function () {

		if (!this._successDialog) {
			this.createSuccessDialog("Deleted ");
		}

		var IdDoc = this.getView().getModel("DoctorModel").getData().id;

		jQuery.ajax({
			url: "/DeleteDoctorById/" + IdDoc,
			type: "DELETE",
			dataType: "json",
			success: function (response, status) {
				that._successDialog.open();
				that.getOwnerComponent().getRouter()
					.navTo("Login");
			}
		});

		

	},

	onEdit: function () {
		if (!this._successDialog) {
			this.createSuccessDialog("Edited ");
		}



		var docData = this.getView().getModel("DoctorModel").getData();

		var doc = {
			id: docData.id,
			name: docData.name,
			password: docData.password,
			email: docData.email
		};

		var url = "/UpdateDoctorById/" + docData.id;

		jQuery.ajax({
			url: url,
			type: "PUT",
			dataType: "json",
			data: doc,
			success: function (response, status) {
				//console.log(response);
			}
		});

		this._successDialog.open();
	},

	createSuccessDialog: function (x) {
		if (!this._successDialog) {
			this._successDialog = new sap.m.Dialog({
				title: 'Success',
				type: 'Message',
				state: 'Success',
				content: new sap.m.Text({
					text: x + 'with Success!!'
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						that._successDialog.close();
					}
				}),
				afterClose: function () {
					that._successDialog.destroy();
				}
			});
		}
	},

	onNavButtonPress: function () {
		if (this._editable === "true") {
			var IdDoc = this.getView().getModel("DoctorModel").getData().id;
			var NameDoc = this.getView().getModel("DoctorModel").getData().name;
			that.getOwnerComponent().getRouter()
				.navTo("LandingPage", {
					Name: NameDoc,
					Id: IdDoc
				});
		}
		else {
			that.getOwnerComponent().getRouter()
				.navTo("Login");
		}
	}

});