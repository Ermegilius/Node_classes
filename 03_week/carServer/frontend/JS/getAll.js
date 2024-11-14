'use strict';

(function () {

    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        try {
            const data =
                await fetch(`http://localhost:3000/cars`, { mode: 'cors' });
            const cars = await data.json();
            //console.log(cars);


            const resultSet = document.getElementById('resultSet');
            for (const car of cars) {
                const tr = document.createElement('tr');
                tr.appendChild(createCell(car.model));
                tr.appendChild(createCell(car.license));
                resultSet.appendChild(tr);
            }
        }
        catch (err) {
            //error handling to be added here
        }
    } // end of init

    function createCell(text) {
        const td = document.createElement('td');
        td.textContent = text;
        return td;
    }
})();

