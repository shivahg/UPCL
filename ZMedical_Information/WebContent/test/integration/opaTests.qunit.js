/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZMedical_App/ZMedical_App/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});