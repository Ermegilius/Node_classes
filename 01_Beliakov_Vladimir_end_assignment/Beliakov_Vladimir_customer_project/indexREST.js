import express from "express";
import cors from "cors";
import fs from "fs";
import {
	getAllCustomers,
	getCustomerById,
	insertCustomer,
	updateCustomer,
	removeCustomer,
} from "./dataAccessLayer/dataAccessMethods.js";

const config = JSON.parse(fs.readFileSync(new URL("./configREST.json", import.meta.url)));

const app = express();

app.use(cors());
app.use(express.json());

function startServer(config) {
	// GET /api/customers - Retrieve all customers
	app.get("/api/customers", async (req, res) => {
		try {
			const customers = await getAllCustomers();
			const safeCustomers = JSON.parse(
				JSON.stringify(customers, (_, value) => (typeof value === "bigint" ? value.toString() : value))
			);
			res.json(safeCustomers);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	// GET /api/customers/:customerId - Retrieve a single customer by ID
	app.get("/api/customers/:customerId", async (req, res) => {
		try {
			const customerId = parseInt(req.params.customerId);
			const customer = await getCustomerById(customerId);
			if (!customer) {
				res.status(404).json({ error: "Customer not found" });
			} else {
				// Convert any BigInt values
				const safeCustomer = JSON.parse(
					JSON.stringify(customer, (_, value) => (typeof value === "bigint" ? value.toString() : value))
				);
				res.json(safeCustomer);
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	// POST /api/customers - Insert new customer
	app.post("/api/customers", async (req, res) => {
		try {
			const customer = req.body;
			const result = await insertCustomer(customer);

			// Convert any BigInt values to regular numbers or strings
			const safeResult = JSON.parse(
				JSON.stringify(result, (_, value) => (typeof value === "bigint" ? value.toString() : value))
			);

			res.status(201).json({ message: "Customer inserted", result: safeResult });
		} catch (error) {
			console.error("Error inserting customer:", error);
			res.status(500).json({ error: error.message });
		}
	});

	// PUT /api/customers - Update or create customer
	app.put("/api/customers", async (req, res) => {
		try {
			const customer = req.body;
			const existing = await getCustomerById(customer.customerId);
			let result;
			if (existing) {
				result = await updateCustomer(customer.customerId, customer);
				// Convert any BigInt values
				const safeResult = JSON.parse(
					JSON.stringify(result, (_, value) => (typeof value === "bigint" ? value.toString() : value))
				);
				res.json({ message: "Customer updated", result: safeResult });
			} else {
				result = await insertCustomer(customer);
				// Convert any BigInt values
				const safeResult = JSON.parse(
					JSON.stringify(result, (_, value) => (typeof value === "bigint" ? value.toString() : value))
				);
				res.status(201).json({ message: "Customer created", result: safeResult });
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	// DELETE /api/customers/:customerId - Delete customer by ID
	app.delete("/api/customers/:customerId", async (req, res) => {
		try {
			const customerId = parseInt(req.params.customerId);
			const result = await removeCustomer(customerId);
			// Convert any BigInt values
			const safeResult = JSON.parse(
				JSON.stringify(result, (_, value) => (typeof value === "bigint" ? value.toString() : value))
			);
			res.json({ message: "Customer removed", result: safeResult });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	});

	const { port, host } = config;
	app.listen(port, host, () => {
		console.log(`REST server is running on http://${host}:${port}`);
	});
}

startServer(config);
