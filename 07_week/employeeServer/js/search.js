'use strict';

(function(){
    let keylist;
    let resultarea;
    let searchvalue;

    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        keylist=document.getElementById('keylist');
        resultarea=document.getElementById('resultarea');
        searchvalue=document.getElementById('searchvalue');

        try{
            const data= await fetch('/keys');
            if(data.ok){
                const keys = await data.json();
                if(keys.length>0){
                    populateList(keys);
                } else {
                    showMessage('search not available');
                }
            } else {
                showMessage('not available');          
            }
        } catch (err){
            showMessage(err.message);
        }

    }//end of init

    function populateList(keynames){
        for(const field of keynames){
            const option = document.createElement('option');
            option.value=field;
            option.textContent=field;

            keylist.appendChild(option);
        }

        keylist.value=keynames[0];
        keylist.addEventListener('change', clear);
        searchvalue.addEventListener('focus', clear);
        document.getElementById('submit').addEventListener('click', send);
    }

    function clear(){
        resultarea.innerHTML='';
        searchvalue.value='';
    }

    function showMessage(message){
        resultarea.innerHTML=`<p>${message}</p>`;
    }

    async function send() {
        const keyName = keylist.value;
        const value = searchvalue.value;

        try{
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({value, key: keyName})
            };
            const data = await fetch('/search', fetchOptions);
            const result = await data.json();

            updatePage(result);        
        } catch (err){
            showMessage(err.message);
        }        
    }// end of send

    function updatePage(data) {
       if(!data){
        showMessage('Program error!')
       } else if (data.length===0){
        showMessage('No data found');
       } else {
        const htmlString = data.map(item=>createPerson(item)).join(' ');
        resultarea.innerHTML=htmlString;
       }   
    }//end of updatePage

    function createPerson(person){
        return `<div class="person">
        <p>id: ${person.id}</p>
        <p>First name: ${person.firstname}</p>
        <p>Last name: ${person.lastname}</p>
        <p>Department: ${person.department}</p>
        <p>Salary: ${person.salary} $</p>
        `
    }

})();