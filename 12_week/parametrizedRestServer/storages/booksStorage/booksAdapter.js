"use strict";

module.exports = function adapt(book) {
	return Object.assign(book, {
		id: +book.id,
		year: +book.year,
	});
};
