let resultarea;
let inputfield;

document.addEventListener("DOMContentLoaded", init);

function init() {
	resultarea = document.getElementById("resultarea");
	inputfield = document.getElementById("bookId");
	document.getElementById("getbutton").addEventListener("click", sendGet);
	document.getElementById("postbutton").addEventListener("click", sendPost);
}

async function sendGet() {
	resultarea.innerHTML = "";
	const id = inputfield.value;

	const data = await fetch(`/getOne/${id}`);
	const result = await data.json();
	updateResultarea(result);
}

async function sendPost() {
	resultarea.innerHTML = "";
	const id = inputfield.value;
	const options = {
		method: "POST",
		body: JSON.stringify({ id }),
		headers: {
			"Content-Type": "application/json",
		},
	};

	const data = await fetch("/getOne", options);
	const result = await data.json();
	updateResultarea(result);
}

function updateResultarea(result) {
	if (result.length === 0) {
		resultarea.innerHTML = "<h2>No books found</h2>";
	} else {
		let htmlString = "";
		for (const book of result) {
			htmlString += `
            <div>
                <p>Id: ${book.bookId}</p>
                <p>Name: ${book.title}</p>
                <p>Author: ${book.author.firstname} ${book.author.lastname}</p>
                <p>Price: ${book.price}</p>
            </div>`;
		}
		resultarea.innerHTML = htmlString;
	}
}
