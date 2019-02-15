sap.ui.controller("com.bsilva.app.controller.LandingPage", {

	onInit: function() {
		that = this;
		that.getOwnerComponent().getRouter().getRoute("LandingPage").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function(evt) {

		var _name = evt.getParameter("arguments").Name;
		that._idDoctor = evt.getParameter("arguments").Id;
		sap.ui.getCore().byId(that.getView().sId + "--idPage").setTitle("Doctor " + _name);
		that._createModels();
		that.getData(that._idDoctor);

	},

	_createModels: function() {

		var newPatient = new sap.ui.model.json.JSONModel();
		newPatient.setDefaultBindingMode("TwoWay");
		that.getView().setModel(newPatient, "newPatient");
		that._getLastId();

		var searchPatient = new sap.ui.model.json.JSONModel();
		searchPatient.setDefaultBindingMode("TwoWay");
		that.getView().setModel(searchPatient, "searchPatient");
		that.getView().getModel("searchPatient").setData({
			visible: false
		});
		that.getView().getModel("searchPatient").refresh(false);

		var editPatient = new sap.ui.model.json.JSONModel();
		editPatient.setDefaultBindingMode("TwoWay");
		that.getView().setModel(editPatient, "editPatient");
	},

	_getLastId: function() {

		var patdata;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/GetLastPatient",
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				patdata = data;
			}
		});

		console.log(patdata);

		var newPatient = that.getView().getModel("newPatient");

		newPatient.setData({
			id: parseInt(patdata.id) + 1
		});

	},

	handleSearch: function(oEvent) {

		var patdata;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/getPatientById/" + sap.ui.getCore().byId(that.getView().sId + "--ip_sPatId"),
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				patdata = data;
			}
		});

		var searchModel = that.getView().getModel("searchPatient");
		searchModel.setData({
			visible: true,
			name: patdata[0].name,
			dob: patdata[0].dob,
			designation: patdata[0].designation,
			gender: patdata[0].gender
		});

	},

	handleOperationBtncreate: function(oEvent) {

		var oNewPatient = that.getView().getModel("newPatient");
		oNewPatient.refresh(false);

		var patData = {
			"designation": oNewPatient.getData().designation,
			"dob": oNewPatient.getData().dob,
			"gender": oNewPatient.getData().gender,
			"id": oNewPatient.getData().id,
			"name": oNewPatient.getData().name,
			"doctor": that._idDoctor
		};

		var aData = jQuery.ajax({
			type: "POST",
			url: "/PostnewPatient",
			dataType: "json",
			data: patData,
			async: false,
			success: function(response, status) {
				//console.log(response + status);
			}

		});

		var oModel = new sap.ui.model.json.JSONModel();
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/GetPatientByDoctor/" + that._idDoctor,
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				oModel.setData({
					modelData: data
				});
			}
		});

		oNewPatient.setData();

		sap.ui.getCore().setModel(oModel, 'model_table');
		var oTable = sap.ui.getCore().byId(that.getView().sId + "--tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");

	},

	handlebtn_Delete: function(oEvent) {
		jQuery.ajax({
			url: "/DeletePatientById/" + that.getView().getModel("editPatient").getData().id,
			type: "DELETE",
			dataType: "json",
			success: function(response, status) {

			}
		});

		that.getData(that._idDoctor);

		that._Dialog.close();

	},

	handlebtn_Save: function(oEvent) {

		var patData = that.getView().getModel("editPatient").getData();

		var url = "/UpdatePatientById/" + patData.id;

		jQuery.ajax({
			url: url,
			type: "PUT",
			dataType: "json",
			data: patData,
			success: function(response, status) {
				//console.log(response);
			}
		});

		that.getData(that._idDoctor);
		that._Dialog.close();
	},

	handleOperationBtncls: function(oEvent) {
		that._Dialog.close();
	},

	rowSelect: function(e) {

		var idx = e.getParameter('rowIndex');

		var editPatient = that.getView().getModel("editPatient");

		editPatient.setData({
			name: e.getSource().getModel().getProperty('/modelData/' + idx).name,
			id: e.getSource().getModel().getProperty('/modelData/' + idx).id,
			gender: e.getSource().getModel().getProperty('/modelData/' + idx).gender,
			designation: e.getSource().getModel().getProperty('/modelData/' + idx).designation,
			dob: e.getSource().getModel().getProperty('/modelData/' + idx).dob,
			doctor: e.getSource().getModel().getProperty('/modelData/' + idx).doctor
		})

		editPatientData = editPatient.getData();

		// if (!that._Dialog) {

		var ip_PatId = new sap.m.Input({
			enabled: true,
			value: "{editPatient>/id}",
		});

		var ip_Name = new sap.m.Input({
			value: "{editPatient>/name}",
		});

		var ip_DOB = new sap.m.DatePicker({
			value: "{editPatient>/dob}",
			valueFormat: "dd/MM/yyyy",
			displayFormat: "dd/MM/yyyy"
		});

		var ip_Desig = new sap.m.Input({
			value: "{editPatient>/designation}",

		});

		var ip_Gender = new sap.m.Input({
			value: "{editPatient>/gender}",

		});

		var lb_PatId = new sap.m.Label({
			text: "Id",
			labelFor: "ip_PatId"
		});

		var lb_Name = new sap.m.Label({
			text: "Name",
			labelFor: "ip_Name"
		});
		var lb_DOB = new sap.m.Label({
			text: "DOB",
			labelFor: "ip_DOB"
		});
		var lb_Desig = new sap.m.Label({
			text: "Designation",
			labelFor: "ip_Desig"
		});
		var lb_Gender = new sap.m.Label({
			text: "Gender",
			labelFor: "ip_Gender"
		});

		var Pat_Form = new sap.ui.layout.form.SimpleForm({
			editable: true,
			layout: "ResponsiveGridLayout",
			width: "100%",
			content: [new sap.ui.core.Title({
					text: "Update/Delete Patient Data"
				}),
				lb_PatId, ip_PatId, lb_Name, ip_Name, lb_DOB, ip_DOB, lb_Desig, ip_Desig, lb_Gender, ip_Gender

			]
		});

		that._Dialog = new sap.m.Dialog({
			title: "Patient",
			content: [Pat_Form],
			buttons: [

				new sap.m.Button({
					text: "Update",
					press: that.handlebtn_Save
				}),
				new sap.m.Button({
					text: "Delete",
					press: that.handlebtn_Delete
				}),
				new sap.m.Button({
					text: "Cancel",
					press: that.handleOperationBtncls
				})
			]

		});

		that._Dialog.setModel(editPatient, "editPatient");
		//  }

		that._Dialog.open();

	},

	getData: function(idDoctor) {

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
		var oTable = sap.ui.getCore().byId(that.getView().sId + "--tbl_odata");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");

	},

	onConsultations: function(e) {
		var _sPath = e.getSource().getParent().getBindingContext().sPath;
		var oObject = e.getSource().getModel().getProperty(_sPath);
		that.getOwnerComponent().getRouter()
			.navTo("Details", {
				Id: oObject.id,
				Name: oObject.name,
				Designation: oObject.designation,
				Gender: oObject.gender,
				idDoctor: that._idDoctor
			});
		//console.log(e);
	},

	onCreateConsultations: function() {
		that.getOwnerComponent().getRouter()
			.navTo("CreateConsultations", {
				"idDoctor": that._idDoctor
			});
	},

	onNavButtonPress: function() {
		that.getOwnerComponent().getRouter()
			.navTo("LoginPage");
	}

});