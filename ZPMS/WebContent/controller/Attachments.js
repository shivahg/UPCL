sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller,MessageBox) {
	"use strict";

	return Controller.extend("ZPMS.ZPMS.controller.Attachments", {
		previewFile:function(fileType, fileName, file,fileFor){
			debugger;
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