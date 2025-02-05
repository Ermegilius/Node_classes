"use strict";
const path = require("path");

const errorMessage = `
################################
Usage: node testServer <configFileName>

For example:
node testServer config.json
################################
`;

if (process.argv.length < 3) {
	console.log(errorMessage);
} else {
	const [, , configFileName] = process.argv;
	try {
		const config = require(path.join(__dirname, configFileName));
		console.log(config);
	} catch (err) {
		console.log(`File '${configFileName}' not found.`);
	}
}
