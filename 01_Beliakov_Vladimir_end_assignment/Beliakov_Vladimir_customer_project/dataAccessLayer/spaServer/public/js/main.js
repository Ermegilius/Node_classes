// API base URL - update this to match your REST API server
const API_URL = "http://localhost:4000/api/customers";

// DOM Elements
const getAllBtn = document.getElementById("getAllBtn");
const getOneBtn = document.getElementById("getOneBtn");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const addCustomerForm = document.getElementById("addCustomerForm");
const customersList = document.getElementById("customersList");
const customerResult = document.getElementById("customerResult");
const statusMessage = document.getElementById("statusMessage");

// Views
const getAllView = document.getElementById("getAllView");
const getOneView = document.getElementById("getOneView");
const addView = document.getElementById("addView");

// Event Listeners
document.addEventListener("DOMContentLoaded", initApp);
getAllBtn.addEventListener("click", showGetAllView);
getOneBtn.addEventListener("click", showGetOneView);
addBtn.addEventListener("click", showAddView);
searchBtn.addEventListener("click", getCustomer);
addCustomerForm.addEventListener("submit", addCustomer);

// Initialize app
function initApp() {
	showGetAllView();
}

// View management functions
function hideAllViews() {
	getAllView.classList.add("hidden");
	getOneView.classList.add("hidden");
	addView.classList.add("hidden");
}

function showGetAllView() {
	hideAllViews();
	getAllView.classList.remove("hidden");
	getAllCustomers();
}

function showGetOneView() {
	hideAllViews();
	getOneView.classList.remove("hidden");
	customerResult.innerHTML = "";
}

function showAddView() {
	hideAllViews();
	addView.classList.remove("hidden");
	addCustomerForm.reset();
}

// API functions
async function getAllCustomers() {
	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const customers = await response.json();
		displayCustomers(customers);
	} catch (error) {
		showStatusMessage(`Error fetching customers: ${error.message}`, "error");
	}
}

async function getCustomer() {
	const customerId = document.getElementById("customerIdInput").value;

	if (!customerId) {
		showStatusMessage("Please enter a customer ID", "error");
		return;
	}

	try {
		const response = await fetch(`${API_URL}/${customerId}`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const customer = await response.json();
		displayCustomerDetails(customer);
	} catch (error) {
		showStatusMessage(`Error fetching customer: ${error.message}`, "error");
		customerResult.innerHTML = "";
	}
}

async function addCustomer(event) {
	event.preventDefault();

	const customer = {
		customerId: parseInt(document.getElementById("customerId").value),
		firstname: document.getElementById("firstname").value,
		lastname: document.getElementById("lastname").value,
		address: document.getElementById("address").value,
		customerclass: document.getElementById("customerclass").value,
	};

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(customer),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		showStatusMessage("Customer added successfully!", "success");
		addCustomerForm.reset();

		// After adding, show all customers
		showGetAllView();
	} catch (error) {
		showStatusMessage(`Error adding customer: ${error.message}`, "error");
	}
}

async function deleteCustomer(customerId) {
	if (!confirm(`Are you sure you want to delete customer ${customerId}?`)) {
		return;
	}

	try {
		const response = await fetch(`${API_URL}/${customerId}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		showStatusMessage("Customer deleted successfully!", "success");

		// Refresh customer list
		getAllCustomers();
	} catch (error) {
		showStatusMessage(`Error deleting customer: ${error.message}`, "error");
	}
}

// Display functions
function displayCustomers(customers) {
	if (!customers || customers.length === 0) {
		customersList.innerHTML = "<p>No customers found</p>";
		return;
	}

	const table = document.createElement("table");
	table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Class</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

	const tbody = table.querySelector("tbody");

	customers.forEach((customer) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <td>${customer.customerId}</td>
            <td>${customer.firstname}</td>
            <td>${customer.lastname}</td>
            <td>${customer.address}</td>
            <td>${customer.customerclass}</td>
            <td>
                <button class="delete-btn" data-id="${customer.customerId}">Delete</button>
            </td>
        `;
		tbody.appendChild(row);
	});

	customersList.innerHTML = "";
	customersList.appendChild(table);

	// Add event listeners to delete buttons
	document.querySelectorAll(".delete-btn").forEach((button) => {
		button.addEventListener("click", (e) => {
			const customerId = e.target.getAttribute("data-id");
			deleteCustomer(customerId);
		});
	});
}

function displayCustomerDetails(customer) {
	if (!customer) {
		customerResult.innerHTML = "<p>Customer not found</p>";
		return;
	}

	customerResult.innerHTML = `
        <div class="customer-details">
            <h3>Customer Details</h3>
            <p><strong>ID:</strong> ${customer.customerId}</p>
            <p><strong>First Name:</strong> ${customer.firstname}</p>
            <p><strong>Last Name:</strong> ${customer.lastname}</p>
            <p><strong>Address:</strong> ${customer.address}</p>
            <p><strong>Class:</strong> ${customer.customerclass}</p>
            <button class="delete-btn" data-id="${customer.customerId}">Delete Customer</button>
        </div>
    `;

	// Add event listener to delete button
	document.querySelector(".customer-details .delete-btn").addEventListener("click", (e) => {
		const customerId = e.target.getAttribute("data-id");
		deleteCustomer(customerId);
	});
}

function showStatusMessage(message, type) {
	statusMessage.textContent = message;
	statusMessage.className = type;

	// Clear the message after 5 seconds
	setTimeout(() => {
		statusMessage.textContent = "";
		statusMessage.className = "";
	}, 5000);
}
