sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageBox"
], function (Controller,BusyIndicator,MessageBox) {
	"use strict";

	return Controller.extend("ZENOC.zemployeenoc.controller.TransferDatatoBackend", {
	    sendbackenddata:function(action){
	    
	     var autorzn=this.getView().getModel("NominationModel").getData().ReqType;
	     ////////////////date validations////////////////////////////
	     
	    var nomi_itemSet=this.getView().getModel("NominationModel").getData().nomi_itemset;
	    
	    
	          for(var i=0;i<nomi_itemSet.length;i++){
	          delete nomi_itemSet[i].__metadata;
	          if((nomi_itemSet[i].Dat01==="")||(nomi_itemSet[i].Dat01===null)){
					nomi_itemSet[i].Dat01=null;
				}
				else {
				var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"yyyy/MM/dd"});
				 nomi_itemSet[i].Dat01=frmt.format(new Date(nomi_itemSet[i].Dat01));
				nomi_itemSet[i].Dat01=new Date(nomi_itemSet[i].Dat01);
				nomi_itemSet[i].Dat01= new Date(nomi_itemSet[i].Dat01.setHours("00","00","00","00"));
		       nomi_itemSet[i].Dat01 = new Date(nomi_itemSet[i].Dat01.getTime() + nomi_itemSet[i].Dat01.getTimezoneOffset() * (-60000));
		       nomi_itemSet[i].Dat01=nomi_itemSet[i].Dat01;
				}
	          }
	    
	    
	          ////////nominee table validation during submission time////
        var msg="";
        var counter=1;
        var type;
                 
                 var nomi_itemset=this.getView().getModel("NominationModel").getData().nomi_itemset;
                   
                   if( autorzn!=="M"){
                    if(action === "T"){
                    for(var i=0;i<nomi_itemset.length;i++){
			        var counter=i+1;
					if(nomi_itemset[i].Zznominee1===""){
					type="E"
					msg+="R"+counter+").Please Fill Nominee Name\n"
					}
					if(nomi_itemset[i].Add01===""){
					type="E"
					msg+="R"+counter+").Please Fill Nominee Address\n"
					}
					if(nomi_itemset[i].Rel01===""){
					type="E"
					msg+="R"+counter+").Please Fill Relation\n"
					}
					if(nomi_itemset[i].Dat01===null){
					type="E"
					msg+="R"+counter+").Please Fill Date of Birth\n"
					}
					if(nomi_itemset[i].Shp01===""){
					type="E"
					msg+="R"+counter+").Please Fill Share\n"
					}
					 if(nomi_itemset[i].Shp01!=="" && nomi_itemset[i].Shp01 > 100){
                      type="E"
                      msg+="R"+counter+"). Please Enter Less Than 100 For Share Value \n";
					
           }
					if(nomi_itemset[i].Gra01===""){
					type="E"
					msg+="R"+counter+").Please Fill Guardian Address\n"
					}
					if(nomi_itemset[i].Zzpanno1===""){
					type="E"
					msg+="R"+counter+").Please Fill PAN Number\n"
					}
					  if(nomi_itemset[i].Zzpanno1.length > 10 || nomi_itemset[i].Zzpanno1.length < 10 ){
                     type="E"
                    msg+="R"+counter+"). Please Enter Valid PAN Number \n";
				
           }
					if(nomi_itemset[i].Zzadharno1===""){
					type="E"
					msg+="R"+counter+").Please Fill Aadhar Number\n"
					}
					if(nomi_itemset[i].Zzadharno1.length > 12 || nomi_itemset[i].Zzadharno1.length < 12 ){
                    type="E"
                     msg+="R"+counter+"). Please Enter Valid Aadhar Number \n";
					
           }
					if(nomi_itemset[i].Zzbankname1===""){
					type="E"
					msg+="R"+counter+").Please Fill Bank Name\n"
					}
					if(nomi_itemset[i].Zzifsc1===""){
					type="E"
					msg+="R"+counter+").Please Fill IFSC Code\n"
					}
					if(nomi_itemset[i].Zzhandicap1===""){
					type="E"
					msg+="R"+counter+").Please Fill Handicap\n"
					}
			 }
			 }
			 }
			 if(type==="E" && action==="T"){
			 MessageBox.warning(msg);
			 
			 }
	       else{
           var data={ 
            "Mandt":this.getView().getModel("NominationModel").getData().Mandt,
           "Zreqno":this.getView().getModel("NominationModel").getData().Zreqno,
           "ReqType":this.getView().getModel("NominationModel").getData().ReqType,
           "Pernr":this.getView().getModel("NominationModel").getData().Pernr,
           "Name":this.getView().getModel("NominationModel").getData().Name,
           "Designation":this.getView().getModel("NominationModel").getData().Designation,
           "Office":this.getView().getModel("NominationModel").getData().Office,
           "Cdate":this.getView().getModel("NominationModel").getData().Cdate,
           "Begda":this.getView().getModel("NominationModel").getData().Begda,
            "Endda":this.getView().getModel("NominationModel").getData().Endda,
           "EmpComm":this.getView().getModel("NominationModel").getData().EmpComm,
           "A1Comm":this.getView().getModel("NominationModel").getData().A1Comm,
           "A2Comm":this.getView().getModel("NominationModel").getData().A2Comm,
           "Status":this.getView().getModel("NominationModel").getData().Status,
           "Action":action,
           "Mpernr":this.getView().getModel("NominationModel").getData().Mpernr,
           "Rtext":this.getView().getModel("NominationModel").getData().Rtext,
            "Mname":this.getView().getModel("NominationModel").getData().Mname,
           "Onlydispay":this.getView().getModel("NominationModel").getData().Onlydispay,
             "Zlevel":this.getView().getModel("NominationModel").getData().Zlevel,
            
            "nomi_itemSet":this.getView().getModel("NominationModel").getData().nomi_itemset
           } 
            return this.TransferdatatoBackend(data);
            }
            },
            
            
             handlevalidations:function(action){
	    debugger;
           var msgtype ;
           var counter=1; 
           var msg="";
           
           if(sap.ui.getCore().byId("NM").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill Nominee Name \n";
					counter++;
           }
            if(sap.ui.getCore().byId("Rel").getValue() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Relation \n";
					counter++;
           }
            if(sap.ui.getCore().byId("dob").getDateValue() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Date of Birth \n";
					counter++;
           }
           if(sap.ui.getCore().byId("share").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill Share Value \n";
					counter++;
           }
           
           if(sap.ui.getCore().byId("Nadd").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill Nomination Address \n";
					counter++;
           }
           if(sap.ui.getCore().byId("panno").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill PAN Number \n";
					counter++;
           }
             
            if(sap.ui.getCore().byId("an").getValue() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Aadhar Number \n";
					counter++;
           }
            
           if(sap.ui.getCore().byId("bn").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill Bank Name \n";
					counter++;
           }
           if(sap.ui.getCore().byId("ifsc").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill IFSC Code \n";
					counter++;
           }
            if(sap.ui.getCore().byId("hc").getSelectedKey() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Handicap Details \n";
					counter++;
           }
            if(sap.ui.getCore().byId("ga").getValue() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Guardian's Address \n";
					counter++;
           }
            return { messagetype:msgtype,
                      message:msg }
            }
		
	});
});