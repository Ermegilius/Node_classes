'use strict';

/* class Person{
    constructor(firstname, lastname){
        this.firstname = firstname;
        this.lastname = lastname;
    }
}; */

/* const a = new Person('abel', 'Smith');
console.log(a.firstname);
a.firstname = 'Abel';
console.log(a.firstname); */

class Car{
    #name
    constructor(name){
        this.#name = name;
    }
    get carName(){ //getter
    return this.#name;
    }

    set carName(name){ //setter
        this.#name = name;
    }
}

const myCar = new Car('Fast');
//console.log(myCar);
//console.log(myCar.name);
//console.log(myCar.carName);

//myCar.name = 'Slow';
//console.log(myCar);

myCar.carName = 'Medium';
console.log(myCar.carName);