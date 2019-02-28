sap.ui.controller("com.bsilva.app.controller.EditDoc", {

	onInit: function() {

		that = this;
		that.getOwnerComponent().getRouter().getRoute("EditDoc").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function(evt) {
		that = this;
		var _idDoctor = evt.getParameter("arguments").idDoctor;

		this.createEditModel(_idDoctor);

	},

	createEditModel: function(idDoctor) {

		var oEditDoctorModel = new sap.ui.model.json.JSONModel();

		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/GetDoctorById/" + idDoctor,
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				oEditDoctorModel.setData(data[0]);
			}
		});
		this.getView().byId("_buttonDelete").setVisible(true);
		this.getView().byId("_buttonEdit").setVisible(true);

		that.getView().setModel(oEditDoctorModel, "DoctorModel");

	},

	onDelete: function() {

		this.createSuccessDialog("Deleted ");

		var IdDoc = this.getView().getModel("DoctorModel").getData().id;

		jQuery.ajax({
			url: "/DeleteDoctorById/" + IdDoc,
			type: "DELETE",
			dataType: "json",
			success: function(response, status) {
				that._successDialog.open();
				that.getOwnerComponent().getRouter()
					.navTo("Login");
			}
		});

	},

	onEdit: function() {

		this.createSuccessDialog("Edited ");

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
			success: function(response, status) {
				//console.log(response);
			}
		});

		//this._successDialog.open();
	},

	createSuccessDialog: function(x) {

		this._successDialog = new sap.m.Dialog({
			title: 'Success',
			type: 'Message',
			state: 'Success',
			content: new sap.m.Text({
				text: x + 'with Success!!'
			}),
			beginButton: new sap.m.Button({
				text: 'OK',
				press: function() {
					that._successDialog.close();
				}
			}),
			afterClose: function() {
				that._successDialog.destroy();
			}
		});
		this._successDialog.open();
	},

	onNavButtonPress: function() {

		var IdDoc = this.getView().getModel("DoctorModel").getData().id;
		var NameDoc = this.getView().getModel("DoctorModel").getData().name;
		that.getOwnerComponent().getRouter()
			.navTo("LandingPage", {
				Name: NameDoc,
				Id: IdDoc
			});
	}

});