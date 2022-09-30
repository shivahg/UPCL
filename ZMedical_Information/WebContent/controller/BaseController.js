sap.ui.define([
	"sap/ui/core/mvc/Controller", 
	"sap/ui/core/BusyIndicator"
], function (Controller,BusyIndicator) {
	"use strict";

	return Controller.extend("ZMedical_App.ZMedical_App.controller.BaseController", {
		sendAttachment:function(attachment){ 
			try{
				var lv_oDataUrl = "/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/";
				var lv_OModel = new sap.ui.model.odata.ODataModel(lv_oDataUrl, true);
				lv_OModel.setHeaders({
					  "X-Requested-With" 	: "XMLHttpRequest",
					  "Content-Type" 	: "application/json",
					  "DataServiceVersion" 	: "2.0",
					  "slug":attachment.Mimetype,
					  "Accept" 		: "application/atom+xml,application/atomsvc+xml,application/xml",
				   	  "X-CSRF-Token" 	: ""
				});
				
				var dataToSend = {
						Zreqno:attachment.Zreqno,
						Filename:attachment.Filename,
						Filetype:attachment.Filetype,
						Filecontext:attachment.Filecontext,
						Action:"MDCL",
						Descr:attachment.Descr
				}
				lv_OModel.update("/MedattSet(Zreqno='"+attachment.Zreqno+"',Filename='"+attachment.Filename+"',Descr='"+attachment.Descr+"',Action='MDCL')/$value", dataToSend, null, function(oData, oResponse) {
					sap.m.MessageToast.show("Attachment Created Successfully")
				}, function(err) {
						console.log(err)
					});  	
			}catch(e){
				console.log(e)
			}
		},
		prepareAttachment:function(reqNo){
			try{
				debugger;
				var reqNoo = reqNo;
				var allAtt = sap.ui.getCore().getModel("AttachModel").getProperty("/UploadedAttachment");
				var newCreatedAttachment = allAtt.filter(function(e){
					return e.isCreated
				});
				if(newCreatedAttachment && newCreatedAttachment.length>0){
					for(var i=0;i<newCreatedAttachment.length;i++){
						if(!newCreatedAttachment[i].Zreqno || !newCreatedAttachment[i].Zreqno.trim()){
							newCreatedAttachment[i].Zreqno=reqNoo
						}
						this.sendAttachment(newCreatedAttachment[i]);
					}
				}
			}catch(e){
				console.log(e)
			}
		},
		getAttachments:function(fType){
			try{
				sap.ui.getCore().getModel("AttachModel").setProperty("/UploadedAttachment",[]);
				
				
				var rec = sap.ui.getCore().getModel("AttachModel").getProperty("/Single_Record");
				var lv_oDataUrl = "/sap/opu/odata/sap/ZHCM_MEDICAL_SRV/";
				var lv_OModel = new sap.ui.model.odata.ODataModel(lv_oDataUrl, true);
				var t=this;
				lv_OModel.read("/medicalSet(Zreqno='"+rec.Zreqno+"',Type='"+fType+"')/Files",{
					success: function (odata) {
						var dashboard = sap.ui.getCore().getModel("AttachModel");
						var pushAttach=[]
						if(odata && odata.results && odata.results.length>0){
							for(var i = 0; i < odata.results.length; i++) {
								delete odata.results[i].__metadata;
								try{
									odata.results[i].isCreated = false;
								}catch(e){
									console.log(e)
								}
// 								if(isInd!=-1){
// 									pushAttach.push(odata.results[i])
// 								}
                                pushAttach.push(odata.results[i])
							}
							dashboard.setProperty("/UploadedAttachment",pushAttach);
						}
//						t.getView().byId("").getModel("dashboard").refresh();
//						t.getView().byId("attachment").setModel(dashboard,"AttachModel")
//						t.hideBusy();
					},
					error: function (error) {
						debugger;
						console.log(error)
//						t.hideBusy();
					}
				});
			}catch(e){
				console.log(e)
			}
		},
		onfilePress:function(oEvent){
			try{
				try{
					var sPath = oEvent.getSource().getBindingContext("AttachModel").getPath()
					var attachmentDetail = sap.ui.getCore().getModel("AttachModel").getProperty(sPath);
					var t=this;
					if(attachmentDetail.Filecontext){
						var parseValue=JSON.parse(atob(attachmentDetail.Filecontext));
						var base64Val =parseValue.Filecontext;
						if(JSON.parse(atob(attachmentDetail.Filecontext)).Filetype.toLowerCase().includes("image")){
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
								content:[new sap.ui.core.HTML({
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
				}catch(e){
					console.log(e)
				}
			}catch(e){
				console.log(e)
			}
		},
		previewFile:function(fileType, fileName, file,fileFor){
			  var file = file;
			  var reader = new FileReader();

			  reader.addEventListener("load", function () {
			    // convert image file to base64 string
				  debugger;
				  var oData = sap.ui.getCore().getModel("AttachModel").getData();
			      var that = oData.Controller;
				  var dataToPush = {
						  	 Zreqno:oData.Single_Record.Zreqno,
						  	 Filename:fileName,
						  	 Filetype:fileType,
							 Filecontext:reader.result,//file,
							 isCreated:true,
							 Descr:fileFor
					 } 
				  if(oData.UploadedAttachment && oData.UploadedAttachment.length>0){
					  var isInd = oData.UploadedAttachment.findIndex(function(e){
						  return e.Descr && dataToPush.Descr && e.Descr.trim().toLowerCase() == dataToPush.Descr.trim().toLowerCase()
					  })
					  if(isInd>=0){
						  oData.UploadedAttachment[isInd] = dataToPush
					  }
					  else
						  oData.UploadedAttachment.push(dataToPush);
				  }else
					  oData.UploadedAttachment.push(dataToPush);
			      sap.ui.getCore().getModel("AttachModel").setProperty("/UploadedAttachment",oData.UploadedAttachment);
			  }, false);

			  if (file) {
			    reader.readAsDataURL(file);
			  }
			},
			fnSetIcon:function(desc){
				try{
					if(desc && desc.length>0){
						if(desc.toLowerCase().includes("pdf"))
							return "sap-icon://pdf-attachment";
						return "sap-icon://background";
					}
					return "";
				}catch(e){
					console.log(e)
				}
			},
			fnSetIconColor:function(desc){
				try{
					if(desc && desc.length>0){
						if(desc.toLowerCase().includes("pdf"))
							return "#cc0000";
						return "#0099cc";
					}
					return "";
				}catch(e){
					console.log(e)
				}
			},
		
	});
});