document.addEventListener("DOMContentLoaded", init);

async function init() {
	const data = await fetch("/getAll");
	const books = await data.json();

	const resultset = document.getElementById("resultset");
	for (const book of books) {
		const tr = document.createElement("tr");
		tr.appendChild(createCell(book.bookId));
		tr.appendChild(createCell(book.title));
		tr.appendChild(createCell(`${book.author.firstname} ${book.author.lastname}`));
		tr.appendChild(createCell(book.price));
		resultset.appendChild(tr);
	}
}

function createCell(data) {
	const td = document.createElement("td");
	td.textContent = data;
	return td;
}
