import mariadb from "mariadb";

export const pool = mariadb.createPool({
	host: "localhost",
	user: "conor",
	password: "166rYZB1",
	database: "customerdb",
});
