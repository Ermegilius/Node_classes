"use strict";

let resultArea;

document.addEventListener("DOMContentLoaded", init);

function init() {
	resultArea = document.getElementById("resultArea");
	const form = document.getElementById("form");

	form.addEventListener("submit", send);
	form.addEventListener("reset", clear);
}

function clear() {
	resultArea.innerHTML = "";
}

async function send(e) {
	e.preventDefault();
	const dataFromForm = new FormData(e.target);
	const dataJson = Object.fromEntries(dataFromForm.entries());

	const options = {
		method: "POST",
		body: JSON.stringify({ dataJson }),
		headers: {
			"Content-Type": "application/json",
		},
	};

	const data = await fetch(`/add`, options);
	const result = await data.json();
	updateResultArea(result);
}

function updateResultArea(result) {
	resultArea.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
}
