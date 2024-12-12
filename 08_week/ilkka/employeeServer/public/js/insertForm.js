'use strict';

(function(){

    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        resultarea=document.getElementById('resultarea');

        document.getElementById('form').addEventListener('submit',send);
        document.getElementById('form').addEventListener('reset', clear);
    }

    function clear(){
        resultarea.innerHTML='';
        resultarea.removeAttribute('class');
    }

    async function send(e){
        e.preventDefault();
        const dataFromForm=new FormData(e.target);
        const dataJson=Object.fromEntries(dataFromForm.entries());

        try{
            const fetchOptions={
                method:'POST',
                body:JSON.stringify(dataJson),
                headers:{
                    'Content-Type':'application/json'
                }
            };

            const data=await fetch('/add',fetchOptions);
            const result=await data.json();
            showStatus(result)
        }
        catch(err){
            showStatus({message:err.message, type:'error'});
        }
    } //end of send
    
    function showStatus(status){
        resultarea.textContent=status.message;
        resultarea.setAttribute('class',status.type);
    }

})();