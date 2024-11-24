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
        - returns an array of employees / []
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
-   statusCodes.js

