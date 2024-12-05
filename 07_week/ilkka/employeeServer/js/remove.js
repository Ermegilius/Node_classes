'use strict';

(function(){
    let resultarea;
    let inputField;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea=document.getElementById('resultarea');
        inputField = document.getElementById('empid');

        document.getElementById('submit').addEventListener('click',send);

        inputField.addEventListener('focus',clear);
    } //end of init

    function clear(){
        inputField.value='';
        resultarea.textContent='';
        resultarea.removeAttribute('class');
    }//end of clear

    function updateStatus(status){
        resultarea.textContent = status.message;
        resultarea.setAttribute('class',status.type);
    } //end of updateStatus

    async function send(){
        const value=inputField.value;

        if(value<=0){
            updateStatus({message:'Invalid id', type:'error'});
        }
        else{
            try{
                const fetchOptions={
                    method:'POST',
                    body:JSON.stringify({value}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                };

                const data=await fetch('/remove',fetchOptions);
                const result=await data.json();
                updateStatus(result);

            }
            catch(err){
                updateStatus({ message: err.message, type: 'error' });
            }
        }
    }

})();