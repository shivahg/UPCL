sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZGPFA.ZGPFA.controller.dashboard", {
		onInit: function () {
			 var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
			  
			    oRouter.getRoute("dashboard").attachPatternMatched(this.onObjectMatched, this);
 		  
		this.getBackenddata();
			
		},
		onObjectMatched:function(){
			var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_APPROVAL_SRV/");
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
						   var s=(error.response.statusCode).toString();
						   new sap.m.MessageBox.error("'"+s+"' Status Error ");
					   }
				   });
			
		},
		getBackenddata:function(){
			var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_APPROVAL_SRV/");
		       var t=this;
		       	   gpfservice.read("/GPFSet",{
					   success:function(odata){
						
						   
					     
							 for(var i=0;i<odata.results.length;i++){
								  var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd-MM-yyyy"});
				                	var d = frmt.format(new Date(odata.results[i].Cdate));
								    odata.results[i].Cdate=d;
								delete odata.results[i].__metadata;
								
								if(odata.results[i].Onlydisplay===""){
									odata.results[i].Onlydisplay=" ";
								}
					}
		           
								
							   var dashboard=new sap.ui.model.json.JSONModel();
							    dashboard.setData(odata.results);
							    t.getView().setModel(dashboard,"dashboard");
							  
			    			   
				    		  
						
					   },
					   error:function(error){
						   var s=(error.response.statusCode).toString();
						   new sap.m.MessageBox.error("'"+s+"' Status Error ");
					   }
				   });
			
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
		},
		dashboardfilter:function(evt){
			
			var data={
			    	 'data':[
			       		{
			       			"type":"Open Requset",
			       			
			       			},{
			       			"type":"Close Request",
			       			
			       			}]
		 };
		 
		 var model1=new sap.ui.model.json.JSONModel();
		 model1.setData(data);
		 this.getView().setModel(model1);
			
			
			
			
          var t=this;
			
			
			var dialog=new sap.m.Dialog({
				title:"Requests",
				content:[
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: '/data',template: new sap.m.StandardListItem({
							title:"{type}",type: "Active"}),},
						itemPress: function (oevt) {
							t.getView().getModel("dashboard").getData();
							var text = oevt.getParameter("listItem").getProperty("title");
							
							var data=t.getView().getModel("dashboard").getData();
							
							
							var filt=[];
							
                            
                            

                            
                            	if(text==="Close Request"){
                            		var sQuery ="X";
                      			}
                            	
                            	else if(text==="Open Requset"){
                            		var sQuery =" ";
                            		
                            	}
                                  
                            	var oFilter1=new sap.ui.model.Filter("Onlydisplay","Contains",sQuery);
                        		var aFilters=new sap.ui.model.Filter([oFilter1]);
                    			var oTable=t.getView().byId("dashboard");
                    			var oBinding=oTable.getBinding("items");
                    			if(oBinding){
                    				oBinding.filter([aFilters]);
                    			}
							
                           
                        	
							
                        	
							
							dialog.close();}})
				
				
				],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
		}
	});
});