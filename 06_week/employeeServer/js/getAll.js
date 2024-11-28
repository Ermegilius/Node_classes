'use strict';

(function(){
    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        //no error checking
        const data=await fetch('/all');
        const result=await data.json();

        const resultset=document.getElementById('resultset');
        for(const person of result){
            const tr = document.createElement('tr');
            tr.appendChild(createCell(person.id));
            tr.appendChild(createCell(person.firstname));
            tr.appendChild(createCell(person.lastname));
            tr.appendChild(createCell(person.department));
            tr.appendChild(createCell(person.salary));
            results.appendChild(tr);
        }
    }//end of init

    function createCell(data){
        const td = document.createElement('td');
        td.textContent=data;
        return td;
    }
})();