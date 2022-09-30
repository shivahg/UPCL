sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ZENOC.zemployeenoc.controller.Dashboard", {
			onInit: function () {
             this.key_value;
				
				
				this.Nominationservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_NOMINATION_SRV/");
				this.Nominationservice1 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_NOMINATION_APP_SRV");
				
				this.nominationheaderdata=new sap.ui.model.json.JSONModel();
				
					var oRouter = new sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Dashboard").attachPatternMatched(this.onObjectMatched, this);
			
            },
            
            onObjectMatched:function(evt){
           
            this.getView().byId("Menu").fireSelectionChange();
            
            },
            
           
            authorities_select:function(k){
            debugger;
            this.key_value = k.getSource().getSelectedKey();
            switch(this.key_value){
            case 'A' :
            this.getData(this.Nominationservice1);
            break;
            case 'C':
            this.getData(this.Nominationservice);
            break;
            }
            },
            getData : function(service){
            
             var t=this;
            service.read("nomi_headSet",{
            success:function(odata){
            if(t.key_value==="C"){
            odata.ReqType="E"
           
            }
            for(var i=0;i<odata.results.length;i++){
            odata.results[i].Cdate=new Date(odata.results[i].Cdate);
            }
             t.nominationheaderdata.setData(odata);
            t.getView().setModel(t.nominationheaderdata,"Nominationheaderdata");
            
            
            
            },
            error:function(response){
            var message = response;
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
            
            categoryColor:function(category){
            
            switch (category) {
					case "BNGR":
						return 7;
					case "BNPF":
						return 2;
					case "BNPN":
						return 3;
						case "Z001":
						return 4;
						case "Z002":
						return 9;
						
						default:return 0;
						
				}
            
            },
            
            statusColor:function(status){
            switch (status) {
					case "Pending for approval":
						return 1;
					case "Approved":
						return 6;
					case "Rejected":
					return 3;
					case "in Draft":
						return 8;
						
				}
            },
           statusIcon:function(status){
        
           switch (status) {
					case "Pending for approval":
						return "sap-icon://pending";
					case "Approved":
						return "sap-icon://accept";
					case "Rejected":
					return "sap-icon://decline";
						case "in Draft":
					return "sap-icon://save";
				}
           
           },
           statusIconcolor:function(status){
          
           switch (status) {
					case "Pending for approval":
						return "#000000";
					case "Approved":
						return "#0000FF";
					case "Rejected":
					return "#FF0000";
						case "in Draft":
					return "#52BE80";
				}
           },
        onrequest:function(evt){
           try{
			var zreqno=evt.oSource.mProperties.text;
			 var router=this.getOwnerComponent().getRouter();
                    router.navTo("Empdetails",{reqno:zreqno,param:this.key_value});
				var oSettings = this.getView().getModel("settings");
				

			}catch(e){
				console.log(e);
			}	
        },
        create_req:function(){
        try{
        var router=this.getOwnerComponent().getRouter();
        router.navTo("Empdetails",{reqno:"99999999",param:this.key_value});
        }catch(e){
        console.log(e);
        }
        
        },
            onSearch:function(evt){
	       var sQuery = evt.oSource.mProperties.value;
			
			var oFilter1=new sap.ui.model.Filter("Zreqno","Contains",sQuery);
		    var oFilter2=new sap.ui.model.Filter("Rtext","Contains",sQuery);
			var oFilter3=new sap.ui.model.Filter("Status","Contains",sQuery);
			
		
			
			var aFilters=new sap.ui.model.Filter([oFilter1,oFilter2,oFilter3]);
			var oTable=this.getView().byId("idtable1");
			var oBinding=oTable.getBinding("items");
			if(oBinding){
				oBinding.filter([aFilters]);
			}
	       }
		});
	});
