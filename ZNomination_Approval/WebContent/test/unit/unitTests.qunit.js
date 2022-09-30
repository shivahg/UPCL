/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZANOC/zemployeeapprovenoc/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
