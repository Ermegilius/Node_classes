'use strict';

(function(){
    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        const data = await fetch('/all');
        const result = await data.json();
        console.log(result);

        result.sort((a, b) => a.id - b.id);//sort result aray asc by id
        
        const resultset = document.getElementById('resultset');
        for(const computer of result){
            resultset.appendChild(createTableRow(computer));
        }
    }//end of init

    function createCell(data){
        const td = document.createElement('td');
        td.textContent=data;
        return td;
    }

    function createTableRow(computer){
        const tr = document.createElement('tr');
        tr.appendChild(createCell(computer.id));
        tr.appendChild(createCell(computer.name));
        tr.appendChild(createCell(computer.type));
        tr.appendChild(createCell(computer.amount));
        tr.appendChild(createCell(computer.processor));
        return tr
    }
})();