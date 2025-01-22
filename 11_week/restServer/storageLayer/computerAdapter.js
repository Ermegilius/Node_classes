"use strict";

function adapt(computer) {
	return Object.assign(computer, {
		id: +computer.id,
		salary: +computer.price,
	});
}

module.exports = { adapt };
