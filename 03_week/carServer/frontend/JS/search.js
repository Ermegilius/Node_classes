'use strict';

(function () {
    let result;
    let resultSet;
    let searchKey;
    let searchValue;

    const tr = document.createElement('tr');
    const td = document.createElement('td');

    document.addEventListener('DOMContentLoaded', init)

    function init() {
        result = document.getElementById('result');
        resultSet = document.getElementById('resultSet');
        searchKey = document.getElementById('searchKey');
        searchValue = document.getElementById('searchValue');

        document.getElementById('submit').addEventListener('click', send);
    }

    async function send() {
        try {
            const key = searchKey.value;
            const value = searchValue.value;

            resultSet.innerHTML = '';

            const data =
                await fetch(`http://localhost:3000/search?key=${key}&value=${value}`,
                    { mode: 'cors' }
                );
            const cars = await data.json();

            for (const car of cars) {
                const row = tr.cloneNode(false);
                row.appendChild(createCell(car.model));
                row.appendChild(createCell(car.license));
                resultSet.appendChild(row);
            }
        }
        catch (err) {
            //some error handling here
        }
    } //end of send function

    function createCell(text) {
        const cell = td.cloneNode(false);
        cell.textContent = text;
        return cell;
    }
})();