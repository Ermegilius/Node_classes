import { pool } from "./database.js";

//Retrieves all customers from the customer table
async function getAllCustomers() {
	let connection;
	try {
		connection = await pool.getConnection();
		const rows = await connection.query("SELECT * FROM customer");
		return rows;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}

//Retrieves a single customer by customerId
async function getCustomerById(customerId) {
	let connection;
	try {
		connection = await pool.getConnection();
		const rows = await connection.query("SELECT * FROM customer WHERE customerId = ?", [customerId]);
		return rows[0];
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}

//Inserts a new customer record into the database
async function insertCustomer(customer) {
	let connection;
	try {
		connection = await pool.getConnection();
		const { customerId, firstname, lastname, address, customerclass } = customer;
		const result = await connection.query(
			"INSERT INTO customer (customerId, firstname, lastname, address, customerclass) VALUES (?, ?, ?, ?, ?)",
			[customerId, firstname, lastname, address, customerclass]
		);
		return result;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}

//Updates an existing customer record
async function updateCustomer(customerId, customer) {
	let connection;
	try {
		connection = await pool.getConnection();
		const { firstname, lastname, address, customerclass } = customer;
		const result = await connection.query(
			"UPDATE customer SET firstname = ?, lastname = ?, address = ?, customerclass = ? WHERE customerId = ?",
			[firstname, lastname, address, customerclass, customerId]
		);
		return result;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}

//Removes a customer record by customerId
async function removeCustomer(customerId) {
	let connection;
	try {
		connection = await pool.getConnection();
		const result = await connection.query("DELETE FROM customer WHERE customerId = ?", [customerId]);
		return result;
	} catch (error) {
		throw error;
	} finally {
		if (connection) connection.release();
	}
}

export { getAllCustomers, getCustomerById, insertCustomer, updateCustomer, removeCustomer };
