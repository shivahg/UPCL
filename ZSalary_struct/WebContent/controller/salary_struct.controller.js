sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Zsalary_struct.Zsalary_struct.controller.salary_struct", {
		onInit: function () {
			
			
			
			sap.ui.core.BusyIndicator.show();
			
			var salaryservice=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZHCM_SALSUM_SRV/");
		       var t=this;
		       	   salaryservice.read("/emp_detSet('33333')",{
					   success:function(odata){
						   var frmt = sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd/MM/yyyy"});
							odata.Cdate = frmt.format(new Date(odata.Cdate));
							odata.Cdate1=frmt.format(new Date(odata.Cdate1));
						var arr=[];
						arr.push(odata);
						   var salaryhmodel=new sap.ui.model.json.JSONModel();
						    salaryhmodel.setData(arr);
						    t.getView().setModel(salaryhmodel,"salaryhmodel");
						    sap.ui.core.BusyIndicator.hide();
								},
					   error:function(error){
						   sap.ui.core.BusyIndicator.hide();
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
			
			
			
		       
		       	   salaryservice.read("/wagetypesSet",{
					   success:function(odata){
						
						   var salarymodel=new sap.ui.model.json.JSONModel();
						    salarymodel.setData(odata.results);
						    t.getView().setModel(salarymodel,"salarymodel");
		           
								},
					   error:function(error){
						   sap.ui.core.BusyIndicator.hide();
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
		}
	});
});