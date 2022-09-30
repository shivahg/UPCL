sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("Zmedical_Approval.Zmedical_Approval.controller.emp_medical_form", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Zmedical_Approval.Zmedical_Approval.view.emp_medical_form
		 */
		onInit: function () {
			var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
    oRouter.getRoute("emp_medical_form").attachPatternMatched(this.onObjectMatched,this);
  	var data={
	    	 'data':[
	       		{
	       			"type":"Inter State",
	       			"type2":"Indoor Treatment"
	       			},{
	       			"type":"Outer State",
	       			"type2":"Outdoor Treatment"
	       			}]
 };
 
 var model1=new sap.ui.model.json.JSONModel();
 model1.setData(data);
 this.getView().setModel(model1);
      
},

onObjectMatched:function(evt){
	
	sap.ui.core.BusyIndicator.show();
	
 this.value= evt.getParameter("arguments").obj;
 
 
 
 

 
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
handleLinkPress:function(evt){
         
	  

	var flag1=this.flag;
    
	var req=evt.oSource.mProperties.text;
	var router = this.getOwnerComponent().getRouter();
	router.navTo("medical_detail", {md:this.value,reqno:req});
	
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
						
						t.getView().byId("nlaa").setValue(value);
						
						
						dialog.close();}})],
				buttons:[new sap.m.Button({text:"OK",press:function(evt){
					
					
					
				dialog.close();}
					}),
					new sap.m.Button({text:"Close",press:function(){ 
						dialog.close();}})] });
		t.getView().addDependent(dialog);
		dialog.open();
	},


validations:function(action){
	
	var ll=this.getView().byId("ll").getSelected();
	
	
	 if((this.getView().byId("A1").getValue()==="")){
		new sap.m.MessageBox.warning("Please Fill Approvers Comments");
	}
	else if((this.getView().byId("nlaa").getValue()==="")&&(ll===false)){
		new sap.m.MessageBox.warning("Please Fill Next Level Approvers");
	}
	else if((this.getView().byId("paa").getValue()==="")){
		new sap.m.MessageBox.warning("Please Fill Pass Amount");
	}
	
	else if(action==="A"){
		this.sendbackenddata("A");
	}
	else if(action==="R"){
		this.sendbackenddata("R");
	}
	else if(action==="T"){
		this.sendbackenddata("T");
	}
},
sendbackenddata:function(action){
	
	
	
	   var Cdate=(this.getView().byId("cdate").getValue());
	   if((Cdate==="")||(Cdate===null)){
		   Cdate=null;
		}
		else {
		var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
		var Cdate=frmt.format(new Date(Cdate));
		Cdate=new Date(Cdate);
		Cdate= new Date(Cdate.setHours("00","00","00","00"));
		Cdate = new Date(Cdate.getTime() + Cdate.getTimezoneOffset() * (-60000));
		this.getView().getModel("medicalmodel").getData()[0].Cdate=Cdate;
		}
	
	
	
	
	
	
	
	if(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="1"){
		
		
		var estdate=(this.getView().byId("estimatedate").getValue());
	       if((estdate==="")||(estdate===null)){
	    	   estdate=null;
			}
			else {
			var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
			var estdate=frmt.format(new Date(estdate));
			estdate=new Date(estdate);
			estdate= new Date(estdate.setHours("00","00","00","00"));
			estdate = new Date(estdate.getTime() + estdate.getTimezoneOffset() * (-60000));
			this.getView().getModel("medicalmodel").getData()[0].Esthospdate=estdate;
			}
		
	}
	
	else if((this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2")||(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3")){
		  var dateadm=this.getView().byId("dad").getValue();
		if((dateadm==="")||(dateadm===null)){
			dateadm=null;
		}
		else {
		var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
		var dateadm=frmt.format(new Date(dateadm));
		dateadm=new Date(dateadm);
		dateadm= new Date(dateadm.setHours("00","00","00","00"));
	   dateadm = new Date(dateadm.getTime() + dateadm.getTimezoneOffset() * (-60000));
	   this.getView().getModel("medicalmodel").getData()[0].Doadmin=dateadm;
		}

		var datedis=(this.getView().byId("ddis").getValue());
	       
	       if((datedis==="")||(datedis===null)){
	    	   datedis=null;
			}
	       else{
	       	var frmt1 = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
			var datedis=frmt1.format(new Date(datedis));
			datedis=new Date(datedis);
			datedis= new Date(datedis.setHours("00","00","00","00"));
	      datedis= new Date(datedis.getTime() + datedis.getTimezoneOffset() * (-60000));
	      this.getView().getModel("medicalmodel").getData()[0].Dodisch=datedis;
	     
	       }
	}
	
	
	
	  
 
	
	
	
	
	
	var data={
			   "Action": action,
				"Advamt": this.getView().getModel("medicalmodel").getData()[0].Advamt,
				"Cdate": this.getView().getModel("medicalmodel").getData()[0].Cdate,
				"Claimtype": this.getView().getModel("medicalmodel").getData()[0].Claimtype,
				"Desease": this.getView().getModel("medicalmodel").getData()[0].Desease,
				"Doadmin": this.getView().getModel("medicalmodel").getData()[0].Doadmin,
				"Dodisch": this.getView().getModel("medicalmodel").getData()[0].Dodisch,
				"Empcomm": this.getView().getModel("medicalmodel").getData()[0].Empcomm,
				"Estamount": this.getView().getModel("medicalmodel").getData()[0].Estamount,
				"Esthospdate": this.getView().getModel("medicalmodel").getData()[0].Esthospdate,
				"Facomments": this.getView().byId("A2").getValue(),
				"Hcard": this.getView().getModel("medicalmodel").getData()[0].Hcard,
				"Hospital": this.getView().getModel("medicalmodel").getData()[0].Hospital,
				"HospitalLoc": this.getView().getModel("medicalmodel").getData()[0].HospitalLoc,
				"Maname":this.getView().getModel("medicalmodel").getData()[0].Maname,
				"Mandt": this.getView().getModel("medicalmodel").getData()[0].Mandt,
				"Mcomments": this.getView().byId("A1").getValue(),
				"Medicaladv":this.getView().getModel("medicalmodel").getData()[0].Medicaladv,
				"Mpernr": this.getView().byId("nlaa").getValue(),
				"Mreqno": this.getView().getModel("medicalmodel").getData()[0].Mreqno,
				"Name": this.getView().getModel("medicalmodel").getData()[0].Name,
				"Namerefhosp": this.getView().getModel("medicalmodel").getData()[0].Namerefhosp,
				"Nattreat": this.getView().getModel("medicalmodel").getData()[0].Nattreat,
				"Opreqno": this.getView().getModel("medicalmodel").getData()[0].Opreqno,
				"Passamt": this.getView().byId("paa").getValue(),
				"Patient": this.getView().getModel("medicalmodel").getData()[0].Patient,
				"Payscale":this.getView().getModel("medicalmodel").getData()[0].Payscale,
				"Pernr": this.getView().getModel("medicalmodel").getData()[0].Pernr,
				"Preper": this.getView().getModel("medicalmodel").getData()[0].Preper,
				"Reimtype": this.getView().getModel("medicalmodel").getData()[0].Reimtype,
				"Sancamt": this.getView().byId("sa").getValue(),
				"Status": this.getView().getModel("medicalmodel").getData()[0].Status,
				"Waers": this.getView().getModel("medicalmodel").getData()[0].Waers,
				"Zreqno": this.getView().getModel("medicalmodel").getData()[0].Zreqno,
				"Zreqtyp": this.getView().getModel("medicalmodel").getData()[0].Zreqtyp,
				"Onlydisplay":this.getView().getModel("medicalmodel").getData()[0].Onlydisplay
				
	}
	
	var medicalservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_APPROVAL_SRV/");
	       var t=this;
	       	   medicalservice.create("/medicalSet",data,{
				   success:function(odata){
					
					   
					   
					   
					 
					  new sap.m.MessageBox.success("Succesfully Approved", {
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
						      	else if(evt === "CANCEL"){
						      		var router=t.getOwnerComponent().getRouter();
 			 					router.navTo("dashboard");
						      	}
						      }
						  
		    			   
					  });
				   
				/*	   else if(odata.Action==="R"){
							  new sap.m.MessageBox.success("Rejected", {
								    title: "Warning",                                    // default
								                                     
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
								      	else if(evt === "CANCEL"){
								      		var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
								      	}
								      }
								  
				    			   
							  });
					   }
					   else if(odata.Action==="T"){
							  new sap.m.MessageBox.success("Refer Back", {
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
								      	else if(evt === "CANCEL"){
								      		var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
								      	}
								      }
								  
				    			   
							  });
					   }*/
				   },
				   
				   error:function(evt){
					 
		 					 	
		 					  var message=evt.response.body.slice(172,221);
								
		 					  new sap.m.MessageBox.error(message);
		 				   	
				   }
			   });
	
	       	   
	
	
	
	
},


