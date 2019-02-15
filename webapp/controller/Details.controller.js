sap.ui.controller("com.bsilva.app.controller.Details", {

	onInit: function () {

		that = this;
		that.getOwnerComponent().getRouter().getRoute("Details").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function (evt) {

		that._id = evt.getParameter("arguments").Id;
		that._idDoctor = evt.getParameter("arguments").idDoctor;
		that.getData(that._id);

	},

	getData: function (_id) {

		var oModel = new sap.ui.model.json.JSONModel();

		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/getConsultationById/" + _id,
			dataType: "json",
			async: false,
			success: function (data, textStatus, jqXHR) {
				oModel.setData({
					modelData: data
				});
			}
		});

		sap.ui.getCore().setModel(oModel, 'model_cons');
		var oTable = sap.ui.getCore().byId(that.getView().sId + "--tbl_cons");
		//var oTable = that.getView().byId("tbl_cons");
		oTable.setModel(oModel);
		oTable.bindRows("/modelData");

	},

	onNavButtonPress: function () {
		var oAuth = that.getOwnerComponent().getModel("login");
		var name = oAuth.getData()[0].name;

		that.getOwnerComponent().getRouter()
			.navTo("LandingPage", {
				Name: name,
				Id: that._idDoctor
			});
	},

	onDeleteConsultation: function (e) {

		var _sPath = e.getSource().getParent().getBindingContext().sPath;
		var oObject = e.getSource().getModel().getProperty(_sPath);
		that._idToDelete = oObject._id;
		if (!that._warningDialog) {
			that._warningDialog = new sap.m.Dialog({
				title: 'Warning',
				type: 'Message',
				state: 'Warning',
				content: new sap.m.Text({
					text: 'Are you sure you want to delete the consultation?'
				}),
				beginButton: new sap.m.Button({
					text: 'OK',
					press: function () {
						that._onDelete(that._idToDelete);
						that._warningDialog.close();
					}
				}),
				afterClose: function () {
					//that._warningDialog.destroy();
				}
			});
		}

		that._warningDialog.open();

	},

	_onDelete: function (id) {

		jQuery.ajax({
			url: "/deleteConsultationById/" + id,
			type: "DELETE",
			dataType: "json",
			success: function (response, status) {

			}
		});

		that.getData(that._id);

	},

	onEditConsultations: function (e) {
		var _sPath = e.getSource().getParent().getBindingContext().sPath;
		var oObject = e.getSource().getModel().getProperty(_sPath);

		var editConsModel = new sap.ui.model.json.JSONModel();
		editConsModel.setData(oObject);

		var ip_PatId = new sap.m.Input({
			enabled: true,
			value: "{editConsModel>/idPat}",
			enabled: false
		});

		var ip_PatName = new sap.m.Input({
			value: "{editConsModel>/namePat}",
			enabled: false
		});

		var ip_Spec = new sap.m.Input({
			value: "{editConsModel>/speciality}",
		});

		var ip_Date = new sap.m.DatePicker({
			value: "{editConsModel>/date}",

		});

		var ip_Time = new sap.m.TimePicker({
			value: "{editConsModel>/time}",

		});

		var ip_Obs = new sap.m.TextArea({
			value: "{editConsModel>/observations}",

		});

		var lb_PatId = new sap.m.Label({
			text: "Patient Id",
			labelFor: "ip_PatId"
		});

		var lb_PatName = new sap.m.Label({
			text: "Patient Name",
			labelFor: "ip_PatName"
		});
		var lb_Spec = new sap.m.Label({
			text: "Spetiality",
			labelFor: "ip_Spec"
		});
		var lb_Date = new sap.m.Label({
			text: "Date",
			labelFor: "ip_Date"
		});
		var lb_Time = new sap.m.Label({
			text: "Time",
			labelFor: "ip_Time"
		});

		var lb_Obs = new sap.m.Label({
			text: "Observations",
			labelFor: "ip_Obs"
		});

		var Cons_Form = new sap.ui.layout.form.SimpleForm({
			editable: true,
			layout: "ResponsiveGridLayout",
			width: "100%",
			content: [new sap.ui.core.Title({
				text: "Update/Delete Consultation Data"
			}),
				lb_PatId, ip_PatId, lb_PatName, ip_PatName, lb_Time, ip_Time, lb_Date, ip_Date, lb_Spec, ip_Spec, lb_Obs, ip_Obs

			]
		});

		//lb_PatId, ip_PatId, lb_PatName, ip_PatName, lb_Time, ip_Time, lb_Date, ip_Date, lb_Spec, ip_Spec,  lb_Obs, ip_Obs
		//Cons_Form

		that._EditDialog = new sap.m.Dialog({
			title: 'Consultation',
			content: [Cons_Form],
			beginButton: new sap.m.Button({
				text: 'Update',
				press: function () {
					that.handlebtn_Save()
					that._EditDialog.close();
				}
			}),
			endButton: new sap.m.Button({
				text: 'Cancel',
				press: function () {
					that._EditDialog.close();
				}
			})
		});

		that._EditDialog.setModel(editConsModel, "editConsModel");

		that._EditDialog.open();

	},

	handlebtn_Save: function () {

		var consData = that._EditDialog.getModel("editConsModel").getData();;
		var url = "/UpdateConsultationById/" + consData._id;

		jQuery.ajax({
			url: url,
			type: "PUT",
			dataType: "json",
			data: consData,
			success: function (response, status) {
				//console.log(response);
			}
		});

		that.getData(that._id);
		that._EditDialog.close();

	}

});