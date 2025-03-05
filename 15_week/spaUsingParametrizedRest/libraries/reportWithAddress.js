"use strict";

const createFullReport = require("./reporter");
const { getAddressOfOrder } = require("./addressLibrary");

module.exports = function createReportWithAddress(orders) {
	const result = createFullReport(orders);
	if (orders.length > 0) {
		result.customer = getAddressOfOrder(orders[0]);
	} else {
		result.customer = {
			firstname: "",
			lastname: "",
			address: {
				street: "",
				postcode: "",
				country: "",
			},
		};
	}
	return result;
};
