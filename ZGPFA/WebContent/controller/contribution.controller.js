sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZGPFA.ZGPFA.controller.contribution", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZGPF.ZGPF.view.contribution
		 */
		onInit: function () {
          var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
	          oRouter.getRoute("contribution").attachPatternMatched(this.onObjectMatched,this);
	          var data={
	        	    	 'reqtype1':[
	        	       		{
	        	       			"type":"Refundable"
	        	       			},{
	        	       			"type":"Non-Refundable"
	        	       			}]
	          }
	          
	          var model1=new sap.ui.model.json.JSONModel();
	          model1.setData(data);
	          this.getView().setModel(model1);
		},
		onObjectMatched:function(evt){
			sap.ui.core.BusyIndicator.show();
       var value= evt.getParameter("arguments").s1;
       
    	   var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_APPROVAL_SRV/");
	       var t=this;
	       	   gpfservice.read("/GPFSet('"+value+"')",{
				   success:function(odata){
					var data;var array=[];
					
					var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
					odata.Begda = frmt.format(new Date(odata.Begda));
					odata.Endda = frmt.format(new Date(odata.Endda));
					array.push(odata);
			   for(var i=0;i<array.length;i++){
					delete array[i].__metadata;
					
				}
			            odata=array;
			    		  
			    		  var gpfmodel=new sap.ui.model.json.JSONModel();
						    gpfmodel.setData(odata);
						    t.getView().setModel(gpfmodel,"gpfmodel");
						    sap.ui.core.BusyIndicator.hide();
				   },
				   error:function(error){
					   sap.ui.core.BusyIndicator.hide();
					   var s=(error.response.statusCode).toString();
					   new sap.m.MessageBox.error("'"+s+"' Status Error ");
				   }
			   });
       
      /* else if(value==="C"){
       	 this.getView().byId("adv").setVisible(false);
       	var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_REQUEST_SRV/");
	       var t=this;
	       	   gpfservice.read("/GPFSet('1')",{
				   success:function(odata){
					var data;var array=[];
					
					array.push(odata);
			   for(var i=0;i<array.length;i++){
					delete array[i].__metadata;
					
				}
			            odata=array;
			    		  
			    		  var gpfmodel=new sap.ui.model.json.JSONModel();
						    gpfmodel.setData(odata);
						    t.getView().setModel(gpfmodel,"gpfmodel");
				   },
				   error:function(error){
					   var s=(error.response.statusCode).toString();
					   new sap.m.MessageBox.error("'"+s+"' Status Error ");
				   }
			   });
    	
		
	
  
       
       }else if(value==="A"){
       this.getView().byId("adv").setVisible(true);
		}*/
		},
		backpage:function(evt){
				var router=this.getOwnerComponent().getRouter();
				router.navTo("dashboard");
		},
		
		lastlevel:function(evt){
			var select=evt.mParameters.selected;
			
			if(select===true){
				this.getView().byId("nla").setValue(null);
				this.getView().byId("nla").setVisible(false);
				this.getView().byId("pa").setVisible(true);
				
			}
			else if(select===false){
				this.getView().byId("nla").setVisible(true);
				this.getView().byId("pa").setVisible(false);
				
			}
			
		},
		nextlevelapprovers:function(evt){
			
           var t=this;
			
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_APPROVAL_SRV/");
			changetype.read("/emp_viewSet",{
				success:function(odata){
					var arr=[],obj={};
					var Pernr=odata.results;
					for(var i=0;i<Pernr.length;i++){
						obj.Pernr=Pernr[i].Pernr;
						obj.Ename=Pernr[i].Ename;
						obj.Postx=Pernr[i].Postx;
						obj.Orgtx=Pernr[i].Orgtx;
						arr.push(obj);
						obj={};}
				var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"empset");
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Next Level Approvers",
				content:[new sap.m.SearchField({liveChange:function(evt){
								var filt=[];
								var a=evt.mParameters.newValue;
	                            var binding=t.l.getBinding("items");
	                            if(a&&a.length>0){
	                            var filter=new sap.ui.model.Filter("Ename", sap.ui.model.FilterOperator.Contains, a);
	                            filt.push(filter);
	                            }binding.filter(filt);
                                 }}),
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: 'empset>/',template: new sap.m.StandardListItem({title:"{empset>Pernr}",description:"{empset>Postx},{empset>Orgtx}",info:"{empset>Ename}",type: "Active"}),},
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("title");
							
							t.getView().byId("nla").setValue(value);
							
							
							dialog.close();}})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
		},
		handlevalidation:function(action){
			var level=this.getView().getModel("gpfmodel").getData()[0].Level;
			
			var ll=this.getView().byId("ll").getSelected();
			
			
			if((this.getView().byId("sa").getValue()==="")){
				new sap.m.MessageBox.warning("Please Fill Sanction Amount");
			}
			else if((this.getView().byId("A1").getValue()==="")){
				new sap.m.MessageBox.warning("Please Fill Approval Comments");
			}
			else if((this.getView().byId("nla").getValue()==="")&&(ll===false)){
				new sap.m.MessageBox.warning("Please Fill Next Level Approvers");
			}
			else if((this.getView().byId("pa").getValue()==="")&&(ll===true)){
				new sap.m.MessageBox.warning("Please Fill Paid Amount");
			}
			
			else if(action === "A"){
				this.sendbackenddata("A");
			}
			else if(action === "R"){
				this.sendbackenddata("R");
			}
			else if(action === "B"){
				this.sendbackenddata("B");
			}
		},
		
		
		sendbackenddata:function(action){
			
            var startdate=(this.getView().byId("sd").getValue());
			
			if((startdate==="")||(startdate===null)){
				startdate=null;
			}
			else {
			var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
			var startdate=frmt.format(new Date(startdate));
			startdate=new Date(startdate);
			startdate= new Date(startdate.setHours("00","00","00","00"));
	       startdate = new Date(startdate.getTime() + startdate.getTimezoneOffset() * (-60000));
	       this.getView().getModel("gpfmodel").getData()[0].Begda=startdate;
			}

			var enddate=(this.getView().byId("ed").getValue());
		       
		       if((enddate==="")||(enddate===null)){
		    	   enddate=null;
				}
		       else{
		       	var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
				var enddate=frmt.format(new Date(enddate));
				enddate=new Date(enddate);
				enddate= new Date(enddate.setHours("00","00","00","00"));
		      enddate= new Date(enddate.getTime() + enddate.getTimezoneOffset() * (-60000));
		      this.getView().getModel("gpfmodel").getData()[0].Endda=enddate;
		       }
			var cdate=new Date(this.getView().getModel("gpfmodel").getData()[0].Cdate);
			cdate= new Date(cdate.setHours("00","00","00","00"));
		      cdate= new Date(cdate.getTime() + enddate.getTimezoneOffset() * (-60000));
		      this.getView().getModel("gpfmodel").getData()[0].Cdate=cdate;
		      
			var gpfdetails={
       	    		A1Comm: this.getView().byId("A1").getValue(),
       	   
       		A2Comm: this.getView().byId("A2").getValue(),
       		Action: action,
       		Begda: this.getView().getModel("gpfmodel").getData()[0].Begda,
       		Cdate: (this.getView().getModel("gpfmodel").getData()[0].Cdate),
       		ConAmt: this.getView().getModel("gpfmodel").getData()[0].ConAmt,
       		Designation: this.getView().getModel("gpfmodel").getData()[0].Designation,
       		EmpComm: this.getView().getModel("gpfmodel").getData()[0].EmpComm,
       		Endda: this.getView().getModel("gpfmodel").getData()[0].Endda,
       		GpfBalance: this.getView().getModel("gpfmodel").getData()[0].GpfBalance,
       		Gpfno: this.getView().getModel("gpfmodel").getData()[0].Gpfno,
       		Mandt: this.getView().getModel("gpfmodel").getData()[0].Mandt,
       		Name: this.getView().getModel("gpfmodel").getData()[0].Name,
       		Office: this.getView().getModel("gpfmodel").getData()[0].Office,
       		PaidAmt:this.getView().getModel("gpfmodel").getData()[0].PaidAmt,
       		Payscale:this.getView().getModel("gpfmodel").getData()[0].Payscale,
       		Onlydisplay:this.getView().getModel("gpfmodel").getData()[0].Onlydisplay,
       		Pernr: this.getView().getModel("gpfmodel").getData()[0].Pernr,
       		ReqAmt: this.getView().getModel("gpfmodel").getData()[0].ReqAmt,
       		SanAmt: this.getView().getModel("gpfmodel").getData()[0].SanAmt,
       		Status:this.getView().getModel("gpfmodel").getData()[0].Status,
       		Wfid: this.getView().getModel("gpfmodel").getData()[0].Wfid,
       		Zreqno: this.getView().getModel("gpfmodel").getData()[0].Zreqno,
       		Zreqty: this.getView().getModel("gpfmodel").getData()[0].Zreqty,
       		Mpernr:this.getView().byId("nla").getValue(),
			Rtext:this.getView().getModel("gpfmodel").getData()[0].Rtext
		
			
       	    }
			var gpfservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_GPF_APPROVAL_SRV/");
	 	       var t=this;
	 	       	   gpfservice.create("/GPFSet",gpfdetails,{
	 				   success:function(odata){
	 					
	 					if(odata.Action==="A")	{	
	 					  
	 					  new sap.m.MessageBox.success("Requset NO '"+odata.Zreqno+"' Succesfully Approved", {
	 						    title: "Success",                                    // default
	 						                                     
	 						    styleClass: "",                                      // default
	 						    actions: [ sap.m.MessageBox.Action.OK,
	 						               sap.m.MessageBox.Action.CANCEL ],         // default
	 						    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
	 						    initialFocus: null,                                  // default
	 						    textDirection: sap.ui.core.TextDirection.Inherit ,
	 						      onClose:function(evt){
	 						      	if(evt === "OK"){
	 						      	 var router=t.getOwnerComponent().getRouter();
	 			 					router.navTo("dashboard");
	 						      	}
	 						      }
	 						  
	 		    			   
	 					  });
	 					}
	 					else if(odata.Action==="R"){
	 						
	 						  new sap.m.MessageBox.error("Requset NO '"+odata.Zreqno+"' Rejected", {
		 						    title: "Reject",                                    // default
		 						                                     
		 						    styleClass: "",                                      // default
		 						    actions: [ sap.m.MessageBox.Action.OK,
		 						               sap.m.MessageBox.Action.CANCEL ],         // default
		 						    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
		 						    initialFocus: null,                                  // default
		 						    textDirection: sap.ui.core.TextDirection.Inherit ,
		 						      onClose:function(evt){
		 						      	if(evt === "OK"){
		 						      	 var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
		 						      	}
		 						      }
		 						  
		 		    			   
		 					  });
	 					}
	 					else if(odata.Action==="B"){
	 						
	 						  new sap.m.MessageBox.information("Requset NO '"+odata.Zreqno+"' Refer Back", {
		 						    title: "Information",                                    // default
		 						                                     
		 						    styleClass: "",                                      // default
		 						    actions: [ sap.m.MessageBox.Action.OK,
		 						               sap.m.MessageBox.Action.CANCEL ],         // default
		 						    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
		 						    initialFocus: null,                                  // default
		 						    textDirection: sap.ui.core.TextDirection.Inherit ,
		 						      onClose:function(evt){
		 						      	if(evt === "OK"){
		 						      	 var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
		 						      	}
		 						      }
		 						  
		 		    			   
		 					  });
	 					}
	 		    			   
	 			    		  
	 					
	 		},
	 				   error:function(error){
	 					  var message=error;
	 						var msg=$(error.response.body).find('message').first().text();
	 						new sap.m.MessageBox.error(msg);
	 				   }
	 			   });
		},
		Approve:function(){
		 
       		
 	       	   
 	       	/*if(!this.handleValidations()){
				return;
			}*/
			var  msg="Are you sure, want to Approve?";
			MessageBox.show(msg, {
				icon: MessageBox.Icon.WARNING,
				title: "Confirmation",
				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						this.handlevalidation("A");						
					}
				}.bind(this)
			});
		},
		Reject:function(){
			var  msg="Are you sure, want to Reject?";
			MessageBox.show(msg, {
				icon: MessageBox.Icon.WARNING,
				title: "Confirmation",
				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						this.handlevalidation("R");						
					}
				}.bind(this)
			});
		},
		/*SendBack:function(evt){
			var  msg="Are you sure, want to Refer Back?";
			MessageBox.show(msg, {
				icon: MessageBox.Icon.WARNING,
				title: "Confirmation",
				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						this.sendbackenddata("B");						
					}
				}.bind(this)
			});
		}*/
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZGPF.ZGPF.view.contribution
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZGPF.ZGPF.view.contribution
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZGPF.ZGPF.view.contribution
		 */
		//	onExit: function() {
		//
		//	}
	});

});