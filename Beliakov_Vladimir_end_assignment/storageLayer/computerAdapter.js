'use strict';

//modifies computer object by converting id and amount values to number type
function adapt(computer) {
    return Object.assign(computer,{
        id: +computer.id,
        amount: +computer.amount
    });
}

export default adapt;