# SBA 319: MongoDB Database Application

## Introduction
This assessment measures your understanding of MongoDB and your capability to implement its features in a practical manner. You have creative freedom in the topic, material, and purpose of the web application you will be developing, so have fun with it! However, remember to plan the scope of your project to the timeline you have been given.


## Objectives
- Create a server application with Node, Express, and MongoDB.
- Create a CRUD API using Express and MongoDB.
- Use MongoDB indexing to make efficient queries.
- Create MongoDB validation rules.
- Use MongoDB validation to ensure data consistency.

## Movies Routes Requests and Responses

### GET REQUESTS
- GET REQUEST:
```
/movies
```
- RESPONSE:

<img src="./sba_319_pic//GET.png" width="90%" alt="Get All Movies">

- GET BY ID
```
/movies/:id
```
- RESPONSE:

<img src="./sba_319_pic/GET_ID.png" width="90%" alt="Get movie by id">


### POST REQUEST

- POST REQUEST

```
/movies
```

- RESPONSE

<img src="./sba_319_pic/POST_REQ.png" width="90%" alt="Post new movie">


### PUT REQUEST

- PUT REQUEST

```
/movies/:id
```

- RESPONSE:

<img src="./sba_319_pic/PUT_ID.png" width="90%" alt="Update new movie">


### DELETE MOVIE REQUEST

- DELETE REQUEST:

```
/movies/:id
```

- RESPONSE:


<img src="./sba_319_pic/DELETE.png" width="90%" alt="Delete new movie">


### FAILED VALIDATIONS REQUEST

- REQUEST

<img src="./sba_319_pic/failed_Validation_0.png" width="90%" alt="Failed movie validations">

- RESPONSE

<img src="./sba_319_pic/failed_validation_1.png" width="90%" alt="Failed movie validations">


## Dependencies
- dotenv
- express
- mongodb
- nodemon

## Getting Started
Clone this repo: [sba_319_MongoDB_Database_Application](https://github.com/Michle99/sba_319_MongoDB_Database_Application).


- Install dependencies:
```
npm install 
```
or

```
npm i
```

- Start local server:

```
npm run start
```