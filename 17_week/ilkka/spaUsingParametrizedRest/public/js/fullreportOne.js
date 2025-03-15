
document.addEventListener('DOMContentLoaded', init);

let inputField;
let rows;
let totalSpan;
let customerDiv;

function init(){
    inputField=document.getElementById('orderid');
    rows=document.getElementById('rows');
    totalSpan=document.getElementById('total');
    customerDiv = document.getElementById('customerdata');

    document.getElementById('submit')
        .addEventListener('click', send);
}

async function send(){
    const orderid=inputField.value;
    const orderdata = await fetch(`/fullreport/${orderid}`);
    const order=await orderdata.json();

    updateCustomerdata(order.customer);
    rows.replaceChildren();
    for (const product of order.lines) {
        rows.appendChild(createRow(product));
    }

    totalSpan.textContent = order.totalSum.toFixed(2); 
      
}

function updateCustomerdata(data){
    customerDiv.innerHTML=
    `<p>Name: <span id="customer">${data.firstname} ${data.lastname}</span></p>
    <p>street: <span id="street">${data.address.street}</span></p>
    <p>postcode: <span id="postcode">${data.address.postcode}</span></p>
    <p>country: <span id="country">${data.address.country}</span></p>`;
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