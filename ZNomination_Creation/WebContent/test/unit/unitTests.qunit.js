/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZENOC/zemployee_noc/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
