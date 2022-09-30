/*global QUnit*/

sap.ui.define([
	"ZPMS/ZPMS/controller/Dashboards.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Dashboards Controller");

	QUnit.test("I should test the Dashboards controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});