/*global QUnit*/

sap.ui.define([
	"Zsalary_struct/Zsalary_struct/controller/salary_struct.controller"
], function (Controller) {
	"use strict";

	QUnit.module("salary_struct Controller");

	QUnit.test("I should test the salary_struct controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});