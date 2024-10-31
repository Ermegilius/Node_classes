# Car storage API

## cars.json

```json
[
  { "model": "Fast", "license": "ABC-10" },
  { "model": "Med", "license": "XYZ-2" },
  { "model": "Slow", "license": "SL-33" },
  { "model": "Fast", "license": "CBA-4" }
]
```

## **getAllModels()**

returns the names of all models as an array of strings. The name is added to the array only once. If nothing is found, an empty array is returned.

### example

```json
["Fast", "Med", "Slow"]
```

## **getCar(key,value)**

retuns an array of all cars that matches the given key-value pair. If there is no match, an empty array is returned.

### example

```js
getCar("model", "Fast");
getCar("license", "SL-33");
```

## **getAllCars()**

returns all cars in the array or an empty array.

# carserver usage

## get all cars

```
http://localhost:3000/cars
```

## get all models

```
http://localhost:3000/models
```

## search by license

```
http://localhost:3000/search&key=license&value=ABC-10
```

## search by model

```
http://localhost:3000/search&key=model&value=Fast
```
