sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Zmedical_Approval.Zmedical_Approval.controller.dashboard", {
		onInit: function () {
			var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("dashboard").attachPatternMatched(this.onObjectMatched, this);

			this.getBackenddata();
		},
		onObjectMatched: function (evt) {
		
			this.getBackenddata();

				

		},
		getBackenddata: function () {
			var gpfservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_APPROVAL_SRV/");
			var t = this;
			gpfservice.read("/medicalSet", {
				success: function (odata) {
					 
                  
                      

					for (var i = 0; i < odata.results.length; i++) {
							delete odata.results[i].__metadata;
						var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern: "dd-MM-yyyy"});
						var d = frmt.format(new Date(odata.results[i].Cdate));
						odata.results[i].Cdate =d;

					

					}

					var dashboard = new sap.ui.model.json.JSONModel();
					dashboard.setData(odata.results);
					t.getView().setModel(dashboard, "dashboard");

				},
				error: function (error) {
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
		onSearch:function(oEvent){
			var sQuery = oEvent.getParameter("query");
			if(oEvent.getId() == "liveChange"){
				sQuery = oEvent.getParameter("newValue");
			}
			var oFilter1=new sap.ui.model.Filter("Zreqno","Contains",sQuery);
			var oFilter2=new sap.ui.model.Filter("Cdate","Contains",sQuery);
			var oFilter3=new sap.ui.model.Filter("Zreqty","Contains",sQuery);
			
			var oFilter5=new sap.ui.model.Filter("Status","Contains",sQuery);
			
			var aFilters=new sap.ui.model.Filter([oFilter1,oFilter2,oFilter3,oFilter5]);
			var oTable=this.getView().byId("dashboard");
			var oBinding=oTable.getBinding("items");
			if(oBinding){
				oBinding.filter([aFilters]);
			}
		},
		
		reqnopress:function(evt){
			var reqno=evt.oSource.mProperties.text;
			var router = this.getOwnerComponent().getRouter();
			router.navTo("emp_medical_form", {
				obj: reqno,
			obj2:"D"});
		},
		MedicalAdvance: function (evt) {
			var router = this.getOwnerComponent().getRouter();
			router.navTo("emp_medical_form", {obj: "1",obj2:"C"});
		}
	});
});