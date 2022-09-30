sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ZENOC.zemployeenoc.controller.Navigation", {
			onInit: function () {
		/* var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData({
					"SideNavigation": false,
					"profileEdit": false,
					"User":{}
				});
				sap.ui.getCore().setModel(oModel,"settings");
				this.getView().setModel(oModel, "settings");*/
				
				var navdashboard=this.getOwnerComponent().getRouter();
				navdashboard.navTo("Dashboard");
            },
            menuButtonPress: function () {
			var oSettings = this.getView().getModel("settings");
			var expanded = oSettings.getProperty("/SideNavigation");
			if (expanded) {
				oSettings.setProperty("/SideNavigation", false);
			} else {
				oSettings.setProperty("/SideNavigation", true);
			}
        },
    navtoDashboard:function(evt){
    var navdashboard=this.getOwnerComponent().getRouter();
				navdashboard.navTo("Dashboard");
    },
            
		});
	});
