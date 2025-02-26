"use strict";

function getAllAddresses(orders) {
	return orders.map((order) => addrNoPhone(order.customer.address));
}

function getAddress(allOrders, firstname, lastname) {
	const foundAddr = [];
	for (const order of allOrders) {
		if (order.customer.firstname === firstname && order.customer.lastname === lastname) {
			foundAddr.push(order.customer.address);
		}
	}
	return foundAddr;
}

function getAddressOfOrder(order) {
	return {
		firstname: order.customer.firstname,
		lastname: order.customer.lastname,
		address: addrNoPhone(order.customer.address),
	};
}

function removeDuplicates(addresses, compare = compareAddr) {
	const noPhones = addresses.map((addr) => addrNoPhone(addr));
	const foundAddr = [];
	while (noPhones.length > 0) {
		if (!isAddrInArray(noPhones[0], foundAddr, compare)) {
			foundAddr.push(noPhones[0]);
		}
		noPhones.shift();
	}
	return foundAddr;
}

module.exports = {
	getAllAddresses,
	getAddress,
	removeDuplicates,
	getAddressOfOrder,
};

//helpers:

function isAddrInArray(addr, array, compare = compareAddr) {
	for (const address of array) {
		if (compare(addr, address)) {
			return true;
		}
	}
	return false;
}

function addrNoPhone(addr) {
	return {
		street: addr.street,
		postcode: addr.postcode,
		country: addr.country,
	};
}

function compareAddr(addrA, addrB) {
	if (addrA.street !== addrB.street) return false;
	if (addrA.postcode !== addrB.postcode) return false;
	if (addrA.country !== addrB.country) return false;
	return true;
}
