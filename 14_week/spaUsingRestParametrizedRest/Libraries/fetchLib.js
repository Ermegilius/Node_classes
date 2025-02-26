"use strict";

const http = require("http");

module.exports = function fetch(uri, fetchOptions) {
	return new Promise((resolve, reject) => {
		const url = new URL(uri);
		const { hostname, port, pathname } = url;

		const options = {
			hostname,
			port,
			path: pathname,
		};

		Object.assign(options, fetchOptions);

		http.request(options, (res) => {
			const dataBuffer = [];
			res.on("data", (data) => dataBuffer.push(data));
			res.on("end", () =>
				resolve({
					json: () => JSON.parse(Buffer.concat(dataBuffer).toString()),
				})
			);
		})
			.on("error", () => reject("error"))
			.end(options.body);
	});
};
