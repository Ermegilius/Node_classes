'use strict';


function getAddressOfOrder(order) {
   return{
       firstname: order.customer.firstname,
       lastname: order.customer.lastname,
       address: order.customer.address
   }
}



module.exports={
     getAddressOfOrder
}





