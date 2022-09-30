sap.ui.define([
	"ZPMS/ZPMS/Controller/TransferData",
	
	"sap/m/MessageBox"
	/*"./zpms/zpms/model/s3s4per"*/
	
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.pmspage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZPMS.ZPMS.view.pmspage
		 */
		onInit: function () {
         this.flag="X";
       var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
	          oRouter.getRoute("pmspage").attachPatternMatched(this.onObjectMatched,this);
	          this.Aobj={},this.pobj={},this.period=[];
	          this.AppreciationHonours=[] 
	          this.dobj={},this.dc=[];
	          this.pmsdetails={};
	          this.p=0;
	          
	          var obj={
						
						pmsdetails:[],
						AppreciationHonours:[{}],
						pms_acrSet: [{}],
                        pms_caseSet:[],
                        pms_honoursSet:[],
                        pms_kpiSet: [{}],
                        pms_leavesSet:[{}],
                        pms_perappSet:[],
                        pms_s3c1Set: [{}],
                        pms_s3c2Set:[{}],
                        pms_trainingSet:[{}]
						
				};
				this.pmsmodel1=new sap.ui.model.json.JSONModel(obj);
				this.getView().setModel(this.pmsmodel1,"pmsmodel");
				
				this.pmsmodel=this.getView().getModel("pmsmodel");
	     
				
		},
		
		homepage:function(){
		var router = this.getOwnerComponent().getRouter();
		router.navTo("Dashboards");
		
		},
		
		onObjectMatched:function(evt){
			 this.pmsmodel=this.getView().getModel("pmsmodel");
			 
			 this.Apid=evt.getParameter("arguments").Apid;
			 
			 debugger;
			//reporting data//
			/*var pmsdetailsre=new sap.ui.model.json.JSONModel();	 
		       pmsdetailsre.loadData("ZPMS.ZPMS.model/reporting.json");
		       this.getView().setModel(pmsdetailsre,"pmsdetails");*/
			 
			 var pmsmodelpath=jQuery.sap.getModulePath("ZPMS.ZPMS","/model/reporting.json");
		       
			 var modeld=new sap.ui.model.json.JSONModel(pmsmodelpath);
			 this.getView().setModel(modeld,"pmsdetails");
		       
		       //***************************************************
			var periods=[{
				"leave":"On leave"
			},
			{
				"leave":"Period of Absence"
			}
			];
		var period=new sap.ui.model.json.JSONModel();	 
       period.setData(periods);
       this.getView().setModel(period,"period");
       
    //*************************************************************grading points**************
       var perpath=jQuery.sap.getModulePath("ZPMS.ZPMS","/model/s3s4per.json");
       var gp=new sap.ui.model.json.JSONModel(perpath);
       this.getView().setModel(gp,"gpi");
       
    
       var gradingpath=jQuery.sap.getModulePath("ZPMS.ZPMS","/model/grading.json");
       var gradingss=new sap.ui.model.json.JSONModel(gradingpath);	 
       
       this.getView().setModel(gradingss,"gradings1");
       
     var yesno=[{
    	 "action":"Yes"
    	},
    	{
    		"action":"No"
    	}]
       
     
 	var action=new sap.ui.model.json.JSONModel();	 
     action.setData(yesno);
     this.getView().setModel(action,"Action");
     
     
     
     
     
 /*    var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
		pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
			success:function(response){
				
				
				var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
				response.Zzdob=frmt.format(new Date(response.Zzdob));
				
			
			
				pmsmodel.setProperty("/pmsdetails",response);
				pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
				pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
				pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
				pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
				pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
			    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
			    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
			    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
			    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
			    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
			    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
			},
		   
		});*/
     
     
     
     
     
       var section=1;
		 
       this.section =section + parseInt(evt.mParameters.arguments.s1);
       
       
       switch(this.section){
       case 1 : this.section1(1);
       break;
       case 2 : this.section2(2);
       break;
       case 3 : this.section3(3);
       break;
       case 4 : this.section4(4);
       break;
       case 5 : this.section5(5);
       break;
       case 6: this.section6(6);
       break;
       }
       
		},
		
		
		
		
	
       
       
		
		
       
       
		
			//S1******************************************
			section1:function(oEvent){
				var pmsmodel=this.getView().getModel("pmsmodel");
				debugger;
				this.getView().byId("p1").setVisible(true);
				this.getView().byId("p2").setVisible(false);
				this.getView().byId("p3").setVisible(false);
				this.getView().byId("p4").setVisible(false);
				this.getView().byId("p5").setVisible(false);
				this.getView().byId("p6").setVisible(false);
				var t=this;
				
				 var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
				pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
					success:function(response){
						//t.AppreciationHonours=[];t.period=[];
						response.Zzrole="1"
						var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
						response.Zzdob=frmt.format(new Date(response.Zzdob));
						
					/*if( response.Zzsection==="S" || response.Zzsection==="T"){
						pmsmodel.setProperty("/pmsdetails",response);
						pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
						pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
						pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
						pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
						pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
					    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
					    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
					    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
					    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
					    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
					    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
					}
					else {*/
					
						pmsmodel.setProperty("/pmsdetails",response);
						pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
						pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
						pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
						pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
						pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
					    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
					    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
					    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
					    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
					    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
					    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
					},
					
				    error:function(response){
				    	new sap.m.MessageBox.error("error");
				    }
				});
				
				
				
				
			},
       
			
		section2:function(oevt){
			debugger
			var pmsmodel=this.getView().getModel("pmsmodel");
			this.getView().byId("p2").setVisible(true);
			this.getView().byId("p1").setVisible(false);
			this.getView().byId("p3").setVisible(false);
			this.getView().byId("p4").setVisible(false);
			this.getView().byId("p5").setVisible(false);
			this.getView().byId("p6").setVisible(false);
			
			var t=this;
			 var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
				pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
					success:function(response){
						
						response.Zzrole="2"
						/*for(var i=0;i<response.pms_caseSet.results.length;i++){
							delete response.pms_caseSet.results[i].__metadata;
							t.dobj.Perti=response.pms_caseSet.results[i].Perti;
							t.dobj.Amount=response.pms_caseSet.results[i].Amount;
							t.dobj.Paid=response.pms_caseSet.results[i].Paid;
							t.dobj.Reason=response.pms_caseSet.results[i].Reason;
							}
						t.dc.push(t.dobj);
						t.dobj={};*/
							
							/*if( response.Zzsection==="S" || response.Zzsection==="T"){
								pmsmodel.setProperty("/pmsdetails",response);
								pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
								pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
								pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
								pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
								pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
							    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
							    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
							    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
							    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
							    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
							    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
							}
							
							else {*/
							
						pmsmodel.setProperty("/pmsdetails",response);
						pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
						pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
						pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
						pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
						pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
					    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
					    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
					    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
					    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
					    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
					    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
					},
					
				    error:function(response){
				    	new sap.m.MessageBox.error("error");
				    }
				});
			
			
			
			
		},
			section3:function(oevt){
				debugger;
				var pmsmodel=this.getView().getModel("pmsmodel");
			this.getView().byId("p2").setVisible(false);
			this.getView().byId("p1").setVisible(false);
			this.getView().byId("p3").setVisible(true);
			this.getView().byId("p4").setVisible(false);
			this.getView().byId("p5").setVisible(false);
			this.getView().byId("p6").setVisible(false);
			
			  debugger;
		       var per=new sap.ui.model.json.JSONModel();
		       per.loadData("model/percentage.json");
		       this.getView().setModel(per,"percentage1");
			
			var t=this;
			 var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
				pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
					success:function(response){
						response.Zzrole="3"
					
							
							
							
							
							
							
					    for(var i=0;i<response.pms_trtopicSet.results.length;i++){

	                       	delete response.pms_trtopicSet.results[i].__metadata;
	                       }
					    
					    
					    for(var i=0;i<response.pms_trgradeSet.results.length;i++){

	                       	delete response.pms_trgradeSet.results[i].__metadata;
	                       }
					
					  /*  if( response.Zzsection==="S" || response.Zzsection==="T"){
							pmsmodel.setProperty("/pmsdetails",response);
							pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
							pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
							pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
							pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
							pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
						    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
						    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
						    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
						    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
						    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
						    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
						}
					    
					    
					    
					    else{*/
					    
					    
					    
					    pmsmodel.setProperty("/pmsdetails",response);
					    pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
						pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
						pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
						pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
						pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
					    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
					    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
					    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
					    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
					    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
					    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
					},
					
				    error:function(response){
				    	new sap.m.MessageBox.error("error");
				    }
				});
			
			
			
			
			
		},
	        section4:function(oevt){
	        	debugger;
	        	var pmsmodel=this.getView().getModel("pmsmodel");
			this.getView().byId("p2").setVisible(false);
			this.getView().byId("p1").setVisible(false);
			this.getView().byId("p3").setVisible(false);
			this.getView().byId("p4").setVisible(true);
			this.getView().byId("p5").setVisible(false);
			this.getView().byId("p6").setVisible(false);
			
			
			var t=this;
			var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
			pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
				success:function(response){
				
					response.Zzrole="4"
				    
				
						/*if( response.Zzsection==="S" || response.Zzsection==="T"){
							pmsmodel.setProperty("/pmsdetails",response);
							pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
							pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
							pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
							pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
							pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
						    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
						    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
						    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
						    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
						    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
						    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
						}
						
						else{*/
						
						
						
					pmsmodel.setProperty("/pmsdetails",response);
					pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
					pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
					pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
					pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
					pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
				    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
				    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
				    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
				    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
				    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
				    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
				    
				},
			    error:function(response){
			    	new sap.m.MessageBox.error("error");
			    }
			});
			
			
			
		},
	         section5:function(oevt){
	        	 
	         debugger;
	         var pmsmodel=this.getView().getModel("pmsmodel");
	        	 this.getView().byId("p2").setVisible(false);
	 			this.getView().byId("p1").setVisible(false);
	 			this.getView().byId("p3").setVisible(false);
	 			this.getView().byId("p4").setVisible(false);
	 			this.getView().byId("p5").setVisible(true);
	 			this.getView().byId("p6").setVisible(false);
	 			
	 			var t=this;
	 			var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
				pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
					success:function(response){
					
						response.Zzrole="5"
					   
							/*if( response.Zzsection==="S" || response.Zzsection==="T"){
								pmsmodel.setProperty("/pmsdetails",response);
								pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
								pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
								pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
								pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
								pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
							    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
							    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
							    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
							    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
							    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
							    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
							}
							else {*/
						pmsmodel.setProperty("/pmsdetails",response);
						pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
						pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
						pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
						pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
						pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
					    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
					    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
					    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
					    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
					    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
					    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
					    
					},
				    error:function(response){
				    	new sap.m.MessageBox.error("error");
				    }
				});
	         
		},
		
		section6:function(oevt){
			 var pmsmodel=this.getView().getModel("pmsmodel");
        	 this.getView().byId("p2").setVisible(true);
 			this.getView().byId("p1").setVisible(true);
 			this.getView().byId("p3").setVisible(true);
 			this.getView().byId("p4").setVisible(true);
 			this.getView().byId("p5").setVisible(true);
 			this.getView().byId("p6").setVisible(true);
 			
 			var t=this;
 			var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPMS_FIORI_APP_SRV");
			pmsservice.read("/pms_headSet('"+this.Apid+"')?$expand=pms_honoursSet,pms_leavesSet,pms_perappSet,pms_caseSet,pms_kpiSet,pms_trainingSet,pms_acrSet,pms_s3c1Set,pms_trgradeSet,pms_trtopicSet,pms_revass4Set,pms_revgrade4Set",{
				success:function(response){
				
					response.Zzrole="6"
						
						
						/*if( response.Zzsection==="S" || response.Zzsection==="T"){
							pmsmodel.setProperty("/pmsdetails",response);
							pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
							pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
							pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
							pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
							pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
						    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
						    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
						    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
						    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
						    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
						    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
						}
					
						else{*/
				
					pmsmodel.setProperty("/pmsdetails",response);
					pmsmodel.setProperty("/pms_honoursSet",response.pms_honoursSet.results);
					pmsmodel.setProperty("/pms_leavesSet",response.pms_leavesSet.results);
					pmsmodel.setProperty("/pms_perappSet",response.pms_perappSet.results);
					pmsmodel.setProperty("/pms_caseSet",response.pms_caseSet.results);
					pmsmodel.setProperty("/pms_acrSet",response.pms_acrSet.results);
				    pmsmodel.setProperty("/pms_kpiSet",response.pms_kpiSet.results);
				    pmsmodel.setProperty("/pms_trainingSet",response.pms_trainingSet.results);
				    pmsmodel.setProperty("/pms_trgradeSet",response.pms_trgradeSet.results);
				    pmsmodel.setProperty("/pms_trtopicSet",response.pms_trtopicSet.results);
				    pmsmodel.setProperty("/pms_revass4Set",response.pms_revass4Set.results);
				    pmsmodel.setProperty("/pms_revgrade4Set",response.pms_revgrade4Set.results);
				    
				},
			    error:function(response){
			    	new sap.m.MessageBox.error("error");
			    }
			});
		},
		Add:function(evt){
		var t= this;
		var pms_honoursSet=t.getView().getModel("pmsmodel").getProperty("/pms_honoursSet");
		/*var values=t.getView().getModel("pmsmodel").getData().pms_honoursSet;
		t.AppreciationHonours.push(values);*/
		/*t.Aobj.SN=sap.ui.getCore().byId("si").getValue();*/
		t.Aobj.Zzapptype=sap.ui.getCore().byId("ns").getValue();
		t.Aobj.Zzappbrief=sap.ui.getCore().byId("pd").getValue();
		/*t.Aobj.Zzreason=sap.ui.getCore().byId("rs").getValue();*/
		pms_honoursSet.push(t.Aobj);
									t.Aobj={};
		
		
		 new sap.m.MessageBox.confirm("Are You Sure Add the Record in Appreciation table",{
		 title: "Confirmation",
			    				actions: [MessageBox.Action.OK,MessageBox.Action.CANCEL],
			    				onClose: function(oAction) {
			    					if(oAction==="OK"){
			    						t.getView().getModel("pmsmodel").setProperty("/pms_honoursSet",pms_honoursSet);
			    						t.getView().getDependents()[0].close();
			    					t.getView().getDependents()[0].destroy();						
			    					}
			    					else if(oAction==="CANCEL"){
			    					t.getView().getDependents()[0].close();
			    					t.getView().getDependents()[0].destroy();
			    					}
			    				}.bind(this)
		 
		 });
		
		},
		
		dclose:function(evt){
		var t=this;
		t.getView().getDependents()[0].close();
			t.getView().getDependents()[0].destroy();
		},
		
		AppreciationHonours:function(){
		
			var t=this;
			
			 t.fragment =  sap.ui.xmlfragment("ZPMS.ZPMS.fragments.frag",t);
			this.getView().addDependent(t.fragment);
				t.fragment.open();
			},
		
		
		employeefrag:function(){
		var t=this;
		 t.fragment =  sap.ui.xmlfragment("ZPMS.ZPMS.fragments.emplyoee",t);
			this.getView().addDependent(t.fragment);
				t.fragment.open();
		},
		myview:function(){
			var t=this;
			 t.fragment =  sap.ui.xmlfragment("ZPMS.ZPMS.fragments.files",t);
				this.getView().addDependent(t.fragment);
					t.fragment.open();
		},
		
		handleDelete:function(e){
			var path=e.getParameter('listItem').getBindingContextPath();
			var idx=parseInt(path.substring(path.lastIndexOf('/') +1));
			 var tab = this.getView().byId("pms_honoursSet").getModel("pmsmodel");
			sap.m.MessageBox.confirm("Are You Sure SN '"+tab.getData().pms_honoursSet[0].SN+"' To Delete", {
    title: "Confirm",                                    // default
                                     
    styleClass: "",                                      // default
    actions: [ sap.m.MessageBox.Action.OK,
               sap.m.MessageBox.Action.CANCEL ],         // default
    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
    initialFocus: null,                                  // default
    textDirection: sap.ui.core.TextDirection.Inherit ,
      onClose:function(evt){
      	if(evt === "OK"){
      		var del= tab.getData().pms_honoursSet.splice(idx,1);
         tab.refresh(true);
      	}
      }
});
		},
		
		
		handleDeletecaseset:function(e){
			var path=e.getParameter('listItem').getBindingContextPath();
			var idx=parseInt(path.substring(path.lastIndexOf('/') +1));
			 var tab = this.getView().byId("actiontable10").getModel("pmsmodel");
			sap.m.MessageBox.confirm("Are You Sure SN  To Delete", {
    title: "Confirm",                                    // default
                                     
    styleClass: "",                                      // default
    actions: [ sap.m.MessageBox.Action.OK,
               sap.m.MessageBox.Action.CANCEL ],         // default
    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
    initialFocus: null,                                  // default
    textDirection: sap.ui.core.TextDirection.Inherit ,
      onClose:function(evt){
      	if(evt === "OK"){
      		var del= tab.getData().pms_caseSet.splice(idx,1);
         tab.refresh(true);
      	}
      }
});
		},
		checkboxcount1:function(a){
			debugger;
			var a;
			var a=this.getView().byId("pms_trtopicSet").getSelectedItems().length;
			return a;
		},
		close:function(evt){
		var t=this;
		t.getView().getDependents()[0].close();
		t.getView().getDependents()[0].destroy();
		},
		
		
		 handleUploadPress:function(evt){
		        debugger;
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
		 },
		
		addrec:function(evt){
			var t= this;
		/*var value=sap.ui.getCore().byId("si").getValue();
		t.pobj.SN=sap.ui.getCore().byId("si").getValue();*/
			
			
			var pms_perappSet = t.getView().getModel("pmsmodel").getProperty("/pms_perappSet")
		t.pobj.Zzsubdes=sap.ui.getCore().byId("ns").getValue();
		t.pobj.Zzperiod=sap.ui.getCore().byId("pd").getValue();
		t.pobj.Zzreason=sap.ui.getCore().byId("rs").getValue();
		pms_perappSet.push(t.pobj);
									t.pobj={};
									
									
									
									
									
		
		
		 new sap.m.MessageBox.confirm("Are You Sure Add the  Record in Performance Details table",{
		 title: "Confirmation",
			    				actions: [MessageBox.Action.OK,MessageBox.Action.CANCEL],
			    				onClose: function(oAction) {
			    					if(oAction==="OK"){
			    				
			    						t.getView().getModel("pmsmodel").setProperty("/pms_perappSet",pms_perappSet);
			    						t.getView().getDependents()[0].close();
			    					t.getView().getDependents()[0].destroy();						
			    					}
			    					else if(oAction==="CANCEL"){
			    					t.getView().getDependents()[0].close();
			    					t.getView().getDependents()[0].destroy();
			    					}
			    				}.bind(this)
		 
		 });
		               
		},
		addperformance:function(evt){
		var t=this;
			
			 t.fragmentp =  sap.ui.xmlfragment("ZPMS.ZPMS.fragments.pad",t);
			this.getView().addDependent(t.fragmentp);
				t.fragmentp.open();
			
			
			
			/*var t=this;
			var dialogbox=	new sap.m.Dialog({
					title:"Performance Appraisals",
					content:[
						new sap.ui.layout.form.SimpleForm({
							title:"Performance Appraisals� of sub-ordinates ",layout:"ResponsiveGridLayout",
							editable:true,
							content:[
								new sap.m.Label({text:"SerialNo",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Name of Sub-ordinate with Designation",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Period",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Reason",design:"Bold"}),
								new sap.m.Input({})
								]
						})
						],
						buttons:[
							new sap.m.Button({
								text:"OK",
								press:function(evt){
	                               var pmsmodel=t.getView().getModel("pmsmodel")
									
									
	                                var val1=evt.oSource.oParent.mAggregations.content[0]._aElements[1].mProperties.value;
	                                 var Zzsubdes=evt.oSource.oParent.mAggregations.content[0]._aElements[3].mProperties.value;
	                                 var Zzperiod=evt.oSource.oParent.mAggregations.content[0]._aElements[5].mProperties.value;
	                                 var Zzreason=evt.oSource.oParent.mAggregations.content[0]._aElements[7].mProperties.value;
	                                  if(Zzsubdes===""){
		                              new sap.m.MessageBox.warning(" Please Fill Name of Sub-ordinate with Designation")
	                                      }
	                                  else if(Zzperiod===""){
		                               new sap.m.MessageBox.warning("Please Fill Period")
	                                      }
	                                  else if(Zzreason===""){
			                               new sap.m.MessageBox.warning(" Please Fill Reason")
		                                      }
	                                  else{
	                                  t.pobj.SN=val1;
									t.pobj.name=Zzsubdes;
									t.pobj.period=Zzperiod;
									t.pobj.reason=Zzreason;
									t.period.push(t.pobj);
									t.pobj={};
	                                  }
									
									pmsmodel.setProperty("/pms_perappSet",t.period);
									
									dialogbox.close();
								}
							}),
							new sap.m.Button({
								text:"Close",
								press:function(){
									dialogbox.close();
								}
							})
							]
					
				});
				this.getView().addDependent(dialogbox);
				dialogbox.open();*/
		},
		handleDeleteperiod:function(e){
			var path=e.getParameter('listItem').getBindingContextPath();
			var idx=parseInt(path.substring(path.lastIndexOf('/') +1));
			 var tab = this.getView().byId("pms_perappSet").getModel("pmsmodel");
        
 		sap.m.MessageBox.confirm("Are You Sure SN'"+tab.getData().pms_perappSet[0].SN+"' To Delete", {
 		    title: "Confirm",                                    // default
 		                                     
 		    styleClass: "",                                      // default
 		    actions: [ sap.m.MessageBox.Action.OK,
 		               sap.m.MessageBox.Action.CANCEL ],         // default
 		    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
 		    initialFocus: null,                                  // default
 		    textDirection: sap.ui.core.TextDirection.Inherit ,
 		      onClose:function(evt){
 		      	if(evt === "OK"){
 		      	 var del= tab.getData().pms_perappSet.splice(idx,1);
 		         tab.refresh(true);
 		      	}
 		      }
 		});
		},
		detailofcases:function(evt){
			var t=this;
			var dialogbox=	new sap.m.Dialog({
					title:"Detail Of Cases",
					content:[
						new sap.ui.layout.form.SimpleForm({
							title:"Detail Of Cases ",layout:"ResponsiveGridLayout",
							editable:true,
							content:[
								
								new sap.m.Label({text:"Details of cases",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Amount paid as penalty(in Rs)",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Paid by Corporation or Incumbent",design:"Bold"}),
								new sap.m.Input({}),
								new sap.m.Label({text:"Reason",design:"Bold"}),
								new sap.m.Input({})
								]
						})
						],
						buttons:[
							new sap.m.Button({
								text:"OK",
								press:function(evt){
	                               var pmsmodel=t.getView().getModel("pmsmodel")
									
									var pms_caseSet=t.getView().getModel("pmsmodel").getProperty("/pms_caseSet");
	                                
	                                 var Perti=evt.oSource.oParent.mAggregations.content[0]._aElements[3].mProperties.value;
	                                 var Amount=evt.oSource.oParent.mAggregations.content[0]._aElements[5].mProperties.value;
	                                 var Paid=evt.oSource.oParent.mAggregations.content[0]._aElements[7].mProperties.value;
	                                 var Reason=evt.oSource.oParent.mAggregations.content[0]._aElements[7].mProperties.value;
	                                 //values are not valid//
	                               /*   if(Zzsubdes===""){
		                              new sap.m.MessageBox.warning(" Please Fill Name of Sub-ordinate with Designation")
	                                      }
	                                  else if(Zzperiod===""){
		                               new sap.m.MessageBox.warning("Please Fill Period")
	                                      }
	                                  else if(Zzreason===""){
			                               new sap.m.MessageBox.warning(" Please Fill Reason")
		                                      }*/
	                                  
	                                 
									t.dobj.Perti=Perti;
									t.dobj.Amount=Amount;
									t.dobj.Paid=Paid;
									t.dobj.Reason=Reason;
									pms_caseSet.push(t.dobj);
									t.dobj={};
	                                  
									
									pmsmodel.setProperty("/pms_caseSet",pms_caseSet);
									
									dialogbox.close();
								}
							}),
							new sap.m.Button({
								text:"Close",
								press:function(){
									dialogbox.close();
								}
							})
							]
					
				});
				this.getView().addDependent(dialogbox);
				dialogbox.open();
			
		},
		backpage:function(){
			var router=this.getOwnerComponent().getRouter();
			router.navTo("detail");
		},
		
		
		sgp:function(evt){
			
			var v;
			v=evt.mParameters.id;
			v=v.slice(12);
			this.getView().getModel("pmsmodel").getData().pmsdetails.Zgrsa=v;
		},
		s3Zkpiagg:function(evt){
			debugger;
			var a=evt.mParameters.id;
			a=a.slice(12);
			if(a === "Yes"){
				this.getView().getModel("pmsmodel").getData().pmsdetails.Zkpiagg="Yes";
			}
			else if(a === "No"){
				this.getView().getModel("pmsmodel").getData().pmsdetails.Zkpiagg="No";
			}
		},
		Trainingtopics:function(evt){
		/*	var fragment= sap.ui.htmlfragment("ZPMS.ZPMS.fragments.trainingtopics",this);
			this.getView().addDependent(this.fragment);
			this.fragment.open();*/
			
			
			var t=this;
			 t.fragment =  sap.ui.xmlfragment("ZPMS.ZPMS.fragments.trainingtopics",t);
				t.getView().addDependent(t.fragment);
					t.fragment.open();
		},
		selfpercentage:function(evt){
			var m=10;
			
			this.getView().getModel("pmsmodel").getData().pms_kpiSet
		},
		
		
		SSelfgrading:function(evt){
			debugger;
			
			var gradings=parseInt(evt.getSource().getValue());
			
			var v;
			
		     var value=this.grading(gradings);
			
			
			var kpidata=this.getView().getModel("pmsmodel").getData();
			
			this.p=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.pmsmodel.sPath.slice(12));
			for(this.p;this.p<kpidata.pms_kpiSet.length;){
				 
				kpidata.pms_kpiSet[this.p].Grading=value;
				break;
				
			}
			 
			 var a=this.getView().getModel("pmsmodel")
			a.refresh(true);
			
		},
		
		
		SSelftraining:function(evt){
            debugger;
			
			//var gradings=parseInt(evt.getSource().getValue());
            var gradings=parseInt(evt.getSource().getValue());
			
			var v;
			
		     var value=this.grading(gradings);
			
			
			var traingdata=this.getView().getModel("pmsmodel").getData();
			
			/*this.p=parseInt(evt.mParameters.id.slice(34));*/
			this.p=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.pmsmodel.sPath.slice(17));
			for(this.p;this.p<traingdata.pms_trainingSet.length;){
				 
				traingdata.pms_trainingSet[this.p].Grade=value;
				break;
				
			}
			 
			 var a=this.getView().getModel("pmsmodel")
			a.refresh(true);
		},
		
		
		grading(gradings){
			var v;
			if((gradings>100)){
				v="10";
			}
			else if((gradings<=100)&&(gradings>95)){
					v="9";
				}
				else if((gradings<=95)&&(gradings>90)){
				        v="8";	
				}
				
				else if((gradings<=90)&&(gradings>85)){
					v="7";
				}
				else if((gradings<=85)&&(gradings>80)){
					v="6";
				}
				
				else if((gradings<=80)&&(gradings>75)){
					v="5";
				}
				else if((gradings<=75)&&(gradings>70)){
					v="4"
				}
				
				if((gradings<=70)&&(gradings>65)){
					v="3";
				}
				else if((gradings>60)&&(gradings<=65)){
					
					v="2";
				}
				else if(gradings<60){
					v="1"
				}
				
				return v;
		},
		
		//****************************************************************//
		senddata:function(senddata){
		
			var t=this;
			
			var section=senddata.Zzsection;
	       
	       var pmsservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/SAP/ZPMS_FIORI_APP_SRV/");
	       pmsservice.create("pms_headSet",senddata,{
	    	   success:function(odata,response){
	    		   var promise=new Promise(function(resolved,rejected){
	    			   if(section==="T"){
	    				   setTimeout(function(){ resolved(" Submitted Succesfully"); }, 3000);
		    			   
		    		
		    		  
		    			
		    			MessageBox.success(" Appraisal ID '"+odata.ZzappraisalId+"'Submitted Succesfully", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 var oRouter=t.getOwnerComponent().getRouter();
		    							oRouter.navTo("Dashboards");						
		    					}
		    				}.bind(this)
		    			});
		    		  
		    		  
		    		 
		    		   }
	    			   else{
	    				   resolved("Saved Succesfully");
		    			   
	    				   
		    			   MessageBox.success(" Appraisal ID '"+odata.ZzappraisalId+"'Saved Succesfully", {
			    				icon: MessageBox.Icon.success,
			    				title: "Confirmation",
			    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
			    				onClose: function(oAction) {
			    					if(oAction=="YES"){
			    						 var oRouter=t.getOwnerComponent().getRouter();
			    							oRouter.navTo("Dashboards");						
			    					}
			    				}.bind(this)
			    			});
		    			  
		    		   }
	    		   })
	    		   
	    		   promise.then(function(param){
		    		   	console.log(param);
		    		   })
	    	   },
	    	   error:function(response){
	    		   var message=response;
					var msg=$(message.response.body).find('message').first().text();
					var action="OK";
					var t=this;
					MessageBox.error(msg,{
						
						onClose:function(){
							if(action==="OK"){
								var oRouter=this.getOwnerComponent().getRouter();
                     oRouter.navTo("Dashboards");
							}
						}
					});
	    	   }
	       })
		},
		
		Save:function(evt){
		
		MessageBox.warning(" Are You Sure Want To Save", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.getdata("S");
		    					}
		    				}.bind(this)
		    			});
		},
		
		
		validations:function(evt){
			
		},
		
		Submit:function(evt){
			var len;
			var a;
			 len=this.checkboxcount1(a);
			
			
			   
	           /////////////////////////////////////////////////////////
        	var kpiset=this.getView().getModel("pmsmodel").getData().pms_kpiSet;
        	
        	var pmstrainingSet=this.getView().getModel("pmsmodel").getData().pms_trainingSet;
     
        if(this.getView().getModel("pmsmodel").getData().pmsdetails.Zzrole==="2" && this.flag==="X" ){
        for(var i=0;i<kpiset.length;i++){
              
              if(kpiset[i].TargetP ===""){
            	  this.flagx="X";
              	new sap.m.MessageBox.warning("Please Enter KPI Table '"+kpiset[i].Name1+"'  %percentage");
              	break;
              }
              else{
            	  this.flagx="";
              }
          
        }
        
        
        for(var k=0;k<pmstrainingSet.length;k++){
        	if(pmstrainingSet[k].Patmandays === ""){
        		 this.flagy="X";
        		new sap.m.MessageBox.warning("Please Enter Training Table '"+pmstrainingSet[k].Paramete+"'  %percentage");
              	break;
        		}
        	else{
        		this.flagy="";
        	}
        	}
        
           if (this.flagx === "" &&  this.flagy === ""){
        	 this.flag="";
        	 MessageBox.warning(" Are You Sure Want To Submit", {
 				icon: MessageBox.Icon.warning,
 				title: "Warning",
 				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
 				onClose: function(oAction) {
 					if(oAction=="YES"){
 						 	
 						 	this.getdata("T");
 					}
 				}.bind(this)
 			});
        }
        }
        
        
        else if(this.getView().getModel("pmsmodel").getData().pmsdetails.Zzrole==="3" && len<4){
        	new sap.m.MessageBox.warning("Please Select Maximum 4 Training Topics");
        }
        
        
        	else{	
			
			MessageBox.warning(" Are You Sure Want To Submit", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.getdata("T");
		    					}
		    				}.bind(this)
		    			});
			
			
		}
		}
	});

});