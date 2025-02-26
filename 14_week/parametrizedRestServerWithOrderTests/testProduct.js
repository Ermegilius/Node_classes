"use strict";

const path = require("path");
const config = require("./configOrders.json");
const storageEnginePath = path.join(__dirname, config.engineFolder, config.storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, config.storageEngine.dataStorageFile);
const storagePath = path.join(__dirname, config.allStoragesFolder, config.storage.folder);
const Datastorage = require(dataStoragePath);
const storage = new Datastorage(storagePath, config.storage.storageConfigFile);

//storage.get(1).then(console.log); //get product id===1

function createProductLine(product) {
	return {
		productId: product.productId,
		productname: product.productname,
		amount: product.amount,
		price: product.price,
		rowTotal: product.amount * product.price,
	};
}

// storage
// 	.get(1)
// 	.then((orders) => orders[0].products.map((product) => createProductLine(product)))
// 	.then(console.log); //get product id===1 and create product line

async function createReport(orderNumber) {
	const orders = await storage.get(orderNumber);
	// Check if orders array is not empty
	if (orders.length > 0) {
		const products = orders[0].products;
		return products.map((product) => createProductLine(product));
	} else {
		return [];
	}
}

//createReport(1).then(console.log); //create report for order id===1

async function createFullReport(orderNumber) {
	const orders = await storage.get(orderNumber);
	let totalSum = 0;
	const lines = [];
	if (orders.length > 0) {
		for (const product of orders[0].products) {
			const line = createProductLine(product);
			lines.push(line);
			totalSum += line.rowTotal;
		}
	}
	return { lines, totalSum: +totalSum.toFixed(2) };
}

//createFullReport(1).then(console.log); //create full report for order id===1

function createFullReportV2(orders) {
	let totalSum = 0;
	const lines = [];
	if (orders.length > 0) {
		for (const product of orders[0].products) {
			const line = createProductLine(product);
			lines.push(line);
			totalSum += line.rowTotal;
		}
	}
	return { lines, totalSum: +totalSum.toFixed(2) };
}

storage
	.get(1)
	.then((orders) => createFullReportV2(orders))
	.then(console.log); //create full report for order id===1

const tmpOrders = [
	{
		products: [
			{
				productId: 15,
				productname: "computer",
				model: "AIWay",
				amount: 1,
				price: 225.0,
				links: [],
				manufacturer: {
					name: "EU AI co",
					country: "EU",
					links: {
						home: ["link1"],
					},
				},
			},
		],
	},
];

console.log(createFullReportV2(tmpOrders)); //create full report for order id===1
