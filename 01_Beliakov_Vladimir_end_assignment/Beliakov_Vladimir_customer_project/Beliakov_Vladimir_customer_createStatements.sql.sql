CREATE DATABASE IF NOT EXISTS customerdb;
USE customerdb;

CREATE TABLE customer (
    customerId INT  PRIMARY KEY NOT NULL,
    firstname VARCHAR(10) NOT NULL,
    lastname VARCHAR(8) NOT NULL,
    address VARCHAR(16) NOT NULL,
    customerclass VARCHAR(26) NOT NULL
);

INSERT INTO customer (customerId, firstname, lastname, address, customerclass)
VALUES (1, 'John', 'Doe', '123 Main St', 'Regular');

INSERT INTO customer (customerId, firstname, lastname, address, customerclass)
VALUES (2, 'Jane', 'Smith', '456 Elm St', 'Premium');

-- Create user and grant privileges
CREATE USER 'conor'@'localhost' IDENTIFIED BY '166rYZB1';
GRANT ALL PRIVILEGES ON customerdb.* TO 'conor'@'localhost';
FLUSH PRIVILEGES;