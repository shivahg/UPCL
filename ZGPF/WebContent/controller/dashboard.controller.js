sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZGPF.ZGPF.controller.dashboard", {
		onInit: function () {
			
				   
					
					   
				     
					   var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
						  
						    oRouter.getRoute("dashboard").attachPatternMatched(this.onObjectMatched, this);
			    		  
					this.getBackenddata();
			
		},
		onObjectMatched:function(evt){
			
			var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_REQUEST_SRV/");
		       var t=this;
		       	   gpfservice.read("/GPFSet",{
					   success:function(odata){
						
						   
					     
							 for(var i=0;i<odata.results.length;i++){
								  var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd-MM-yyyy"});
				                	var d = frmt.format(new Date(odata.results[i].Cdate));
								    odata.results[i].Cdate=d;
								
						delete odata.results[i].__metadata;
						
					}
		           
								
							   var dashboard=new sap.ui.model.json.JSONModel();
							    dashboard.setData(odata.results);
							    t.getView().setModel(dashboard,"dashboard");
							    
							 
				    		  
						
					   },
					   error:function(error){
						   var message=error;
							var msg=$(error.response.body).find('message').first().text();
							var action="OK";
							MessageBox.error(msg,{
								
								onClose:function(){
									if(action==="OK"){
								
									}
								}
							});
					   }
				   });
		       	  
		},
		getBackenddata:function(){
			var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_REQUEST_SRV/");
		       var t=this;
		       	   gpfservice.read("/GPFSet",{
					   success:function(odata){
						
						   
					     
							 for(var i=0;i<odata.results.length;i++){
								  var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd-MM-yyyy"});
				                	var d = frmt.format(new Date(odata.results[i].Cdate));
								    odata.results[i].Cdate=d;
								
						delete odata.results[i].__metadata;
						
					}
		           
								
							   var dashboard=new sap.ui.model.json.JSONModel();
							    dashboard.setData(odata.results);
							    t.getView().setModel(dashboard,"dashboard");
							    
							 
				    		  
						
					   },
					   error:function(error){
						   var message=error;
							var msg=$(error.response.body).find('message').first().text();
							var action="OK";
							MessageBox.error(msg,{
								
								onClose:function(){
									if(action==="OK"){
									
									}
								}
							});
					   }
				   });
		       	  
			
		},
		Contribution:function(evt){
			 var router=this.getOwnerComponent().getRouter();
				router.navTo("contribution",{s1:"C"});
		},
		Advance:function(evt){
			var router=this.getOwnerComponent().getRouter();
				router.navTo("contribution",{s1:"A"});
		},
		reqnopress:function(evt){
			var reqnumber=evt.oSource.mProperties.text;
			var router=this.getOwnerComponent().getRouter();
			router.navTo("contribution",{s1:reqnumber});
		},
		onSearch:function(oEvent){
			var sQuery = oEvent.getParameter("query");
			if(oEvent.getId() == "liveChange"){
				sQuery = oEvent.getParameter("newValue");
			}
			var oFilter1=new sap.ui.model.Filter("Zreqno","Contains",sQuery);
			var oFilter2=new sap.ui.model.Filter("Cdate","Contains",sQuery);
			var oFilter3=new sap.ui.model.Filter("Zreqty","Contains",sQuery);
			var oFilter4=new sap.ui.model.Filter("ReqAmt","Contains",sQuery);
			var oFilter5=new sap.ui.model.Filter("Status","Contains",sQuery);
			
			var aFilters=new sap.ui.model.Filter([oFilter1,oFilter2,oFilter3,oFilter4,oFilter5]);
			var oTable=this.getView().byId("dashboard");
			var oBinding=oTable.getBinding("items");
			if(oBinding){
				oBinding.filter([aFilters]);
			}
		}
	});
});