const test = [
    {
        "id": 1,
        "firstname": "Matt",
        "lastname": "River",
        "department": "ict"
    },
    {
        "id": 2,
        "firstname": "Mary",
        "lastname": "River",
        "department": "admin",
        "salary": 5000,
        "x":"something"
    },
    {
        "id": 3,
        "firstname": "Amanda",
        "lastname": "Jones",
        "department": "ict",
        "salary": 4500
    }
];

const temp=test.flatMap(item=>Object.keys(item));
console.log(temp);
const keys=new Set(temp);
console.log(keys);
console.log([...keys]);