sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Zfileupload.Zfileupload.controller.fileupload", {
		onInit: function () {

		},
		handleUploadPress:function(evt){
			var fileUploader1=this.getView().byId("fileUploader");
			if(!fileUploader1.getValue()){
				sap.m.MessageToast.show("choose file first");
			}
			fileUploader1.upload();
		}
	});
});