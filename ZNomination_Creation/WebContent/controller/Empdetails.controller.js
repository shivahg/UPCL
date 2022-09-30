sap.ui.define([
	"ZENOC/zemployeenoc/controller/TransferDatatoBackend",
	
	"sap/m/MessageBox"
],
	
	function (Controller,MessageBox) {
		"use strict";

		return Controller.extend("ZENOC.zemployeenoc.controller.Empdetails", {
			onInit: function () {
			this.action="D";
			this.p;
			this.flag;
			this.itemrecord;      
			this.service=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_NOMINATION_SRV/");
			this.service1 = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_NOMINATION_APP_SRV");   
			   
			   
			   this.NominationmodelMod=new sap.ui.model.json.JSONModel();
			 
			  this.ObjNOC={};
			  
			this.NominationModel=new sap.ui.model.json.JSONModel(); 
		    this.getView().setModel(this.NominationModel,"NominationModel");
			 var oRouter=new sap.ui.core.UIComponent.getRouterFor(this);
	          oRouter.getRoute("Empdetails").attachPatternMatched(this.onObjectMatched,this);
	          
	     
	          
	         var  benifittype=[
	          {
	          "type": "BNGR:Gratuity Benefit",
	          "Key1":"BNGR"
	          },
	          {
	          "type": "BNPF:PF Benefit",
	          "Key1":"BNPF"
	          },
	          {
	          "type": "BNPN:Pension Benefit",
	          "Key1":"BNPN"
	          },
	          {
	          "type": "Z001:Commutation Benefit",
	          "Key1":"Z001"
	          },
	           {
	          "type": "Z002:Deceased Nomination",
	          "Key1":"Z002"
	          }
	          ]
	          
	          var benifitmodel=new sap.ui.model.json.JSONModel();
	          benifitmodel.setData(benifittype);
	          this.getView().setModel(benifitmodel,"benifitmodel");
	          
	          
         
	          
	           var data=[
	          {
	          "type":"Yes"
	          },
	          {
	          "type":"No"
	          },
	          ]
	             var handimodel=new sap.ui.model.json.JSONModel();
	        handimodel.setData(data);
	          this.getView().setModel(handimodel,"handimodel");
            },
            onObjectMatched:function(evt){
             this.getView().byId("nomi_det").setVisible(false);
           var reqno= evt.getParameter("arguments").reqno;
           var param= evt.getParameter("arguments").param;
           if(param==="C"){
             
				
           this.p=this.service;
           }
           else if(param==="A"){
           this.p=this.service1;
           }
             this.historydata(reqno,this.p);
           },
            
            
            
            
            historydata:function(reqno,srv){
            var t=this;
            srv.read("nomi_headSet('"+reqno+"')?$expand=nomi_itemSet",{
            success:function(odata){
            
            if(odata.Onlydispay==="X" || odata.ReqType==="M"){
            t.getView().byId("tbbenifittype").resetProperty("mode","");
            }
            
            if(odata.Action===""){
            t.btype2 =  sap.ui.xmlfragment("ZENOC.zemployeenoc.fragments.benifit_type",t);
			t.getView().addDependent(t.btype2);
				t.btype2.open();
            }
            
            var set=odata.nomi_itemSet.results;
           
            for(var i=0;i<set.length;i++){
            delete set[i].__metadata;
            set[i].Dat01=new Date(set[i].Dat01);
            }
            
            t.getView().getModel("NominationModel").setData(odata);
            
			t.getView().getModel("NominationModel").setProperty("/nomi_itemset",odata.nomi_itemSet.results);
             
            
            }
            });
            
            },
            
              statusColor:function(status){
             switch (status) {
					case "Pending for approval":
						return 1;
					case "Approved":
						return 6;
					case "Rejected":
					return 3;
						
				}
            },
            
            statusColorbtype:function(btype){
             switch (btype) {
					case "BNGR:Gratuity Benefit":
						return 7;
					case "BNPF:PF Benifit":
						return 2;
					case "BNPN:Pension Benefit":
					return 3;
					case "Z001:Commutation Benifit":
					return 4;
					case "Z002:Deceased Nomination":
					return 9;
						
				}
            },
            
            
        btype_selection:function(val){
        debugger;
        
         this.getView().byId("tbbenifittype").setProperty("mode","Delete");
              var val=val.getSource().getTitle();
             var Btype=val.slice(0,4);
             
              var t=this;
            t.service.read("nomi_itemSet?$filter=Bntyp eq '"+Btype+"'",{
            success:function(odata){
           
            
            for(var i=0;i<odata.results.length;i++){
            delete odata.results[i].__meatadata;
            
            odata.results[i].Dat01=new Date(odata.results[i].Dat01);
            }
            
            t.getView().getModel("NominationModel").setProperty("/nomi_itemset",odata.results);
            t.getView().byId("infobtyp").setText(val);
                     t.getView().getDependents()[0].close();
	                 t.getView().getDependents()[0].destroy();
             
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
            navtodashboard:function(){
            var t=this;
             t.getView().getDependents()[0].close();
	         t.getView().getDependents()[0].destroy();
            var r=t.getOwnerComponent().getRouter();
		    r.navTo("Dashboard"); 	
            },
            
            Create_Nominee:function(evt){
            var t=this;
            t.flag="";
            var arr=[];
            var obj={};
            arr.push(obj);
            t.NominationmodelMod.setData(arr);
           t.fragment =  sap.ui.xmlfragment("ZENOC.zemployeenoc.fragments.create_nominee",t);
			t.getView().addDependent(t.fragment);
				t.fragment.open();
            
            },
            close_nomineedetails:function(evt){
            this.getView().getDependents()[0].close();
			this.getView().getDependents()[0].destroy();
			
            },
            Add_nomineedetails:function(evt){
            var t=this;
         
           var Arraydata= t.getView().getModel("NominationModel").getProperty("/nomi_itemset");
           
         
            t.ObjNOC.Zznominee1=sap.ui.getCore().byId("NM").getValue();
            t.ObjNOC.Rel01=sap.ui.getCore().byId("Rel").getValue();
            t.ObjNOC.Add01=sap.ui.getCore().byId("Nadd").getValue();
            t.ObjNOC.Dat01=new Date(sap.ui.getCore().byId("dob").getDateValue());
            t.ObjNOC.Shp01=sap.ui.getCore().byId("share").getValue();
            t.ObjNOC.Gra01=sap.ui.getCore().byId("ga").getValue();
            t.ObjNOC.Zzpanno1=sap.ui.getCore().byId("panno").getValue();
            t.ObjNOC.Zzadharno1=sap.ui.getCore().byId("an").getValue();
            t.ObjNOC.Zzbankname1=sap.ui.getCore().byId("bn").getValue();
            t.ObjNOC.Zzifsc1=sap.ui.getCore().byId("ifsc").getValue();
            t.ObjNOC.Zzhandicap1=sap.ui.getCore().byId("hc").getSelectedKey();
            
           /* var m,n;
             var validMsg = t.handlevalidations();
			if(validMsg.messagetype=="E"){
			
             new sap.m.MessageBox.warning(validMsg.message);
			}*/
			
			
             var t=this;
             new sap.m.MessageBox.confirm("Are You Sure Add the Nominee in Nomination table",{
		 title: "Confirmation",
			    				actions: [MessageBox.Action.OK,MessageBox.Action.CANCEL],
			    				onClose: function(oAction) {
			    					if(oAction==="OK"){
			    					 if(this.flag==="X"){
			    					 Arraydata[this.itemrecord]=(t.ObjNOC);
			    					 t.ObjNOC={};
			    					 }
			    					 else{
			    					Arraydata.push(t.ObjNOC);
                                      t.ObjNOC={};
			    					}
			    						 t.getView().getModel("NominationModel").setProperty("/nomi_itemset",Arraydata);
			    						 
			    					   t.getView().getDependents()[0].close();
			                           t.getView().getDependents()[0].destroy();
			                         						
			    					}
			    					else if(oAction==="CANCEL"){
			    					ObjNoc={};
			    					   t.getView().getDependents()[0].close();
			                            t.getView().getDependents()[0].destroy();
			                              
			    					}
			    				}.bind(this)
		 
		 });
           
             },
             
             handleDelete:function(e){
             debugger;
             var id1=this.getView().byId("nomi_det");
             	var path=e.getParameter('listItem').getBindingContextPath();
			var idx=parseInt(path.substring(path.lastIndexOf('/') +1));
			 var tab = this.getView().byId("tbbenifittype").getModel("NominationModel");
			sap.m.MessageBox.confirm("Are You Sure To Delete Record", {
             title: "Confirm",                                    // default
                                     
    styleClass: "",                                      // default
    actions: [ sap.m.MessageBox.Action.OK,
               sap.m.MessageBox.Action.CANCEL ],         // default
    emphasizedAction: sap.m.MessageBox.Action.OK,        // default
    initialFocus: null,                                  // default
    textDirection: sap.ui.core.TextDirection.Inherit ,
      onClose:function(evt){
      	if(evt === "OK"){
      		var del= tab.getData().nomi_itemset.splice(idx,1);
         tab.refresh(true);
         id1.setVisible(false);
      	}
      }
});
             },
             
             extendreqtype:function(evt){
             debugger;
             this.getView().byId("nomi_det").setVisible(true);
             this.itemrecord=parseInt(evt.oSource.oBindingContexts.NominationModel.sPath.slice(14));
             
             var data=this.getView().getModel("NominationModel").getData().nomi_itemset[this.itemrecord];
             
             var btypemodel=new sap.ui.model.json.JSONModel();
	        btypemodel.setData(data);
	          this.getView().setModel(btypemodel,"btypemodel");
	          
	     
          /* this.fragment =  sap.ui.xmlfragment("ZENOC.zemployeenoc.fragments.moredetails",this);
			this.getView().addDependent(this.fragment);
				this.fragment.open();*/
           
             },
             
             close_btype:function(){
             this.getView().getDependents()[0].close();
			this.getView().getDependents()[0].destroy();
             },
             
             Modify_record:function(evt){
             
              debugger;
              
              this.flag="X"
              this.getView().byId("nomi_det").setVisible(false);
             this.itemrecord=parseInt(evt.getSource().oPropagatedProperties.oBindingContexts.NominationModel.sPath.slice(14));
             
             var data=this.getView().getModel("NominationModel").getData().nomi_itemset[this.itemrecord];
             
             
	        this.NominationmodelMod.setData(data);
	          this.getView().setModel(this.NominationmodelMod,"NominationmodelMod");
	          
	     
          
				
           this.fragment =  sap.ui.xmlfragment("ZENOC.zemployeenoc.fragments.create_nominee",this);
			this.getView().addDependent(this.fragment);
				this.fragment.open();
             
             },
             
     ///////////////////////////////////////////////////////////////        
             TransferdatatoBackend:function(data){
             
             var t=this;
			
				   
	     if(data.Action === "T" && t.getView().byId("tbbenifittype").getItems().length==0){
	    MessageBox.warning("Please Add Nominee Details");
	    }
	    else if(data.Zlevel==="1" && t.getView().byId("A1").getValue()===""){
	    MessageBox.warning("Please Fill Approver 1 Comments");
	    }   
	     else if(data.Zlevel==="2" && t.getView().byId("A2").getValue()===""){
	    MessageBox.warning("Please Fill Approver 2 Comments");
	    } 
	      else{
	       t.p.create("/nomi_headSet",data,{
	    	   success:function(odata,response){
	    		        t.getView().getModel("NominationModel").getData().Action=odata.Action;
	    			  if(odata.Action === "S"){
	    			   t.getView().getModel("NominationModel").getData().Zreqno=odata.Zreqno;
	    			  let status= odata.Status;
	    			  let reqno=odata.Zreqno;
	    			   t.getView().byId("sts").setText(status);
	    			  t.getView().byId("reqs").setText(reqno);
	    				   MessageBox.success("Nomination Request No: '"+odata.Zreqno+"' Saved Succesfully", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.OK],
		    				onClose: function(oAction) {
		    					if(oAction=="OK"){
		    						  						
		    					}
		    				}.bind(this)
		    			});
             
             }
             else if(odata.Action==="T"){
             MessageBox.success("Nomination Request No: '"+odata.Zreqno+"' Submitted Succesfully", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.OK],
		    				onClose: function(oAction) {
		    					if(oAction=="OK"){
		    						 var r=t.getOwnerComponent().getRouter();
		    						 r.navTo("Dashboard"); 						
		    					}
		    				}.bind(this)
		    			});
             }
               else if(odata.Action==="B"){
             MessageBox.warning("Nomination Request No: '"+odata.Zreqno+"' ReferBacked ", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.OK],
		    				onClose: function(oAction) {
		    					if(oAction=="OK"){
		    						 var r=t.getOwnerComponent().getRouter();
		    						 r.navTo("Dashboard"); 						
		    					}
		    				}.bind(this)
		    			});
             }
               else if(odata.Action==="A"){
             MessageBox.success("Nomination Request No: '"+odata.Zreqno+"' Approved Succesfully", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.OK],
		    				onClose: function(oAction) {
		    					if(oAction=="OK"){
		    						 var r=t.getOwnerComponent().getRouter();
		    						 r.navTo("Dashboard"); 						
		    					}
		    				}.bind(this)
		    			});
             }
             else if(odata.Action==="R"){
             MessageBox.error("Nomination Request No: '"+odata.Zreqno+"' Rejected", {
		    				icon: MessageBox.Icon.success,
		    				title: "Confirmation",
		    				actions: [MessageBox.Action.OK],
		    				onClose: function(oAction) {
		    					if(oAction=="OK"){
		    						 var r=t.getOwnerComponent().getRouter();
		    						 r.navTo("Dashboard"); 						
		    					}
		    				}.bind(this)
		    			});
             }
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
							});}
            });
            }
             },
             
             
            ////////////////////////////////////////////////////////////////////////////////////// 
             
               		save:function(evt){
                            MessageBox.warning(" Are You Sure Want To Save", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.sendbackenddata("S");
		    					}
		    				}.bind(this)
		    			});
		    			},
		    			
		    			
		    			submit:function(evt){
                            MessageBox.warning(" Are You Sure Want To Submit", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.sendbackenddata("T");
		    					}
		    				}.bind(this)
		    			});
		    			},
		    		onReject:function(evt){
                            MessageBox.warning(" Are You Sure Want To Reject", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.sendbackenddata("R");
		    					}
		    				}.bind(this)
		    			});
		    			},
		    			
		    			
		    			onApprove:function(evt){
                            MessageBox.warning(" Are You Sure Want To Approve", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.sendbackenddata("A");
		    					}
		    				}.bind(this)
		    			});
		    			},
		    			ReferBack:function(evt){
                            MessageBox.warning(" Are You Sure Want To ReferBack", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	this.sendbackenddata("B");
		    					}
		    				}.bind(this)
		    			});
		    			},
		    			
            backnav:function(){
            
             var action=this.getView().getModel("NominationModel").getData().Action;
            
            if(action===""){
            
             MessageBox.warning("Are you Sure GO Back Without Action Data May Loss", {
		    				icon: MessageBox.Icon.warning,
		    				title: "Warning",
		    				actions: [MessageBox.Action.YES,MessageBox.Action.NO],
		    				onClose: function(oAction) {
		    					if(oAction=="YES"){
		    						 	
		    						 	  var router=this.getOwnerComponent().getRouter();
                                          router.navTo("Dashboard");
		    					}
		    					
		    					else if(oAction=="No"){
		    					
		    					}
		    				}.bind(this)
		    			});
            
            }
            else {
                    var router=this.getOwnerComponent().getRouter();
                     router.navTo("Dashboard");
            }
            
            }
		});
	});
