//readerWriter.js
"use strict";

const fs = require("fs").promises;

async function readStorage(storageFilePath) {
	try {
		const data = await fs.readFile(storageFilePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.error("Error reading storage file:", err);
		return [];
	}
}

async function writeStorage(storageFilePath, data) {
	try {
		await fs.writeFile(storageFilePath, JSON.stringify(data, null, 4), {
			encoding: "utf8",
			flag: "w",
		});
		return true;
	} catch (err) {
		console.error("Error writing to storage file:", err);
		return false;
	}
}

module.exports = { readStorage, writeStorage };
