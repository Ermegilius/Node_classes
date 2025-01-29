let resultArea;
let inputField;

document.addEventListener("DOMContentLoaded", init);

function init() {
	resultArea = document.querySelector("#resultArea");
	inputField = document.querySelector("#id");

	document.querySelector("#postButton").addEventListener("click", sendPost);
}

async function sendGet() {
	resultArea.innerHTML = "";
	const id = inputField.value;

	const data = await fetch(`/getOne/${id}`);
	const result = await data.json();
	updateResultArea(result);
}

async function sendPost() {
	resultArea.innerHTML = "";
	const id = inputField.value;
	const options = {
		method: "POST",
		body: JSON.stringify({ id }),
		headers: {
			"Content-Type": "application/json",
		},
	};

	const data = await fetch(`/remove`, options);
	const result = await data.json();
	updateResultArea(result);
}

function updateResultArea(result) {
	resultArea.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
}
