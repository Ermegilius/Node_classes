"use strict";

const http = require("http");

module.exports = function fetch(uri, fetchOptions = {}) {
	return new Promise((resolve, reject) => {
		const url = new URL(uri);
		const { hostname, port, pathname } = url;

		const options = {
			hostname,
			port,
			path: pathname,
			body: null,
		};

		if (Object.keys(fetchOptions).length > 0) {
			Object.assign(options, fetchOptions);
		}

		http.request(options, (res) => {
			const databuffer = [];

			res.on("data", (data) => databuffer.push(data));
			res.on("end", () =>
				resolve({
					json: () => JSON.parse(Buffer.concat(databuffer).toString()),
				})
			);
		})
			.on("error", () => reject("error"))
			.end(options.body);
	});
};
