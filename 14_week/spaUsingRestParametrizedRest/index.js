"use strict";

const path = require("path");
const express = require("express");
const app = express();

const { port, host } = require("./config.json");
const fetch = require("./Libraries/fetchLib");
const createFullReport = require("./Libraries/reporterLibrary");
const { getAddressOfOrder } = require("./Libraries/addressLibrary");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const homePath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(homePath));

app.get("/all", (req, res) =>
	fetch("http://localhost:4003/api/orders")
		.then((data) => data.json())
		.then((result) => res.json(result))
);

app.get("/address/:id", (req, res) =>
	fetch(`http://localhost:4003/api/orders/${req.params.id}`) //req.paramsid ???
		.then((data) => data.json())
		.then((result) => res.json(getAddressOfOrder(result)))
);

app.get("/report/:id", (req, res) =>
	fetch(`http://localhost:4003/api/orders/${req.params.id}`) //req.paramsid ???
		.then((data) => data.json())
		.then((result) => res.json(createFullReport(result)))
);

app.listen(port, host, () => console.log(`Server listens http://${host}:${port}`));
