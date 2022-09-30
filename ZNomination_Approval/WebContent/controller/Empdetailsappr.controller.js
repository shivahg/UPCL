sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ZANOC.zemployeeapprovenoc.controller.Empdetailsappr", {
			onInit: function () {

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
