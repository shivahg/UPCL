sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/BusyIndicator"
], function (Controller,BusyIndicator) {
	"use strict";

	return Controller.extend("ZENOC.zemployeenoc.controller.handlevalidations", {
	    handlevalidations:function(action){
	    debugger;
           var msgtype ;counter=1; msg;
           
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
           if(ap.ui.getCore().byId("panno").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill PAN Number \n";
					counter++;
           }
            if(ap.ui.getCore().byId("an").getValue() === ""){
            msgtype="E"
           msg+=counter+". Please Fill Aadhar Number \n";
					counter++;
           }
           if(ap.ui.getCore().byId("bn").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill Bank Name \n";
					counter++;
           }
           if(ap.ui.getCore().byId("ifsc").getValue() === ""){
           msgtype="E"
           msg+=counter+". Please Fill IFSC Code \n";
					counter++;
           }
            if(ap.ui.getCore().byId("hc").getValue() === ""){
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