let resultArea;
let inputField;

document.addEventListener("DOMContentLoaded", init);

function init() {
	resultArea = document.querySelector("#resultArea");
	inputField = document.querySelector("#id");

	document.querySelector("#getButton").addEventListener("click", sendGet);
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

	const data = await fetch(`/getOne/`, options);
	const result = await data.json();
	updateResultArea(result);
}

function updateResultArea(result) {
	if (result.length === 0) {
		resultArea.innerHTML = '<h2>"No data found"</h2>';
	} else {
		let htmlString = "";
		for (let computer of result) {
			htmlString += `
                <div>
                    <h3>Computer</h3>
                    <p>Id: ${computer.id}</p>
                    <p>Name: ${computer.name}</p>
                    <p>Price: ${computer.price}</p>
                    <p>Type: ${computer.type}</p>
                </div>
            `;
		}
		resultArea.innerHTML = htmlString;
	}
}