Approve:function(){
  var r=this.value;
    	
	var  msg="Are you sure, want to Approve?";
	new sap.m.MessageBox.show(msg, {
		icon: MessageBox.Icon.WARNING,
		title: "Confirmation",
		actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		onClose: function(oAction) {
			if(oAction=="YES"){
				this.validations("A");						
			}
		}.bind(this)
	});
},
Reject:function(evt){
	var r=this.value;
	var  msg="Are you sure, want to Reject?";
	MessageBox.show(msg, {
		icon: MessageBox.Icon.WARNING,
		title: "Confirmation",
		actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		onClose: function(oAction) {
			if(oAction=="YES"){
				this.validations("R");						
			}
		}.bind(this)
	});
},
ReferBack:function(evt){
	var r=this.value;
	var  msg="Are you sure, want to ReferBack?";
	MessageBox.show(msg, {
		icon: MessageBox.Icon.WARNING,
		title: "Confirmation",
		actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		onClose: function(oAction) {
			if(oAction=="YES"){
				this.validations("T");						
			}
		}.bind(this)
	});
},

lastlevel:function(evt){
	var select=evt.mParameters.selected;
	
	if(select===true){
		this.getView().byId("nlaa").setValue(null);
		this.getView().byId("nlaa").setVisible(false);
		this.getView().byId("paa").setVisible(true);
		
	}
	else if(select===false){
		this.getView().byId("nlaa").setVisible(true);
		this.getView().byId("paa").setVisible(false);
		
	}
},
backpage:function(evt){
	var router = this.getOwnerComponent().getRouter();
	router.navTo("dashboard", {
		
	});
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