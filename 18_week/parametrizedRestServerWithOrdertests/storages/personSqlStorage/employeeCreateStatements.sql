drop database if exists computerdb;
create database computerdb;

use computerdb;

create table computer(
    id integer not null primary key,
    name varchar(50) not null,
    type varchar(30) not null,
    price decimal(8,2)
);

insert into computer values(1, 'Small Brainx', 'laptop',3000);
insert into computer values(2, 'Big Brain', 'almost super computer',200000);
insert into computer values(3, 'Huge Brain', 'super computer',300000);

drop user if exists 'zeke'@'localhost';
create user 'zeke'@'localhost' identified by '1234';
grant all privileges on computerdb.* to 'zeke'@'localhost';