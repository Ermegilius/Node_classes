drop database if exists employeedb;
create database employeedb;

use employeedb;

create table employee(
    id integer not null primary key,
    firstname varchar(20) not null,
    lastname varchar(30) not null,
    department varchar(15) not null,
    salary decimal(6,2)
);

insert into employee values(1, 'Matt', 'River','ict',3000);
insert into employee values(2, 'Mary', 'Jones','admin',5000);

drop user if exists 'zeke'@'localhost';
create user 'zeke'@'localhost' identified by '1234';
grant all privileges on employeedb.* to 'zeke'@'localhost';