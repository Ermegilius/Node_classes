# Employee data storage

## employees.json
```json
[
    {
        "id":1,
        "firstname":"Matt",
        "lastname":"River",
        "department":"ict",
        "salary":4000
    },
    {
        "id": 2,
        "firstname": "Mary",
        "lastname": "River",
        "department": "admin",
        "salary": 5000
    }
]
``` 

## storageLayer API

### private API

#### files
-   readerWriter.js
    - readStorage
        - returns an array of employees / []
    - writeStorage
        - returns true/false

-   personAdapter.js
    -   adapt
        -   casts id and salary to numbers

-   storageLayer.js
    -   serves the public API
    -   getAllFromStorage
        -   returns an array of employees / []
    -   getFromStorage
        -   returns an array of objects matching the criterion / []
    -   addToStorage
        -   returns true/false
    -   removeFromStorage
        -   returns true/false
    -   getKeys
        -   returns all keys (once) in an array / []
    -   primary_key
        -   returns the unique primary_key






### public API 

#### Files
-   dataStorageLayer.js
    -   Datastorage class
    -   top layer of the storage

    -   getAll()
        -   returns an array of all employees / []

    -   get(value,key)
        -   returns an array of matching employees / []

    -   insert(newItem)
        -   returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE

    -   remove(value)
        -   returns REMOVE_OK / NOT_REMOVED / NOT_FOUND

    -   getter CODES
        -   array of statuscodes

    -   getter TYPES
        -   returns an array of types of statuscodes

    -   getter KEYS
        -   return an arrays of keys / []

    -   getter PRIMARY_KEY
        -   unique key for object


-   statusCodes.js

```js
const CODES={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2
    ....
}
```

```js
const TYPES={
    ERROR:'error',
    INFO:'info'
}
```

The format of status messages:

```js
const MESSAGES={
    PROGRAM_ERROR:()=>({
        message:'Sorry! Error in the program',
        code:CODES.PROGRAM_ERROR,
        type:TYPES.ERROR
    }),
    NOT_FOUND:(key,value)=>({
        message:`No resource found with ${key} ${value}`,
        code:CODES.NOT_FOUND,
        type:TYPES.INFO,
    }),
    INSERT_OK:(key,value)=>({
        message:`Resource with ${key} ${value} was inserted`,
        code:CODES.INSERT_OK,
        type:TYPES.INFO
    })
}
```