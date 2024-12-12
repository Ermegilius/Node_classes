'use strict';

(function(){

    document.addEventListener('DOMContentLoaded',init);

    async function init(){
        const options={
            method:'post',
            body:JSON.stringify({message:'Hello'}),
            headers:{
                'Content-Type':'application/json'
            }
        }

        const result=await fetch('/datajson', options);
        const resultJson=await result.json();
        document.getElementById('result').textContent=resultJson.message;
    }

})();