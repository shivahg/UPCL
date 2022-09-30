/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZPMS/ZPMS/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});