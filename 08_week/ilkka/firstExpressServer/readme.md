# Express app

https://expressjs.com/
https://ejs.co/

## create folder for the application

## create package.json

```shell
npm init -y
```

or

```shell
npm init
```
and answer the questions

You can edit the package.json later with editor

The package.json can also be created manually. At least name and version are needed
```json
{
  "name": "firstexpressserver",
  "version": "1.0.0"
}
```

## install libraries
```shell
npm install express
```

Installs express library with dependencies to node_modules folder.

to install multiple libraries on the same time (this install ejs and mariadb)
```shell
 npm install ejs mariadb
 ```

## install from dependencies list (reinstall)
```
npm install
```
installs all dependencies that are listed in package.json

## check vulnerabilities
```shell
npm audit
```

## check licenses
```shell
npx license-checker --summary
```

```shell
npx license-checker
```