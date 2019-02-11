sap.ui.controller("com.bsilva.app.controller.RegisterPage", {

	onInit: function() {
		
		that = this;
		that.getOwnerComponent().getRouter().getRoute("RegisterPage").attachPatternMatched(that._onObjectMatched, that);

	},

	_onObjectMatched: function(evt) {

		var newDoctor = new sap.ui.model.json.JSONModel();
		newDoctor.setDefaultBindingMode("TwoWay");
		that.getView().setModel(newDoctor, "newDoctor");
		that._getLastId();

	},

	_getLastId: function(){
		
		var patdata;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/getLastDoctor" ,
			dataType: "json",
			async: false,
			success: function(data, textStatus, jqXHR) {
				patdata = data;
			}
		});

		console.log(patdata);

		var newDoctor = that.getView().getModel("newDoctor");
		newDoctor.setData({
			id:  parseInt(patdata.id) + 1,
			name: "",
			password: "",
			email: "",
		});
		

	},

	onRegister: function() {
		/*var docData = {
			"name": that.getView().byId('ipr_name').getValue(),
			"password": that.getView().byId('ipr_password').getValue(),
			"email": that.getView().byId('ipr_email').getValue()
		};*/

		var newDoctor = that.getView().getModel("newDoctor");
		var docData = newDoctor.getData(); 

		var aData = jQuery.ajax({
			type: "POST",
			url: "/PostNewDoctor",
			dataType: "json",
			data: docData,
			async: false,
			success: function(response, status) {
				//console.log(response + status);

			}
		});
		that.getOwnerComponent().getRouter()
			.navTo("Login");

	},

	onNavButtonPress: function() {
		that.getOwnerComponent().getRouter()
			.navTo("LoginPage");
	}

});