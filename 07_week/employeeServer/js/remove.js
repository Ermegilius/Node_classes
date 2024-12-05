'use strict';

(function(){
    let resultarea;
    let inputfield;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea=document.getElementById('resultarea');
        inputfield=document.getElementById('id');
        document.getElementById('submit').addEventListener('click', send);
        inputfield.addEventListener('focus', clear);
    }//end of init

    function clear(){
        resultarea.textContent='';
        inputfield.value='';
        resultarea.removeAttribute('class');
    }// end of clear

    function updateStatus(status){
        resultarea.textContent=status.message;
        resultarea.setAttribute('class', status.type);
    }//end of updateStatus


    async function send() {
        const value = inputfield.value;
        if (value<=0){
            updateStatus({message: 'Invalid id', type: 'error'});
        } else {
            try {
                const fetchOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({value})
                };
                const data = await fetch('/remove', fetchOptions);
                const result = await data.json();
                updateStatus(result);
            } catch(err){
                updateStatus({message: err.message, type: 'error'});
            }
        }
    }//end of send
})();