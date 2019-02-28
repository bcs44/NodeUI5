sap.ui.controller("com.bsilva.app.controller.Login", {

	onInit: function () {
		that = this;
	},

	onLogin: function () {

		that = this;
		var oAuth = that.getOwnerComponent().getModel("login");
		oAuth.refresh(false);

		var docData = oAuth.getData();

		var x;
		var aData = jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: "/doctorLogin/" + docData.email + "/" + docData.password,
			dataType: "json",
			async: false,
			success: function (data, textStatus, jqXHR) {
				x = data;
				if (x.length > 0) {
					that.getOwnerComponent().getRouter()
						.navTo("LandingPage", {
							Name: data[0].name,
							Id: data[0].id
						});
				}

			}
		});

		oAuth.setData(x);
		oAuth.refresh(false);

	},

	onRegister: function () {
		that.getOwnerComponent().getRouter()
			.navTo("RegisterPage", {
				"edit": "false",
				"idDoctor": "null"
			});
	}

});