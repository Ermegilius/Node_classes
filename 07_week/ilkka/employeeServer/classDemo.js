'use strict';

class Person{
    constructor(firstname,lastname){
        this.firstname=firstname;
        this.lastname=lastname;
    }
}

// const a=new Person('abel','Smith');
// console.log(a.firstname);
// a.firstname='Abel';

// console.log(a.firstname);

class Car{
    #name
    constructor(name){
        this.#name=name;
    }

    get carName(){
        return this.#name;
    }
    set carName(newName){
        this.#name=newName;
    }
}

const myCar=new Car('Fast GT');
console.log(myCar.name);

myCar.name='assas'
console.log(myCar);
console.log(myCar.carName);
myCar.carName='GT';
console.log(myCar.carName);