sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/bsilva/app/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.bsilva.app.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setDefaultBindingMode("TwoWay");
			oModel.setData({
				user: "",
				password: "",
				name: "",
				isLogged: false
			});
			this.setModel(oModel, "login");

		},

		createContent: function() {

			var appView = new sap.ui.view('idappView', {
				id: 'idappView',
				viewName: 'com.bsilva.app.view.App',
				type: sap.ui.core.mvc.ViewType.XML
			});

			return appView;
		}

	});

});