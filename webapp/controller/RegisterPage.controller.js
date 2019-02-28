sap.ui.controller("com.bsilva.app.controller.RegisterPage", {

	onInit: function() {

		that = this;
		that.getOwnerComponent().getRouter().getRoute("RegisterPage").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function(evt) {
		that = this;
		var _idDoctor = evt.getParameter("arguments").idDoctor;

		var newDoctor = new sap.ui.model.json.JSONModel();
		newDoctor.setDefaultBindingMode("TwoWay");
		that.getView().setModel(newDoctor, "DoctorModel");
		that._getLastId();

	},

	_getLastId: function() {

		var patdata;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/getLastDoctor",
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
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

	},

	onRegister: function() {

		var newDoctor = this.getView().getModel("DoctorModel");
		var docData = newDoctor.getData();

		var aData = jQuery.ajax({
			type: "POST",
			url: "/PostNewDoctor",
			dataType: "json",
			data: docData,
			async: false,
			success: function(response, status) {

			}
		});

		this.createSuccessDialog("Registed");

	},

	createSuccessDialog: function(x) {
		if (!this._successDialog) {
			this._successDialog = new sap.m.Dialog({
				title: 'Success',
				type: 'Message',
				state: 'Success',
				content: new sap.m.Text({
					text: x + ' with Success!!'
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function() {

						that.getOwnerComponent().getRouter()
							.navTo("Login");
						that._successDialog.close();

					}
				}),
				afterClose: function() {
					that._successDialog.destroy();
				}
			});
		}
		this._successDialog.open();
	},

	onNavButtonPress: function() {
		if (this._editable === "true") {
			var IdDoc = this.getView().getModel("DoctorModel").getData().id;
			var NameDoc = this.getView().getModel("DoctorModel").getData().name;
			that.getOwnerComponent().getRouter()
				.navTo("LandingPage", {
					Name: NameDoc,
					Id: IdDoc
				});
		} else {
			that.getOwnerComponent().getRouter()
				.navTo("Login");
		}
	}

});