/*global QUnit*/

sap.ui.define([
	"Zfileupload/Zfileupload/controller/fileupload.controller"
], function (Controller) {
	"use strict";

	QUnit.module("fileupload Controller");

	QUnit.test("I should test the fileupload controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});