sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("zfileuploaddownload.controller.View1", {
			onInit: function () {
            
				
				 this.UploadedAttachment=[];
				
			},
			
			handleUploadPress:function(evt){
				debugger;
				try{
					/*var attacgSec=this.getView().byId("idAttachFor")
					if(attacgSec && !attacgSec.getValue().trim()){
						sap.m.MessageToast.show("Please select attachment type to upload !");
						return;
					}
					var oData = this.getView().getModel("dashboard").getData();
					var yetToDownload = oData.YetToUpload;
					var allAttachment = oData.UploadedAttachment;*/
					
					var oFileUploader = this.getView().byId("fileUploader"),returnData="";
					oFileUploader.upload();
					var file = jQuery.sap.domById(oFileUploader.getId()+"-fu").files[0];
					if(file.name && file.name.length>100){
						sap.m.MessageToast.show("File name with extension shuld not exceel 100 characters.")
						return;
					}
					var fileName= file.name.replace(",",""),
						fileType=file.type,
					    fileSize=file.size/1024;
					/*var isInd1 = allAttachment.findIndex(function(e){
						return e.Filename && e.Filename.trim() == fileName.trim()
					});
					if(isInd1>=0){
						sap.m.MessageToast.show("File name already exist.");
						return;
					}*/
					debugger;
					/*var attachFor = this.getView().byId("idAttachFor").getValue()*/
					/*var ind1 = allAttachment.findIndex(function(e){
						return e.Type && e.Type.trim().toLowerCase() == attachFor.toLowerCase()
					})
					if(ind1>=0){
						sap.m.MessageToast.show("File already attached for the type: "+attachFor);
						return;
					}*/
					this.previewFile(fileType, fileName, file)
					 var oFileUploader = this.getView().byId("fileUploader");
					oFileUploader.clear();
				}catch(e){
					console.log(e)
				}
				
			},
			previewFile:function(fileType, fileName, file){
				var t=this;
				  const preview = document.querySelector('img');
				  var file = file;//document.querySelector('input[type=file]').files[0];
				  var reader = new FileReader();
                 
				  reader.addEventListener("load", function () {
				    // convert image file to base64 string
					  debugger;
					 // var oData = sap.ui.getCore().getModel("dashboard").getData();
				     // var that = oData.Controller;
					  var dataToPush = {
								 ReqNo:"0000000001",
								 Filename:fileName,
								 Mimetype:fileType,
								 Value:reader.result,//file,
								
								 isCreated:true,
								 //Type:fileFor
						 }
					  t.UploadedAttachment.push(dataToPush);
					  var files=new sap.ui.model.json.JSONModel();
					  t.getView().setModel(files,"dashboard");
				      t.getView().getModel("dashboard").setProperty("/UploadedAttachment",t.UploadedAttachment);
					    //files.setModel(files,"dashboard");
				     // sap.ui.getCore().getModel("dashboard").setProperty("/UploadedAttachment",UploadedAttachment);
				     /* if(fileFor == "NOCOBJE"){
				    	  sap.ui.getCore().getModel("dashboard").setProperty("/NocAttachment",dataToPush);
				      }else if(fileFor == "UNDERTAKING"){
				    	  sap.ui.getCore().getModel("dashboard").setProperty("/UndertakingAttachment",dataToPush);
				      }*/
				  }, false);

				  if (file) {
				    reader.readAsDataURL(file);
				  }
			},
			
			prepareAttachment:function(reqNo){
				try{
					var reqNoo = reqNo;
					var allAtt = this.getView().getModel("dashboard").getProperty("/UploadedAttachment");
					var newCreatedAttachment = allAtt.filter(function(e){
						return e.isCreated
					});
					if(newCreatedAttachment && newCreatedAttachment.length>0){
						for(var i=0;i<newCreatedAttachment.length;i++){
							if(!newCreatedAttachment[i].ReqNo || !newCreatedAttachment[i].ReqNo.trim()){
								newCreatedAttachment[i].ReqNo=reqNoo
							}
							this.sendAttachment(newCreatedAttachment[i]);
						}
					}
				}catch(e){
					console.log(e)
				}
			},
			sendAttachment:function(attachment){
				try{
					var lv_oDataUrl = "/sap/opu/odata/sap/ZHCM_NOC_SRV/";
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
							ReqNo:attachment.ReqNo,
							Filename:attachment.Filename,
							Mimetype:attachment.Mimetype,
							Value:attachment.Value,
							Datestamp:attachment.Datestamp,
							Action:"PROP",
							Type:attachment.Type
					}
					lv_OModel.update("/FileSet(ReqNo='"+attachment.ReqNo+"',Filename='"+attachment.Filename+"',Action='PROP',Type='"+attachment.Type+"')/$value", dataToSend, null, function(oData, oResponse) {
						sap.m.MessageToast.show("Attachment Created Successfully")
					}, function(err) {
							console.log(err)
						});  	
				}catch(e){
					console.log(e)
				}
			},
			
			
			filedownload:function(evt){
			
				
				var path=evt.getSource().oPropagatedProperties.oBindingContexts.dashboard.sPath.slice(20);
				
				var filecontent=this.getView().byId("files").getModel("dashboard").getData().UploadedAttachment[path].Value;
				
				
				var v=new sap.m.Dialog({
				    title:"Dialog",
				    contentheight:"100%",
				    contentWidth:"100%",
				    content:[
				        new sap.ui.core.HTML({
				            content:"<iframe src='"+filecontent+"' width='1400px' height='500px' frameborder='0'></iframe>"
				        })
				        ],
				        buttons:[
				        	
				        	new sap.m.Button({
				        		text:"close",
				        		press:function(){v.destroy();}
				        		
				        	})
				        ]
				}).addStyleClass("pdfDialog");
				
				v.open();
				
			}
			
		});
	});
