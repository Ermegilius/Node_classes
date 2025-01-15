"use strict";

const path = require("path");
const express = require("express");
const app = express();
const { port, host } = require("./config.json");

const Datastorage = require("./storageLayer/dataStorageLayer");
const { title } = require("process");
const { stat } = require("fs");
const storage = new Datastorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const homePath = path.join(__dirname, "home.html");

app.get("/", (req, res) => {
	res.sendFile(homePath);
});

app.get("/all", (req, res) => {
	storage.getAll().then((data) => res.render("allPersons", { result: data }));
});

app.get("/search", (req, res) => {
	res.render("searchPerson", {
		title: "Search",
		header: "Search Person",
		action: "/search",
	});
});

app.get("/search2", (req, res) => {
	res.render("searchPerson", {
		title: "Search",
		header: "Search Person",
		action: "/search",
		fields: [
			{
				label: "Id",
				name: "id",
				value: "",
				readonly: "",
				size: 10,
			},
		],
	});
});

app.post("/search", (req, res) => {
	if (!req.body) return res.sendStatus(500);
	const id = req.body.id;
	storage.get(id).then((result) =>
		res.render("personPage", {
			title: "Person",
			header: "Person data",
			result: result,
		})
	);
});

app.get("/remove", (req, res) => {
	res.render("searchPerson", {
		title: "Remove",
		header: "Search to remove",
		action: "/remove",
	});
});

app.post("/remove", (req, res) => {
	if (!req.body) return res.sendStatus(500);
	const id = req.body.id;
	storage
		.remove(id)
		.then((status) => sendStatusPage(res, status))
		.catch((err) => sendErrorPage(res, err));
});

app.get("/inputform", (req, res) =>
	res.render("form", {
		title: "Add",
		header: "Add person",
		action: "/input",
		id: { value: "", readonly: "" },
		firstname: { value: "", readonly: "" },
		lastname: { value: "", readonly: "" },
		department: { value: "", readonly: "" },
		salary: { value: "", readonly: "" },
	})
);

app.post("/input", (req, res) => {
	storage
		.insert(req.body)
		.then((status) => sendStatusPage(res, status))
		.catch((err) => sendErrorPage(res, err));
});

app.get("/inputform2", (req, res) =>
	res.render("form2", {
		title: "Add",
		header: "Add person",
		action: "/input",
		fields: [
			{
				label: "Id",
				name: "id",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "Firstname",
				name: "firstname",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "Lastname",
				name: "lastname",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "Department",
				name: "department",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "Salary",
				name: "salary",
				value: "",
				readonly: "",
				size: 10,
			},
		],
	})
);

app.get("/updateform", (req, res) =>
	res.render("form2", {
		title: "Update",
		header: "Update person",
		action: "/updatestage2",
		fields: [
			{
				label: "Id",
				name: "id",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "First Name",
				name: "firstname",
				value: "",
				readonly: "",
				size: 20,
			},
			{
				label: "Last Name",
				name: "lastname",
				value: "",
				readonly: "",
				size: 30,
			},
			{
				label: "Department",
				name: "department",
				value: "",
				readonly: "",
				size: 10,
			},
			{
				label: "Salary",
				name: "salary",
				value: "",
				readonly: "",
				size: 10,
			},
		],
	})
);

app.post("/updatestage2", async (req, res) => {
	if (!req.body) return res.sendStatus(500);

	const id = req.body.id;
	const resultData = await storage.get(id);
	if (resultData.length > 0) {
		const result = resultData[0];
		res.render("form2", {
			title: "Update",
			header: "Update person",
			action: "/updatestage2",
			fields: [
				{
					label: "Id",
					name: "id",
					value: result.id,
					readonly: "readonly",
					size: 10,
				},
				{
					label: "First Name",
					name: "firstname",
					value: result.firstname,
					readonly: "",
					size: 20,
				},
				{
					label: "Last Name",
					name: "lastname",
					value: result.lastname,
					readonly: "",
					size: 30,
				},
				{
					label: "Department",
					name: "department",
					value: result.department,
					readonly: "",
					size: 10,
				},
				{
					label: "Salary",
					name: "salary",
					value: result.salary,
					readonly: "",
					size: 10,
				},
			],
		});
	} else {
	}
});

app.listen(port, host, () => console.log(`Server is running on ${host}:${port}`));

function sendStatusPage(res, status, title = "Status", header = "Status") {
	return res.render("statusPage", { title, header, status });
}

function sendErrorPage(res, err, title = "Error", header = "Error") {
	return res.render("statusPage", { title, header, status: err });
}
