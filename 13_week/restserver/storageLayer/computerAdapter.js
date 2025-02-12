'use strict';

function adapt(computer) {
    return Object.assign(computer,{
        id: +computer.id,
        price: +computer.price
    });
}

module.exports={adapt}
