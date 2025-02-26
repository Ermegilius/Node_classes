"user strict";

const path = require("path");
const config = require("./configOrders.json");
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);
const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);

const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

const createFullReportV2 = require("./reporter");
const { log } = require("console");

// storage
// 	.get(1)
// 	.then((orders) => createFullReportV2(orders))
// 	.then(console.log); //create full report for order id===1

// storage
// 	.get(1)
// 	.then((orders) => createFullReportV2(orders))
// 	.then(printReport); //create full report for order id===1

function printReport(fullReport) {
	console.log("#".repeat(70));
	for (const line of fullReport.lines) {
		const message =
			`Id: ${line.productId}, ${line.productname}: ` +
			`amount: ${line.amount}, price: ${line.price}, total: ${line.rowTotal}`;
		console.log(message);
	}
	console.log("#".repeat(70));
	console.log(`Total sum: ${fullReport.totalSum}`);
}

function printReportV2(fullReport) {
	messages = [];
	for (const line of fullReport.lines) {
		messages.push(
			`Id: ${line.productId}, ${line.productname}: ` +
				`amount: ${line.amount}, price: ${line.price}, total: ${line.rowTotal}`
		);
	}
	const longest = Math.max(...messages.map((message) => message.length));
	console.log("#".repeat(longest + 2));
	console.log(messages.join("\n"));
	console.log("#".repeat(longest + 2));
	console.log(`Total sum: ${fullReport.totalSum}`);
}

storage
	.get(1)
	.then((orders) => createFullReportV2(orders))
	.then(printReportV2); //create full report for order id===1
