/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Zmedical_Approval/Zmedical_Approval/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});