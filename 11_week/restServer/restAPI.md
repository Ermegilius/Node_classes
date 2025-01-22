# Web APIs - REST

## Docs

-   https://en.wikipedia.org/wiki/REST
-   https://developer.mozilla.org/en-US/docs/Web/API
-   https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
-   https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
-   https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
-   https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Methods

-   get
-   post
-   put
-   delete

-   options
-   head

-   patch
-   trace
-   connect

## Resource

For example computers

```
http://localhost:3000/api/computers
```

What to do with thr source `computers` depends on the method used.
The resource `computers` is an **endpoint**.

To get all the computers we use GET:

```http
GET http://localhost:3000/api/computers HTTP/1.1
```

returns an array

```json
[
	{
		"id": 1,
		"name": "Macbook Air",
		"price": 1000
	},
	{
		"id": 2,
		"name": "Macbook Pro",
		"price": 2000
	}
]
```

To get computers use `GET`

```http
GET http://localhost:3000/api/computers HTTP/1.1
```

to get one computer (id=2):

```http
GET http://localhost:3000/api/computers/2 HTTP/1.1
```

might return

```json
{
	"id": 2,
	"name": "Macbook Pro",
	"price": 2000
}
```

## Examples

### get all computers

```
GET /api/computers
```

### get one computer

```
GET /api/computers/2
```

### to add a computer

computer is sent as json body

```
POST /api/computers
```

### to update a computer

computer is sent as a json body.
If the computer with given number does not exist, it will be added. If the computer exists it will be updated (replaced)

```
PUT /api/computers/2
```

### to remove a computer

```
DELETE /api/computers/2
```

## Usage with fetch

Let's assume `cors` "situation"

### GET

```js
const options = {
	method: "GET",
	mode: "cors",
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

The GET is the default method, so you can just fetch

```js
const data = await fetch(urlToEndpoint, { mode: "cors" });
const jsonData = await data.json();
```

GET all:

```js
fetch("http://localhost:3000/api/computers", { mode: "cors" });
```

GET one:

```js
fetch("http://localhost:3000/api/computers/2", { mode: "cors" });
```

Delete one computer(id=2):

```js
fetch("http://localhost:3000/api/computers/2", options);
```

### POST and PUT

```js
const computerObject = {
	id: 3,
	name: "Macbook Pro",
	price: 2000,
};
```

#### post

```js
const options = {
	method: "POST",
	mode: "cors",
	body: JSON.stringify(computerObject),
	headers: {
		"Content-Type": "application/json",
	},
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

#### put

```js
const options = {
	method: "PUT",
	mode: "cors",
	body: JSON.stringify(computerObject),
	headers: {
		"Content-Type": "application/json",
	},
};

const data = await fetch(urlToEndpoint, options);
const jsonData = await data.json();
```

```js
fetch("http://localhost:3000/api/computers/2", options);
```
