
document.addEventListener('DOMContentLoaded', init);

let inputField;
let rows;
let totalSpan;

function init(){
    inputField=document.getElementById('orderid');
    rows=document.getElementById('rows');
    totalSpan=document.getElementById('total');

    document.getElementById('submit')
        .addEventListener('click', send);
}

async function send(){
    const orderid=inputField.value;
    const data = await fetch(`/report/${orderid}`);
    const result=await data.json();
    rows.replaceChildren();
    for(const product of result.lines){
        rows.appendChild(createRow(product));
    }

    totalSpan.textContent = result.totalSum.toFixed(2);   
}

function createRow(product){
    const tr=document.createElement('tr');
    tr.appendChild(createCell(product.productId));
    tr.appendChild(createCell(product.productname));
    tr.appendChild(createCell(product.amount));
    tr.appendChild(createCell(product.price.toFixed(2)));
    tr.appendChild(createCell(product.rowTotal.toFixed(2)));
    return tr;                 
}

function createCell(data){
    const td=document.createElement('td');
    td.textContent=data;
    return td;
}