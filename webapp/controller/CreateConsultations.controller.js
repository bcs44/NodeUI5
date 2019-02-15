sap.ui.controller("com.bsilva.app.controller.CreateConsultations", {

	onInit: function() {

		that = this;
		that.getOwnerComponent().getRouter().getRoute("CreateConsultations").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function(evt) {

		that._idDoctor = evt.getParameter("arguments").idDoctor;

		var newConsultation = new sap.ui.model.json.JSONModel();
		newConsultation.setDefaultBindingMode("TwoWay");
		that.getView().setModel(newConsultation, "newConsultation");

		that._getPatients(that._idDoctor);

	},

	_getPatients: function(idDoctor) {

		var oModel = new sap.ui.model.json.JSONModel();

		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/GetPatientByDoctor/" + idDoctor,
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				oModel.setData({
					modelData: data
				});
			}
		});

		sap.ui.getCore().setModel(oModel, 'model_table');
		var oTable = that.getView().byId("tbl_pat");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");

	},

	rowSelect: function(e) {

		var idx = e.getParameter('rowIndex');
		that.PatName = e.getSource().getModel().getProperty('/modelData/' + idx).name;

		that._id = e.getSource().getModel().getProperty('/modelData/' + idx).id;
		that.getView().byId("form_cons").setTitle(that.PatName);

	},

	onCreateConsultations: function() {

		if (!that._successDialog) {
			that._successDialog = new sap.m.Dialog({
				title: 'Success',
				type: 'Message',
				state: 'Success',
				content: new sap.m.Text({
					text: 'Created with Success!!'
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
		}

		var newConsultation = that.getView().getModel("newConsultation");

		var consData = {
			"idPat": that._id,
			"namePat": that.PatName,
			"speciality": newConsultation.getData().speciality,
			"time": newConsultation.getData().time,
			"date": newConsultation.getData().date,
			"observations": newConsultation.getData().observations
		};
		var aData = jQuery.ajax({
			type: "POST",
			url: "/PostNewConsultation",
			dataType: "json",
			data: consData,
			async: false,
			success: function(response, status) {
				//console.log(response + status);

			}

		});

		that._successDialog.open();

	},

	onNavButtonPress: function() {
		var oAuth = that.getOwnerComponent().getModel("login");
		var name = oAuth.getData()[0].name;

		that.getOwnerComponent().getRouter()
			.navTo("LandingPage", {
				Name: name,
				Id: that._idDoctor
			});
	}
});