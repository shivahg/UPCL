sap.ui.define([
	"ZMedical_App/ZMedical_App/controller/BaseController",
	"sap/m/MessageBox",
	"sap/m/Link"
], function (Controller,MessageBox,Link) {
	"use strict";

	return Controller.extend("ZMedical_App.ZMedical_App.controller.emp_medical_form", { 

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZMedical_App.ZMedical_App.view.emp_medical_form
		 */
		onInit: function () {
		
		//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
		
		/*this project info Zreqtyp=4  is  medical permission
        Zreqtyp=5  is medical permission with advance
        Zreqtyp=6  is direct medical claim  and permission with medical claim*/
		
		
		//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
		
		
		
         var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
	          oRouter.getRoute("emp_medical_form").attachPatternMatched(this.onObjectMatched,this);
	          
	          this.data=[];this.Zreqno; this.zrtype;
	          
	          this.flag;  this.m=[];         this.da; this.ds;
               this.obj={}; this.fn;
	          
	         var medicalmodel=new sap.ui.model.json.JSONModel();
	          ///////////////////////////////////////////////
	      	var data1={
       	    	 'data1':[
       	       		{
       	       			"type":"Within State",
       	       			
       	       			"type3":"Yes",
       	       			"type4":"Denture"
       	       			},{
       	       			"type":"Outside State",
       	       			
       	       		    "type3":"No",
       	       		    "type4":"Hearing Aid Claim"
       	       			}]
         };
         
         var model1=new sap.ui.model.json.JSONModel();
         model1.setData(data1);
         this.getView().setModel(model1);
      
      ///////////////////////////////////////////
      
     
      
      
        
        
     
         
	          
		},
		
		
		
        onObjectMatched:function(evt){
        	try{
        		var oModel = sap.ui.getCore().getModel("AttachModel");
				this.getView().byId("attachment").setModel(oModel,"AttachModel")
        	}catch(e){
        		console.log(e)
        	}
        debugger;
        	sap.ui.core.BusyIndicator.show();
        	this.value= evt.getParameter("arguments").obj;
        	
        	
         this.Zreqno=evt.getParameter("arguments").obj;
         this.flag=evt.getParameter("arguments").obj2;
         
         this.mode=evt.getParameter("arguments").obj3;
         ///////////////////////////////////////////////
         
         var attdata1=[
         {
         "file":"Attachment 1"
         },
         {
         "file":"Attachment 2"
         },
         {
         "file":"Attachment 3"
         }
         ];
            var attdata=new sap.ui.model.json.JSONModel();
         attdata.setData(attdata1);
         this.getView().setModel(attdata,"attdata");
         /////////////////////////////////////////////////////
          
         
        
            
           
         
         ////////////////////////////////////////////////////////
         debugger;
          var amt={},amt1=[];
          if(this.value==="6" || this.flag==="F"){
          amt.at="Claim Amount"
         }
         else {
         	amt.at="Estimated Amount"
         }
         amt1.push(amt);
         var amtmodel=new sap.ui.model.json.JSONModel();
         amtmodel.setData(amt1);
         this.getView().setModel(amtmodel,"amtmodel");
         
         if((this.value ==='4'|| this.value ==='5')){
        this.getView().byId("dad").setVisible(false);
        this.getView().byId("ddis").setVisible(false);
        }
         
         ////////////////File Download///////////////////
         if((this.value!=="4")||(this.value!=="5")||(this.value!=="6")){
             var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	var t = this;
	medicalservice.read("/MedattSet/?$filter=Zreqno eq '"+t.value+"'", {
		success: function (odata) {
            var data=[]; var obj={};
			t.fn=odata.Filename;
			 for(var i=0;i<odata.results.length;i++){
            	delete odata.results[i].__metadata;
            	obj.fn=odata.results[i].Filename;
                 data.push(obj);
                 obj={};
            }

            var attachments = new sap.ui.model.json.JSONModel();
			attachments.setData(data);
			t.getView().setModel(attachments,"Fileattachment");
			sap.ui.core.BusyIndicator.hide();
		},
		error: function (error) {
			sap.ui.core.BusyIndicator.hide();
			var message = error;
			var msg = $(error.response.body).find('message').first().text();
			var action = "OK";
			new sap.m.MessageBox.error(msg, {
                actions: [ sap.m.MessageBox.Action.OK,
	 					sap.m.MessageBox.Action.CANCEL ],
				onClose: function () {
					if (action === "OK") {
                            var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
					}
				}
			});
		}
	});
         
       }  
         
         
         
         
         
         
         
         
         
         if(this.flag==="M"){
        	 var t=this;
        	
        	            var medicalmodel = new sap.ui.model.json.JSONModel();
        				medicalmodel.setData(t.data);
        				t.getView().setModel(medicalmodel, "medicalmodel");
        				sap.ui.core.BusyIndicator.hide();
        			
         }
         
         
         else if(this.flag==="C"){
        
    var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	var t = this;
//	medicalservice.read("/medicalSet('999')", {
	medicalservice.read("/medicalSet(Zreqno='999',Type='X')", {
		success: function (odata) {
		 
		 
		 
		 
		   if(t.value==="4"){
           var reqdata=[
         {
         "typereq":"Indoor Treatment",
         
         },
         
        {
         "typereq":"Denture",
         },
         {
         "typereq":"Hearing Aid"
         }
         ]
		  
		  }
        else if(t.value==="6" && odata.Opreqno==="00000000"){
        
            var reqdata=[
         {
         "typereq":"Indoor Treatment",
         
         },
          {
         "typereq":"Outdoor Treatment",
         }
         ]
        }    
           var reqdata1=new sap.ui.model.json.JSONModel();
         reqdata1.setData(reqdata);
         t.getView().setModel(reqdata1,"reqdata");
		 
		
		
		
             var data=[];
			delete odata.__metadata;
			var frmt = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});
			var d = frmt.format(new Date(odata.Cdate));
             odata.Cdate=new Date(d);
            
             odata.Zreqtyp=t.value;
             for(var i=0;i<t.data.length;i++){
                 t.data.splice(t.data[i]);
                 }
                 
                  if(odata.Status===""){
             	odata.Status="EM";
             }
             t.data.push(odata);
			var medicalmodel = new sap.ui.model.json.JSONModel();
			medicalmodel.setData(t.data);
			t.getView().setModel(medicalmodel, "medicalmodel");
			sap.ui.core.BusyIndicator.hide();
		},
		error: function (error) {
			sap.ui.core.BusyIndicator.hide();
			var message = error;
			var msg = $(error.response.body).find('message').first().text();
			var action = "OK";
			new sap.m.MessageBox.error(msg, {
                     actions: [ sap.m.MessageBox.Action.OK,
	 						  sap.m.MessageBox.Action.CANCEL ],
				onClose: function () {
					if (action === "OK") {
                       var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
					}
				}
			});
		}
	});
         }
         
         
         else if(this.flag==="F"){
         
          var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
        		var t = this;
//        		medicalservice.read("/medicalSet('"+this.value+"')", {
        		medicalservice.read("/medicalSet(Zreqno='"+this.value+"',Type='X')", {
        			success: function (odata) {
        		
        			odata.Zreqtyp="6";
        	             var data=[];
        				delete odata.__metadata;
        				var frmt = sap.ui.core.format.DateFormat.getDateInstance({
        					pattern: "yyyy-MM-dd"
        				});
        				var d = frmt.format(new Date(odata.Cdate));
        	             odata.Cdate=new Date(d);
        	             if((odata.Zreqtyp==="1")||(odata.Zreqtyp==="6") ){
        	            	 odata.Esthospdate=frmt.format(new Date(odata.Esthospdate));
            	             odata.Esthospdate=new Date(odata.Esthospdate);
            	             odata.Doadmin=frmt.format(new Date(odata.Doadmin));
        	             odata.Doadmin=new Date(odata.Doadmin);
        	             odata.Dodisch=frmt.format(new Date(odata.Dodisch));
        	             odata.Dodisch=new Date(odata.Dodisch);
        	             }
        	             else if((odata.Zreqtyp==="2")||(odata.Zreqtyp==="3")){
        	             odata.Doadmin=frmt.format(new Date(odata.Doadmin));
        	             odata.Doadmin=new Date(odata.Doadmin);
        	             odata.Dodisch=frmt.format(new Date(odata.Dodisch));
        	             odata.Dodisch=new Date(odata.Dodisch);
        	             }
        	            odata.Zreqtyp="6";
        	             
                                           if(odata.Status!==""){
             	                           odata.Status="EM";
                                               }
        	             data.push(odata);
        				var medicalmodel = new sap.ui.model.json.JSONModel();
        				medicalmodel.setData(data);
        				t.getView().setModel(medicalmodel, "medicalmodel");
        				sap.ui.core.BusyIndicator.hide();
                      t.getView().byId("save").setVisible(true);
                      t.getView().byId("submit").setVisible(true);
        			},
        			error: function (error) {
        				sap.ui.core.BusyIndicator.hide();
        				var message = error;
        				var msg = $(error.response.body).find('message').first().text();
        				var action = "OK";
        				new sap.m.MessageBox.error(msg, {
                                  actions: [ sap.m.MessageBox.Action.OK,
	 						               sap.m.MessageBox.Action.CANCEL ],
        					onClose: function () {
        						if (action === "OK") {
                                   var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
        						}
        					}
        				});
        			}
        		});
         
         }
       
         
         
         
         
         else{
        	  var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
        		var t = this;
//        		medicalservice.read("/medicalSet('"+this.value+"')", {
        		medicalservice.read("/medicalSet(Zreqno='"+this.value+"',Type='X')", {
        			success: function (odata) {
        			
        		debugger;
          var amt={},amt1=[];
          if(odata.Opreqno!=="00000000"){
          amt.at="Claim Amount"
         }
         else {
         	amt.at="Estimated Amount"
         }
         amt1.push(amt);
         var amtmodel=new sap.ui.model.json.JSONModel();
         amtmodel.setData(amt1);
         t.getView().setModel(amtmodel,"amtmodel");
        			
        		
        	             var data=[];
        				delete odata.__metadata;
        				var frmt = sap.ui.core.format.DateFormat.getDateInstance({
        					pattern: "yyyy-MM-dd"
        				});
        				var d = frmt.format(new Date(odata.Cdate));
        	             odata.Cdate=new Date(d);
        	             if((odata.Zreqtyp==="1") || (odata.Zreqtyp==="5")||(odata.Zreqtyp==="6")||(odata.Zreqtyp==="4")){
        	            	 odata.Esthospdate=frmt.format(new Date(odata.Esthospdate));
            	             odata.Esthospdate=new Date(odata.Esthospdate);
            	             odata.Doadmin=frmt.format(new Date(odata.Doadmin));
        	             odata.Doadmin=new Date(odata.Doadmin);
        	             odata.Dodisch=frmt.format(new Date(odata.Dodisch));
        	             odata.Dodisch=new Date(odata.Dodisch);
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
                                actions: [ sap.m.MessageBox.Action.OK,
	 						               sap.m.MessageBox.Action.CANCEL ],
        					onClose: function () {
        						if (action === "OK") {
                                     var router=t.getOwnerComponent().getRouter();
		 			 					router.navTo("dashboard");
        						}
        					}
        				});
        			}
        		});
         }
         
        },
        
   permission:function(evt){
   sap.ui.core.BusyIndicator.show();
      /////////////////////////////////////////////////////
            if(evt==="4"){
           var reqdata=[
         {
         "typereq":"Indoor Treatment",
         
         },
         
        {
         "typereq":"Denture",
         },
         {
         "typereq":"Hearing Aid"
         }
         ]
            }
            
            else if(evt==="5"){
              var reqdata=[
         {
         "typereq":"Indoor Treatment",
         
         },
         
         {
         "typereq":"Outdoor Treatment",
         },
         
        
         ]
            
            } 
            
            else{
            
                var reqdata=[
         {
         "typereq":"Indoor Treatment",
         
         },
         
         {
         "typereq":"Outdoor Treatment",
         },
         
         {
         "typereq":"Denture",
         },
         {
         "typereq":"Hearing Aid"
         }
         ]
            
            
            }                                                                                       
         var reqdata1=new sap.ui.model.json.JSONModel();
         reqdata1.setData(reqdata);
         this.getView().setModel(reqdata1,"reqdata");
             
    var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	var t = this;
	t.value= evt;  
	medicalservice.read("/medicalSet(Zreqno='999',Type='X')", {
		success: function (odata) {
		           
		        if(odata.Status ===""){
             	  odata.Status="EM";
                    }
             var data=[];
			delete odata.__metadata;
			var frmt = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-dd"
			});
			var d = frmt.format(new Date(odata.Cdate));
             odata.Cdate=new Date(d);
            
             odata.Zreqtyp=t.value;
             for(var i=0;i<t.data.length;i++){
                 t.data.splice(t.data[i]);
                 }
             t.data.push(odata);
			var medicalmodel = new sap.ui.model.json.JSONModel();
			medicalmodel.setData(t.data);
			t.getView().setModel(medicalmodel, "medicalmodel");
			sap.ui.core.BusyIndicator.hide();
		},
	});
	},
	
	
	medical_advance:function(evt){
	sap.ui.core.BusyIndicator.show();
	this.permission("1");
	},
		
	med_permission:function(evt){
	sap.ui.core.BusyIndicator.show();
		this.permission("4");
		},
		
	medical_per_adv:function(evt){
	sap.ui.core.BusyIndicator.show();
	this.permission("5");
},
        
        
        location_change:function(evt){
        	this.getView().byId("addhos").setValue(null);
        },
        
        Requesttype:function(evt){
        var type=evt.mParameters.selectedItem.mProperties.text;
        
        if((this.value ==='4'|| this.value ==='5')){
        this.getView().byId("dad").setVisible(false);
        this.getView().byId("ddis").setVisible(false);
        }
        else if(type==="Denture"||type==="Hearing Aid"){
      
        this.getView().byId("hloc").setVisible(false);
        this.getView().byId("addhos").setVisible(false);
        this.getView().byId("ndise").setVisible(false);
        this.getView().byId("rh").setVisible(false);
        this.getView().byId("dad").setVisible(false);
        this.getView().byId("ddis").setVisible(false);
        }
        else if (type!=="Denture"||type!=="Hearing Aid"){
         this.getView().byId("hloc").setVisible(true);
        this.getView().byId("addhos").setVisible(true);
        this.getView().byId("ndise").setVisible(true);
        this.getView().byId("rh").setVisible(true);
         this.getView().byId("dad").setVisible(true);
        this.getView().byId("ddis").setVisible(true);
        }
        },
        
      
     
        
        
        
        Name_Desease:function(evt){
        
         var t=this;
			
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
			changetype.read("/DeseaseMSet",{
				success:function(odata){
					var arr=[],obj={};
			
					for(var i=0;i<odata.results.length;i++){
						obj.Dname= odata.results[i].Dname;
							obj.Dtype=odata.results[i].Dtype;
							obj.Radv=odata.results[i].Radv;
						arr.push(obj);
						obj={};}
				var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"empset");
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Name Of Disease",
				content:[new sap.m.SearchField({liveChange:function(evt){
								var filt=[];
								var a=evt.mParameters.newValue;
	                            var binding=t.l.getBinding("items");
	                            if(a&&a.length>0){
	                            var filter=new sap.ui.model.Filter("Dname", sap.ui.model.FilterOperator.Contains, a);
	                            filt.push(filter);
	                            }binding.filter(filt);
                                 }}),
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: 'empset>/',template: new sap.m.StandardListItem({title:"{empset>Dname}",description:"{empset>Dtype}",info:"{empset>Radv}",type: "Active"}),},
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("title");
							
							t.getView().byId("ndise").setValue(value);
							
							
							dialog.close();}})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
        },
        Address:function(evt){
              var t=this;
			t.value=t.getView().byId("hloc").getValue();
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
			sap.ui.core.BusyIndicator.show();
			changetype.read("/hospitalSet()?$filter=(HospDet eq '"+t.value+"')",{
				success:function(odata){
					var arr=[],obj={};
					var mpno=odata.results;
					for(var i=0;i<mpno.length;i++){
						obj.HospDet= mpno[i].HospDet;
							obj.HospId=mpno[i].HospId;
							obj.Mandt=mpno[i].Mandt;
						arr.push(obj);
						obj={};}
				var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"empset");
				sap.ui.core.BusyIndicator.hide();
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Address of Hospital",
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
						items: {path: 'empset>/',template: new sap.m.StandardListItem({title:"{empset>HospDet}",type: "Active"}),},
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("title");
							
							t.getView().byId("addhos").setValue(value);
							
							sap.ui.core.BusyIndicator.hide();
							dialog.close();}})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
        },
        patientdetails:function(evt){
                   var t=this;
			
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
			changetype.read("/familySet",{
				success:function(odata){
					var arr=[],obj={};
					var pdetails=odata.results;
					for(var i=0;i<pdetails.length;i++){
						obj.details=pdetails[i].Details;
					
						arr.push(obj);
						obj={};}
				var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"empset");
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Patient Family Details",
				content:[new sap.m.SearchField({liveChange:function(evt){
								var filt=[];
								var a=evt.mParameters.newValue;
	                            var binding=t.l.getBinding("items");
	                            if(a&&a.length>0){
	                            var filter=new sap.ui.model.Filter("details", sap.ui.model.FilterOperator.Contains, a);
	                            filt.push(filter);
	                            }binding.filter(filt);
                                 }}),
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: 'empset>/',template: new sap.m.StandardListItem({title:"{empset>details}",type: "Active"}),},
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("title");
							
							t.getView().byId("pd").setValue(value);
							
							
							dialog.close();}})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
        },
        
        
        
        med_advance:function(evt){
        	sap.ui.core.BusyIndicator.show();
        var t=this;
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
			changetype.read("/f4medicalSet",{
				success:function(odata){
					var arr=[],obj={};
					var mdtails=odata.results;
					var frmt = sap.ui.core.format.DateFormat.getDateInstance({
						pattern: "yyyy-MM-dd"
					});
					for(var i=0;i<mdtails.length;i++){
						obj.Zreqno=mdtails[i].Zreqno;
					    obj.Patient=mdtails[i].Patient;
					    obj.Hospital=mdtails[i].Hospital;
					    	obj.Desease=mdtails[i].Desease;
					    	
					    	var Cdate=mdtails[i].Cdate;
					    	
					    	obj.Cdate=frmt.format(new Date(Cdate));
				             
					    	
					    		
						arr.push(obj);
						obj={};}
					var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"mdset");
				sap.ui.core.BusyIndicator.hide();
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Medical Advance Details",
				content:[new sap.m.SearchField({liveChange:function(evt){
								var filt=[];
								var a=evt.mParameters.newValue;
	                            var binding=t.l.getBinding("items");
	                            if(a&&a.length>0){
	                            var filter=new sap.ui.model.Filter("Patient", sap.ui.model.FilterOperator.Contains, a);
	                            filt.push(filter);
	                            }binding.filter(filt);
                                 }}),
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: 'mdset>/',
							
							template: new sap.m.FeedListItem({ 
								sender:"{mdset>Zreqno}",text:"{mdset>Patient} {mdset>Desease} {mdset>Hospital}",info:" {mdset>Cdate}",
								senderActive:true,type:"Active",
								
								senderPress:function(oevt){
										var req=evt.oSource.mProperties.sender;
					        	        var flag1=t.flag;
                       
        	
        	                        var router = t.getOwnerComponent().getRouter();
			                           router.navTo("medical_detail", {md:t.value,reqno:req,flag:flag1});
								
								},
							}),
							
							
							
							},
							
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("sender");
							
							t.getView().byId("mdv").setValue(value);
							
							
							dialog.close();},
							
							
							
							
							
							})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();
        },
        
        handleLinkPress:function(evt){
                       var flag1=this.flag;
                       
        	var req=evt.oSource.mProperties.text;
        	var router = this.getOwnerComponent().getRouter();
			router.navTo("medical_detail", {md:this.value,reqno:req,flag:flag1});
		},
        
        medical_pno:function(evt){
       /*var t=this;
			var changetype=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
			changetype.read("/f4medicalSet('99999998')",{
				success:function(odata){
					var arr=[],obj={};
					var pdetails=odata.results;
					for(var i=0;i<pdetails.length;i++){
						obj.details=pdetails[i].Details;
					
						arr.push(obj);
						obj={};}
				var mocmodel=new sap.ui.model.json.JSONModel();
				mocmodel.setData(arr);
				t.getView().setModel(mocmodel,"empset");
				}
			});
			var dialog=new sap.m.Dialog({
				title:"Medical Permission Numbers",
				content:[new sap.m.SearchField({liveChange:function(evt){
								var filt=[];
								var a=evt.mParameters.newValue;
	                            var binding=t.l.getBinding("items");
	                            if(a&&a.length>0){
	                            var filter=new sap.ui.model.Filter("details", sap.ui.model.FilterOperator.Contains, a);
	                            filt.push(filter);
	                            }binding.filter(filt);
                                 }}),
                                 
                         t.l=new sap.m.List({growing:true,
						items: {path: 'empset>/',template: new sap.m.StandardListItem({title:"{empset>details}",type: "Active"}),},
						itemPress: function (oevt) {
							
							
							var value = oevt.getParameter("listItem").getProperty("title");
							
							t.getView().byId("pd").setValue(value);
							
							
							dialog.close();}})],
					buttons:[new sap.m.Button({text:"OK",press:function(evt){
						
						
						
					dialog.close();}
						}),
						new sap.m.Button({text:"Close",press:function(){ 
							dialog.close();}})] });
			t.getView().addDependent(dialog);
			dialog.open();*/
        },
        
        Download:function(evt){
        
            var key=evt.mParameters.id.slice(12);
        var path=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.Fileattachment.sPath.slice(1));
        
        
        var string ="MedattSet('99999999')?/$value";
      var string1 = "/MedattSet('99999999')";
    var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	var t = this;
	medicalservice.read("/Medattset/?$filter=Zreqno eq '"+t.value+"',Filename  eq '"+t.fn+"' ", {
		success: function (odata,response) {
            
            
			 var file=response.data.__metadata.media_src;
			 window.open("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/MedattSet(Zreqno='00000227')/$value");
			 window.open(file);
			
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
        
        download:function(evt){
       
              var key=evt.mParameters.id.slice(12);
        var path=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.Fileattachment.sPath.slice(1));
        
        
        var string="MedattSet('99999999')/$value";
    var medicalservice = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	var t = this;
	medicalservice.read(string, {
		success: function (odata,response) {
            
                    
         var path=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.Fileattachment.sPath.slice(1))
					var attachmentDetail = this.getView().getModel("Fileattachment").getData(path);
//					window.open("/sap/opu/odata/sap/zhcm_noc_SRV/FileSet(ReqNo='"+attachmentDetail.Zreqno+"',Filename='"+attachmentDetail.Filename+"')/$value");
					// var rec = this.getView().getModel("dashboard").getProperty("/Single_Record");
					var lv_oDataUrl = "/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/";
					var lv_OModel = new sap.ui.model.odata.ODataModel(lv_oDataUrl, true);
					var t=this;



                    if(attachmentDetail.Value){
						var parseValue=JSON.parse(atob(attachmentDetail.Value));
						var base64Val =parseValue.Value;
						if(JSON.parse(atob(attachmentDetail.Value)).Mimetype.toLowerCase().includes("image")){
							var oDialog=new sap.m.Dialog({
								title:parseValue.Filename,
								content:[new sap.m.Image({
									src:base64Val
								})],
								buttons:[new sap.m.Button({
									text:"Close",
									press:function(){oDialog.destroy();}
								})]
							});
							oDialog.open()
						}else{
							var oDialog=new sap.m.Dialog({
								title:parseValue.Filename,
								contentheight:"100%",
								contentWidth:"100%",
								content:[new HTML({
									content:"<iframe src='"+base64Val+"' height='500px' width='700px' frameborder='0'></iframe>"
								})],
								buttons:[new sap.m.Button({
									text:"Close",
									press:function(){oDialog.destroy();}
								})]
							}).addStyleClass("pdfDialog");
							oDialog.open()
						}
						
					}
            
			 var file=response.data.__metadata.media_src;
			 window.open(file);
			
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
        handleUploadPress:function(evt){
        
           try{
        	   var attachFor=this.getView().byId("attachcombo").getValue();
	           	if(attachFor===""){
	           		new sap.m.MessageBox.warning("Please Select File Type");
	           		return;
	           	}
	           	var oFileUploader = this.getView().byId("fileUploader"),returnData="";
				oFileUploader.upload();
				var file = jQuery.sap.domById(oFileUploader.getId()+"-fu").files[0];
				var fileName= file.name.replace(",",""),
				fileType=file.type,
			    fileSize=file.size/1024;
				this.previewFile(fileType, fileName, file, attachFor);
				var oFileUploader = this.getView().byId("fileUploader");
				oFileUploader.clear();
           }catch(e){
        	   console.log(e)
           }
     /*   sap.ui.core.BusyIndicator.show();
        this.key;
        var filetype=this.getView().byId("attachcombo").getValue();
        if(filetype==="Enclosure Details"){
        this.key="EU";
        }
        else if(filetype==="Guidelines"){
        this.key="GU"
        }
        else if(filetype==="Forms"){
        this.key="FU"
        }
        
        if(filetype===""){
        new sap.m.MessageBox.warning("Please Select File Type");
        sap.ui.core.BusyIndicator.hide();
        }
        	else{
       	    	 var f=this.getView().byId("fileUploader")
                         this.fn=f.mProperties.value;
                         
                          var file=f.getFocusDomRef();
						this.fn=this.fn=f.mProperties.value;
						
						var filename1=  this.key+"@#"+"99999999"+"@#"+this.fn;
						
						
						var oTasks = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/MedattSet");
						f.removeAllHeaderParameters();
						
						 f.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						       name: "SLUG",
						       value:filename1,
						       
						   }));
						 f.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						       name : "type",
						       value:"application.pdf"
						       
						   }));

						 f.addHeaderParameter(new sap.ui.unified.FileUploaderParameter({
						        name: "x-csrf-token",
						        value: oTasks.getSecurityToken()
						    }));
						    f.setSendXHR(true);
						    f.setUploadUrl("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/MedattSet");
						   f.upload();
						
							}					
						
				*/
        
        },
        handleUploadComplete:function(evt){
                               this.fn=evt.oSource.mProperties.value;
                               if(evt.mParameters.status===201){
                               
                               this.obj.fn=this.fn;
                               this.m.push(this.obj);
                               this.obj={};
                               var Fileattachment=new sap.ui.model.json.JSONModel();
                               
                                Fileattachment.setData(this.m);
                                this.getView().setModel(Fileattachment,"Fileattachment");
                                sap.ui.core.BusyIndicator.hide();
                                new sap.m.MessageBox.success(" '"+this.fn+"' Succesfully Approved");
                               }
                               else {
                                sap.ui.core.BusyIndicator.hide();
                               	new sap.m.MessageBox.error("File Upload Failed")
                               	
                               }
                               },
        
        
        validations:function(action){
        	
        	var ddis=new Date(this.getView().byId("ddis").getValue());
        	var dad=new Date(this.getView().byId("dad").getValue());
		
			if((this.getView().byId("reqtype").getValue()==="")){
				new sap.m.MessageBox.warning("Please Select Request Type ");
			}
			
			
			 
			else if((this.getView().byId("pd").getValue()==="")){
				new sap.m.MessageBox.warning("Please Fill Patient Details");
			}
			else if((this.getView().byId("hloc").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Denture")
			&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Hearing Aid")){
				new sap.m.MessageBox.warning("Please Select Hospital Location");
			}
           /* else if((this.getView().byId("hloc").getValue()==="Outside State" && this.getView().byId("mpno").getValue()==="")){
				
				new sap.m.MessageBox.warning("Please Fill Medical Permission Number");
			}*/
			else if((this.getView().byId("addhos").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Denture")
			&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Hearing Aid")){
				
				new sap.m.MessageBox.warning("Please Fill Name Of Hospital");
			}
			
			else if(this.getView().byId("cdate").getValue()===""){
			new sap.m.MessageBox.warning("Please Fill Date");
			}
			
           else if((this.getView().byId("ndise").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Denture")
			&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Hearing Aid")){
				
				new sap.m.MessageBox.warning("Please Fill Name Of Disease");
			}
           
           else if((this.getView().byId("estimatedate").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="1")
           ||(this.getView().byId("estimatedate").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp ==="5")){
				
				new sap.m.MessageBox.warning("Please Fill Estimated Date of Hospitalization");
			}
           else if(((this.getView().byId("estamt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="1"))
        		   || ((this.getView().byId("estamt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp ==="5"))
        		   ||((this.getView().byId("estamt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp ==="6"))){
				
				new sap.m.MessageBox.warning("Please Fill Estimated Amount");
			}
			
           else if(((this.getView().byId("dad").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))
        		   ||((this.getView().byId("dad").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3"))){
				
				new sap.m.MessageBox.warning("Please Fill Date Of Admission");
			}
			
           else if(((this.getView().byId("ddis").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))
        		   ||((this.getView().byId("ddis").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3"))){
				
				new sap.m.MessageBox.warning("Please Fill Date Of Discharge");
			}
			
           else if(((ddis<dad)&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))||
        		   ((ddis<dad)&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3"))){
				
				new sap.m.MessageBox.warning("Please Fill Date Of Discharge Greater Than Date Of Admission");
		

	}
			
			
			
           else if(((this.getView().byId("mdv").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))){
				
				new sap.m.MessageBox.warning("Please Fill Details of Medical Advance");
			}
			
           else if(((this.getView().byId("tamt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))
        		   ||((this.getView().byId("tamt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3"))){
				
				new sap.m.MessageBox.warning("Please Fill Total Amount Claimed");
			}
			
           else if(((this.getView().byId("wppt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"))
        		   ||((this.getView().byId("wppt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3"))){
				
				new sap.m.MessageBox.warning("Please Fill Wheather Prior Permission was Taken For Treatment if Required");
			}
			
           else if((this.getView().byId("rh").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Denture")
			&&(this.getView().getModel("medicalmodel").getData()[0].Reimtype!=="Hearing Aid")){
				
				new sap.m.MessageBox.warning("Name Of Reffered Hospital");
			}
           else if((this.getView().byId("nt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="4")
           ||(this.getView().byId("nt").getValue()==="")&&(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="5")){
				
				new sap.m.MessageBox.warning("Please Fill Nature Of Tratment");
			}
			
           
           else if((this.getView().byId("ecom").getValue()==="")){
				
				new sap.m.MessageBox.warning("Please Fill Employee Comments");
			}
           else if(action==="B"){
				this.sendbackenddata("B");
			}
			else if(action==="S"){
				this.sendbackenddata("S");
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
	       
			}
       
			
		/*	if(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="1"){
				
				
				
				this.getView().getModel("medicalmodel").getData()[0].Esthospdate=estdate;
				this.getView().getModel("medicalmodel").getData()[0].Estamount=this.getView().byId("estamt").getValue();
				
				this.getView().getModel("medicalmodel").getData()[0].Doadmin=null;
				 this.getView().getModel("medicalmodel").getData()[0].Dodisch=null;
				 
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
				if(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="2"){
				this.getView().getModel("medicalmodel").getData()[0].Mreqno=this.getView().byId("mdv").getValue();
				this.getView().getModel("medicalmodel").getData()[0].Estamount=this.getView().byId("tamt").getValue();
				this.getView().getModel("medicalmodel").getData()[0].Preper=this.getView().byId("wppt").getValue();
				}
				else if((this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="3")){
					
				this.getView().getModel("medicalmodel").getData()[0].Estamount=this.getView().byId("tamt").getValue();
				this.getView().getModel("medicalmodel").getData()[0].Preper=this.getView().byId("wppt").getValue();
				
				}*/
				
				var estdate=this.getView().getModel("medicalmodel").getData()[0].Esthospdate;
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
			      this.getView().getModel("medicalmodel").getData()[0].Dodisch=datedis
			       }
				
				
				
			
			 if(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="4"){
				this.getView().getModel("medicalmodel").getData()[0].Namerefhosp=this.getView().byId("rh").getValue();
				this.getView().getModel("medicalmodel").getData()[0].Nattreat=this.getView().byId("nt").getValue();
			}
			
			else if(this.getView().getModel("medicalmodel").getData()[0].Zreqtyp==="5"){
				this.getView().getModel("medicalmodel").getData()[0].Claimtype=this.getView().byId("reqtype").getValue();
			}
			
			var data={
					   "Action": action,
						"Advamt": "0.00",
						"Cdate": Cdate,
						"Claimtype": this.getView().getModel("medicalmodel").getData()[0].Claimtype,
						"Desease": this.getView().byId("ndise").getValue(),
						"Doadmin": this.getView().getModel("medicalmodel").getData()[0].Doadmin,
						"Dodisch": this.getView().getModel("medicalmodel").getData()[0].Dodisch,
						"Empcomm": this.getView().byId("ecom").getValue(),
						"Estamount": this.getView().getModel("medicalmodel").getData()[0].Estamount,
						"Esthospdate": this.getView().getModel("medicalmodel").getData()[0].Esthospdate,
						"Facomments": this.getView().getModel("medicalmodel").getData()[0].Facomments,
						"Hcard": this.getView().byId("hcno").getValue(),
						"Hospital": this.getView().byId("addhos").getValue(),
						"HospitalLoc": this.getView().byId("hloc").getValue(),
						"Maname":this.getView().getModel("medicalmodel").getData()[0].Maname,
						"Mandt": this.getView().getModel("medicalmodel").getData()[0].Mandt,
						"Mcomments": this.getView().getModel("medicalmodel").getData()[0].Mcomments,
						"Medicaladv":this.getView().getModel("medicalmodel").getData()[0].Medicaladv,
						"Mpernr": this.getView().getModel("medicalmodel").getData()[0].Mpernr,
						"Mreqno": this.getView().getModel("medicalmodel").getData()[0].Mreqno,
						"Name": this.getView().byId("ename").getValue(),
						"Namerefhosp": this.getView().getModel("medicalmodel").getData()[0].Namerefhosp,
						"Nattreat": this.getView().getModel("medicalmodel").getData()[0].Nattreat,
						"Opreqno": this.getView().getModel("medicalmodel").getData()[0].Opreqno,
						"Passamt": this.getView().getModel("medicalmodel").getData()[0].Passamt,
						"Patient": this.getView().byId("pd").getValue(),
						"Payscale":this.getView().byId("paysc").getValue(),
						"Pernr": this.getView().byId("ecno").getValue(),
						"Preper": this.getView().getModel("medicalmodel").getData()[0].Preper,
						"Reimtype": this.getView().byId("reqtype").getValue(),
						"Sancamt": this.getView().getModel("medicalmodel").getData()[0].Sancamt,
						"Status": this.getView().getModel("medicalmodel").getData()[0].Status,
						"Waers": this.getView().getModel("medicalmodel").getData()[0].Waers,
						"Zreqno": this.getView().getModel("medicalmodel").getData()[0].Zreqno,
						"Zreqtyp": this.getView().getModel("medicalmodel").getData()[0].Zreqtyp,
						"Onlydisplay":this.getView().getModel("medicalmodel").getData()[0].Onlydisplay,
						"Advamt":this.getView().getModel("medicalmodel").getData()[0].Advamt
					
			}
			
			var medicalservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/");
	 	       var t=this;
	 	       	   medicalservice.create("/medicalSet",data,{
	 				   success:function(odata){
	 					var reqNum = odata.Zreqno;
	 					sap.ui.getCore().getModel("AttachModel").setProperty("/Single_Record",odata)
	 					t.prepareAttachment(reqNum)
	 							
	 					 
	 					  new sap.m.MessageBox.success("Requset NO '"+odata.Zreqno+"' Succesfully Created", {
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
	 				   },

	 					
	 				   
	 				   error:function(evt){
	 					 
	 		 					 	var msg = $(evt.response.body).find('message').first().text();
		 					  
								
		 					  new sap.m.MessageBox.error(msg);
	 		 					 
	 		 				   	
	 				   }
	 			   });
			
			
			
			
			
			
		},
		
		
		Save:function(){
	      var r=this.value;
 	       	
			var  msg="Are you sure, want to Save?";
			MessageBox.show(msg, {
				icon: MessageBox.Icon.WARNING,
				title: "Confirmation",
				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						this.validations("S");						
					}
				}.bind(this)
			});
		},
		Submit:function(evt){
			var r=this.value;
			var  msg="Are you sure, want to Submit?";
			MessageBox.show(msg, {
				icon: MessageBox.Icon.WARNING,
				title: "Confirmation",
				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
				onClose: function(oAction) {
					if(oAction=="YES"){
						this.validations("B");						
					}
				}.bind(this)
			});
		},
        
        
        
        backpage:function(evt){
        	var router = this.getOwnerComponent().getRouter();
			router.navTo("dashboard", {
				
			});
        },
        
      
        
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ZMedical_App.ZMedical_App.view.emp_medical_form
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ZMedical_App.ZMedical_App.view.emp_medical_form
		 */
			onAfterRendering: function() {
			
			},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ZMedical_App.ZMedical_App.view.emp_medical_form
		 */
		//	onExit: function() {
		//
		//	}

	});

});