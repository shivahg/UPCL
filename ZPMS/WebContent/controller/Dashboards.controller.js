sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.Dashboards", {
		onInit: function () {
		debugger;
		var t=this;
		t.role;
		
		
		t.pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZPMS_FIORI_APP_SRV/");
			
		 var obj={
					
					pmsdetails:[],
					AppreciationHonours:[{}],
					pms_acrSet: [{}],
                 pms_caseSet:[{}],
                 pms_honoursSet:[{}],
                 pms_kpiSet: [{}],
                 pms_leavesSet:[{}],
                 pms_perappSet:[{}],
                 pms_s3c1Set: [{}],
                 pms_s3c2Set:[{}],
                 pms_trainingSet:[{}]
					
			};
			this.pmsmodel1=new sap.ui.model.json.JSONModel(obj);
			this.getView().setModel(this.pmsmodel1,"pmsmodel");
          
          var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
		  
		    oRouter.getRoute("Dashboards").attachPatternMatched(this.onObjectMatched, this);
		},
		onObjectMatched:function(evt){
			debugger;
			this.role;
			
			
			this.getView().byId("idIconTabBar").fireSelect();
		},
		employeedetails:function(evt){
			var t=this;
			var apid=evt.oSource.mProperties.text
				var oRouter = t.getOwnerComponent().getRouter();
			oRouter.navTo("master",{key:t.key,Apid:apid});
			
		},
	      
		employeedetailsflag:function(evt){
			var path=evt.getSource().oPropagatedProperties.oBindingContexts.dashboard.sPath.slice(1)
			
			var apid=this.getView().getModel("dashboard").getData()[path].ZzappraisalId;
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("master",{key:this.key,Apid:apid});
		},
		
		
		register:function(evt){
	    	   var t=this;
			var oRouter = t.getOwnerComponent().getRouter();
			oRouter.navTo("master",{key:t.key});
		
	},
	       pmsdashboard:function(evt){
	    	   debugger;
	    	   var t=this;
	    	   t.getView().byId("of").setVisible(false);
			    t.getView().byId("dashboard").setVisible(false);
	    	   t.role=evt.getSource().getSelectedKey();
	    	   t.key=t.role;
	    	    
	    	  if(t.key!==""){
	    	  
	    	   t.pmsservice.read("/ZHCM_EMPLOYEE_VIEWSet()?$filter=(Zzrole eq '"+t.key+"')",{
				   success:function(odata){
					
							for(var i=0;i<odata.results.length;i++){
								  var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd/MM/yyyy"});
					              odata.results[i].Begda = frmt.format(new Date(odata.results[i].Begda));
					              odata.results[i].Endda = frmt.format(new Date(odata.results[i].Endda));

							   	}
						   var dashboard=new sap.ui.model.json.JSONModel();
						    dashboard.setData(odata.results);
						    t.getView().setModel(dashboard,"dashboard");
						    t.getView().byId("of").setVisible(true);
						    t.getView().byId("dashboard").setVisible(true);
						   
		    			  
			    		  
					
				   },
				   error:function(error){
					   var s=(error.response.statusCode).toString();
					   new sap.m.MessageBox.error("'"+s+"' Status Error ");
				   }
			   });
	    	 
	    	  }
	       } ,
	       statusColor:function(status){
	       
	                switch (status) {
					case "Self-appraisal by Employee":
						return 1;
					case "APPRAISAL BY REPORTING OFFICER":
						return 7;
					case "Review and Confirmation by Director(HR)":
						return 3;
					
					
				}
				
			
			
			
			
			
				
	       },
	       statustext:function(status){
	       return status;
	       },
	       
		
		statusIcon:function(evt){
	       return "sap-icon://badge";
	       },
	       onSearch:function(evt){
	       var sQuery = evt.oSource.mProperties.value;
			
			var oFilter1=new sap.ui.model.Filter("ZzappraisalId","Contains",sQuery);
			var oFilter2=new sap.ui.model.Filter("Pernr","Contains",sQuery);
			var oFilter3=new sap.ui.model.Filter("Ename","Contains",sQuery);
			
			var oFilter5=new sap.ui.model.Filter("Status","Contains",sQuery);
			
			var aFilters=new sap.ui.model.Filter([oFilter1,oFilter2,oFilter3,oFilter5]);
			var oTable=this.getView().byId("dashboard");
			var oBinding=oTable.getBinding();
			if(oBinding){
				oBinding.filter([aFilters]);
			}
	       },
	       onPress:function(evt){
	       var action=evt.oSource.mProperties.text;
	       switch(action){
	       
	       case "Edit":this.action("E");
	       break;
	       case "Only Display":this.action("O");
	       break;
	       }
	       
	      
	       
	       },
	       action:function(v){
	      
	      
	        
	        if(v === "E"){
	       var query=new sap.ui.model.Filter("Zzdisplay","Contains","");
	        }
	        else if(v === "O"){
	        	var query=new sap.ui.model.Filter("Zzdisplay","Contains","X");
	        }
	       var aFilters=new sap.ui.model.Filter([query]);
			var oTable=this.getView().byId("dashboard");
			var oBinding=oTable.getBinding();
			if(oBinding){
				oBinding.filter([aFilters]);
			}
	       },
	       onBeforeRendering: function() {

		},
		onAfterRendering: function() {
	
			},
			onExit: function() {
		
			},
			
	});
});