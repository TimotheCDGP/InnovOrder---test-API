## Description

This is a Nest.js API project, that can register, authentificate and edit users on a MongoDB database.
It can also search products infos by their barcode using OpenFoodFacts API, on an authentified route. 

## Installation

**Before you attempt to setup the project, it is required to install node.js and git**


```bash
$ git clone https://github.com/TimotheCDGP/InnovOrder---test-API.git
```
```bash
$ cd InnovOrder---test-API
```
```bash
$ npm install
```

*Also, don't forget to create a MongoDB databse and config it in the app.module.ts file*

## Running the app

```bash
$ npm run start
```


## Use the app

Once the server is running, you can start making some API requests.
It is recommended use Postman or Insomnia to tets the API.


## To create a new user in the database

POST
```
http://localhost:3000/users
```
*This request needs a body containing an object with {"login":"","password":""}*


## To edit an user in the database

PUT
```
http://localhost:3000/users/ + actual user id in database
```
*This request needs a body containing an object with the new credentials {"login":"","password":""}*

## To authenticate as an user

POST
```
http://localhost:3000/users/login
```
*This request needs a body containing an object with {"login":"","password":""}*
*This will return a JWT (JSON Web Token), they expire after 1 hour*

## To search a product with OpenFoodFact API by it's barcode

POST
```
http://localhost:3000/users/product/ + barcode
```
*This request requires a valid JWT token*

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
