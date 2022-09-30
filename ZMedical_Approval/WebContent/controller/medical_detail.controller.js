sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("Zmedical_Approval.Zmedical_Approval.controller.medical_detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Zmedical_Approval.Zmedical_Approval.view.emp_medical_form
		 */
		onInit: function () {
			var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.getRoute("medical_detail").attachPatternMatched(this.onObjectMatched,this);
  	
      
},

onObjectMatched:function(evt){
	
	sap.ui.core.BusyIndicator.show();
	
 this.value= evt.getParameter("arguments").reqno;
 
 this.md=evt.getParameter("arguments").md;
 
 

 
	  var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_APPROVAL_SRV/");
		var t = this;
		medicalservice.read("/medicalSet('"+this.value+"')", {
			success: function (odata) {
	             var data=[];
				delete odata.__metadata;
				var frmt = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "yyyy-MM-dd"
				});
				var d = frmt.format(new Date(odata.Cdate));
	             odata.Cdate=new Date(d);
	             if(odata.Zreqtyp==="1"){
	            	 odata.Esthospdate=frmt.format(new Date(odata.Esthospdate));
		             odata.Esthospdate=new Date(odata.Esthospdate);
	             }
	             else if((odata.Zreqtyp==="2")||(odata.Zreqtyp==="3")){
	            	    odata.Doadmin=frmt.format(new Date(odata.Doadmin));
		             odata.Doadmin=new Date(odata.Doadmin);
		             odata.Dodisch=frmt.format(new Date(odata.Dodisch));
		             odata.Dodisch=new Date(odata.Dodisch); 
	             }
	         
	             
	             
	             data.push(odata);
				var medicalmodel = new sap.ui.model.json.JSONModel();
				medicalmodel.setData(data);
				t.getView().setModel(medicalmodel, "medicalmodel");
				
				sap.ui.core.BusyIndicator.hide();

			},
			error: function (error) {
				sap.ui.core.BusyIndicator.hide();
				var message = error;
				var msg = $(error.response.body).find('message').first().text();
				var action = "OK";
				new sap.m.MessageBox.error(msg, {

					onClose: function () {
						if (action === "OK") {

						}
					}
				});
			}
		});
 
},

backpage:function(evt){
	
	var router = this.getOwnerComponent().getRouter();
	router.navTo("emp_medical_form", {
		obj: this.md,
	obj2:"D"});
}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Zmedical_Approval.Zmedical_Approval.view.emp_medical_form
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Zmedical_Approval.Zmedical_Approval.view.emp_medical_form
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Zmedical_Approval.Zmedical_Approval.view.emp_medical_form
		 */
		//	onExit: function() {
		//
		//	}

	});

});