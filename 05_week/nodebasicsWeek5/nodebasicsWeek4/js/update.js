'use strict';

//this demo doesn't handle errors!

(function(){

    let iceCreamlist;
    let resultarea;

    document.addEventListener('DOMContentLoaded', init);

    async function init(){
        iceCreamlist=document.getElementById('iceCreamlist');
        resultarea=document.getElementById('resultarea');

        const data = await fetch('/flavors');
        const flavors=await data.json();

        for(const flavor of flavors){
            const option = document.createElement('option');
            option.value=flavor;
            option.textContent=flavor;
            iceCreamlist.appendChild(option);
        }

        iceCreamlist.addEventListener('change', choose);
        iceCreamlist.value="";
    }

    async function choose(){
        const listValue=iceCreamlist.value;
        if(listValue.length>0){
            const data=await fetch(`/icecreams/${listValue}`);
            const result=await data.json();
            showResult(result);
        }
        else{
            resultarea.innerHTML='';
        }
    }

    function showResult(data){
        let htmlString=`
        <div>
            <p>${data.name}</p>
            <p>${data.price} €</p>
        </div>
        `;

        if(data.image && data.image.length>0){
            htmlString+=`<img src="/images/${data.image}" />`;
        }
        resultarea.innerHTML=htmlString;
    }

})();