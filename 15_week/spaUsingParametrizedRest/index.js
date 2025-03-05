"use strict";

const path = require("path");
const express = require("express");
const app = express();

const { port, host } = require("./config.json");
const fetch = require("./libraries/fetchLib");
const createFullReport = require("./libraries/reporter");
const createReportWithAddress = require("./libraries/reportWithAddress");
const { getAddressOfOrder } = require("./libraries/addressLibrary");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const restPort = 4003;
const baseRestUrl = `http://localhost:${restPort}/api/orders`;

const homePath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(homePath));

app.get("/all", (req, res) =>
	fetch(baseRestUrl)
		.then((data) => data.json())
		.then((result) => res.json(result))
);

app.get("/report/:id", (req, res) =>
	fetch(`${baseRestUrl}/${req.params.id}`)
		.then((data) => data.json())
		.then((result) => res.json(createFullReport(result)))
);

app.get("/fullreport/:id", (req, res) =>
	fetch(`${baseRestUrl}/${req.params.id}`)
		.then((data) => data.json())
		.then((result) => res.json(createReportWithAddress(result)))
);

app.get("/address/:id", async (req, res) => {
	const data = await fetch(`${baseRestUrl}/${req.params.id}`);
	const result = await data.json();
	if (result.length > 0) {
		res.json(getAddressOfOrder(result[0]));
	} else {
		res.json({ message: "not found" });
	}
});

app.listen(port, host, () => console.log(`server ${host}:${port} serving...`));
