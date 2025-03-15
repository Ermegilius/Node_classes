# Customer Management System

This project provides a customer management system with CRUD (Create, Read, Update, Delete) operations through a REST API and a single-page application (SPA) interface.

## Features

-   REST API for customer data management
-   Single-page web application for user-friendly interaction
-   MariaDB database integration
-   Full CRUD operations for customer records

## Installation

1. Copy the project to your machine.

2. Cd into the project directory.

3. Install dependencies:

```sh
npm install
```

4. Set up the database:

```sh
# Run the SQL script in MariaDB
mysql -u admin -p <your admin password>
```

## Configuration

### REST API Configuration

The file `configREST.json` contains configuration for the REST API server:

```json
{
	"host": "localhost",
	"port": 4000
}
```

### SPA Server Configuration

The file `dataAccessLayer/spaServer/configSPA.json` contains configuration for the SPA server.

### Database Configuration

Test user:

```js
{
    user: "conor",
    password: "166rYZB1"
}
```

## Running the Application

Start both the REST API and SPA servers:

```bash
npm start
```

This will start:

-   REST API on http://localhost:4000
-   SPA on http://localhost:3000

## API Endpoints

### GET /api/customers

Retrieves all customers

### GET /api/customers/:customerId

Retrieves a single customer by ID

### POST /api/customers

Creates a new customer

### PUT /api/customers

Updates an existing customer or creates a new one if it doesn't exist

### DELETE /api/customers/:customerId

Removes a customer by ID

## Data Model

Customer object structure:

```javascript
{
  customerId: Number,
  firstname: String (max 10 chars),
  lastname: String (max 8 chars),
  address: String (max 16 chars),
  customerclass: String (max 26 chars)
}
```

## Project Structure

```
Beliakov_Vladimir_customer_project/
├── Beliakov_Vladimir_customer_createStatements.sql.sql  # Database setup
├── configREST.json                                     # REST API config
├── indexREST.js                                        # REST API server
├── package.json                                        # Project metadata
├── readme.md                                           # This file
└── dataAccessLayer/
    ├── dataAccessMethods.js                            # Database CRUD operations
    ├── database.js                                     # Database connection
    └── spaServer/                                      # SPA server files
        ├── configSPA.json                              # SPA server config
        ├── indexSPA.js                                 # SPA server
        ├── libraries/                                  # Helper libraries
        └── public/                                     # Client-side files
            ├── index.html                              # Main HTML
            ├── js/                                     # JavaScript files
            └── styles/                                 # CSS files
```

## Author

-   Vladimir Beliakov
-   Email: ermegilius@gmail.com
-   GitHub: https://github.com/Ermegilius

## License

ISC
