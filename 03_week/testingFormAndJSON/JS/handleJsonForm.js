'use strict';

(function () {
    let firstNameField, lastNameField, result;

    document.addEventListener('DOMContentLoaded', init);

    function init() {
        firstNameField = document.getElementById('firstName');
        lastNameField = document.getElementById('lastName');
        result = document.getElementById('result');

        document.getElementById('send').addEventListener('click', submit);
    }

    async function submit() {
        const firstName = firstNameField.value;
        const lastName = lastNameField.value;
        const options = {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const data = await fetch('/jsonData', options);
        const jsonData = await data.json();
        result.textContent = JSON.stringify(jsonData, null, 4)
    }
})();