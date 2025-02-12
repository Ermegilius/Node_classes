let resultarea;
let inputfield;

document.addEventListener('DOMContentLoaded',init);

function init(){
    resultarea=document.getElementById('resultarea');
    inputfield = document.getElementById('compId');
    document.getElementById('getbutton').addEventListener('click',sendGet);
    document.getElementById('postbutton').addEventListener('click', sendPost);
}

async function sendGet(){
    resultarea.innerHTML='';
    const id=inputfield.value;

    const data = await fetch(`/getOne/${id}`);
    const result=await data.json();
    updateResultarea(result);
}

async function sendPost() {
    resultarea.innerHTML = '';
    const id = inputfield.value;
    const options={
        method:'POST',
        body:JSON.stringify({id}),
        headers:{
            'Content-Type':'application/json'
        }
    }

    const data = await fetch('/getOne',options);
    const result = await data.json();
    updateResultarea(result);
}

function updateResultarea(result){
    if(result.length===0){
        resultarea.innerHTML='<h2>No compurter found</h2>'
    }
    else{
        let htmlString='';
        for(const computer of result){
            htmlString+=`
            <div>
                <p>Id: ${computer.id}</p>
                <p>Name: ${computer.name}</p>
                <p>Price: ${computer.price}</p>
                <p>Type: ${computer.type}</p>
            </div>`
        }
        resultarea.innerHTML =htmlString;  
    }
}