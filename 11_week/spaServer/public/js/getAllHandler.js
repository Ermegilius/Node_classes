document.addEventListener("DOMContentLoaded", init);

async function init() {
	const data = await fetch("/getAll");
	const computers = await data.json();
	console.log(computers);

	const resultset = document.querySelector("#resultSet");
	for (const computer of computers) {
		const tr = document.createElement("tr");
		tr.appendChild(createCell(computer.id));
		tr.appendChild(createCell(computer.name));
		tr.appendChild(createCell(computer.price));
		tr.appendChild(createCell(computer.type));
		resultset.appendChild(tr);
	}

	function createCell(data) {
		const td = document.createElement("td");
		td.textContent = data;
		return td;
	}
}
