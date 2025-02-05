let resultarea;

document.addEventListener('DOMContentLoaded', init);

function init(){
    resultarea=document.getElementById('resultarea');
    const form=document.getElementById('form');
    form.addEventListener('submit', send);
    form.addEventListener('reset', clear);
}

function clear(){
    resultarea.innerHTML='';
}

async function send(e){
    e.preventDefault();
    const dataFromForm=new FormData(e.target);
    const dataJson=Object.fromEntries(dataFromForm.entries());

    const options = {
        method: 'POST',
        body: JSON.stringify(dataJson),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const data = await fetch('/add', options);
    const result = await data.json();
    updateResultarea(result);
}

function updateResultarea(result) {
    resultarea.innerHTML = `
        <pre>${JSON.stringify(result, null, 2)}</pre>`;
}