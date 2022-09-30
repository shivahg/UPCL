sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZPMS.ZPMS.view.detail
		 */
		onInit: function () {
			var perpath=jQuery.sap.getModulePath("ZPMS.ZPMS");
		       var img=new sap.ui.model.json.JSONModel(perpath);
		       this.getView().setModel(img,"img");

		},
		backpage:function(){
			var router=this.getOwnerComponent().getRouter();
			router.navTo("Dashboards");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZPMS.ZPMS.view.detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZPMS.ZPMS.view.detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZPMS.ZPMS.view.detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});