/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Zsalary_struct/Zsalary_struct/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});