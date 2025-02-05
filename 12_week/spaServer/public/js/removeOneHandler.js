let resultarea;
let inputfield;

document.addEventListener("DOMContentLoaded", init);

function init() {
	resultarea = document.getElementById("resultarea");
	inputfield = document.getElementById("compId");
	document.getElementById("postbutton").addEventListener("click", sendPost);
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

	const data = await fetch("/remove", options);
	const result = await data.json();
	updateResultarea(result);
}

function updateResultarea(result) {
	resultarea.innerHTML = `
        <pre class=${result.type}>${JSON.stringify(result, null, 2)}</pre>`;
}
