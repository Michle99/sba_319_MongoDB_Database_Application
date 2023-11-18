# SBA 319: MongoDB Database Application

## Introduction
This assessment measures your understanding of MongoDB and your capability to implement its features in a practical manner. You have creative freedom in the topic, material, and purpose of the web application you will be developing, so have fun with it! However, remember to plan the scope of your project to the timeline you have been given.


## Objectives
- Create a server application with Node, Express, and MongoDB.
- Create a CRUD API using Express and MongoDB.
- Use MongoDB indexing to make efficient queries.
- Create MongoDB validation rules.
- Use MongoDB validation to ensure data consistency.

## Movies API

The Movies API allows you to manage a collection of movies. It supports CRUD (Create, Read, Update, Delete) operations to interact with movie data.

## Base URL
[http://localhost:5000/movies](http://localhost:5000/movies)


## Movies Routes Requests and Responses

### 1. Get All Movies
- **Endpoint:** `GET /`
- **Description:** Get a list of all movies.
- **Example Response:**

```json
[
  {
    "_id": {
        "$oid": "573a1391f29313caabcd7db6"
    },
    "plot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "genres": [
        "Drama"
    ],
    "runtime": 82,
    "cast": [
        "Betty Compson",
        "Clive Brook",
        "Henry Victor",
        "A.B. Imeson"
    ],
    "title": "White Shadows",
    "fullplot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
    "languages": [
        "English"
    ],
    "released": {
        "$date": {
        "$numberLong": "-1440892800000"
        }
    },
    "directors": [
        "Graham Cutts"
    ],
    "writers": [
        "Alfred Hitchcock",
        "Michael Morton (novel)"
    ],
    "awards": {
        "wins": 1,
        "nominations": 0,
        "text": "1 win."
    },
    "lastupdated": "2015-05-10 00:19:38.277000000",
    "year": 1924,
    "imdb": {
        "rating": 6.5,
        "votes": 156,
        "id": 15493
    },
    "countries": [
        "UK"
    ],
    "type": "movie",
    "tomatoes": {
        "viewer": {
        "rating": 2.8,
        "numReviews": 11
        },
        "lastUpdated": {
        "$date": "2015-06-14T18:00:09.000Z"
        }
    },
    "num_mflix_comments": 0
  }
  // ...
]

```

### 2. Get a Single Movie

- **Endpoint:** `GET /:id`
- **Description:** Get details of a specific movie by ID.
- Parameters:
    - id: Movie ID
- **Example Response:**
```json
{
  "_id": {
    "$oid": "573a1391f29313caabcd7db6"
  },
  "plot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
  "genres": [
    "Drama"
  ],
  "runtime": 82,
  "cast": [
    "Betty Compson",
    "Clive Brook",
    "Henry Victor",
    "A.B. Imeson"
  ],
  "title": "White Shadows",
  "fullplot": "In Paris a wild girl becomes possessed by the soul of her twin who died to save her life.",
  "languages": [
    "English"
  ],
  "released": {
    "$date": {
      "$numberLong": "-1440892800000"
    }
  },
  "directors": [
    "Graham Cutts"
  ],
  "writers": [
    "Alfred Hitchcock",
    "Michael Morton (novel)"
  ],
  "awards": {
    "wins": 1,
    "nominations": 0,
    "text": "1 win."
  },
  "lastupdated": "2015-05-10 00:19:38.277000000",
  "year": 1924,
  "imdb": {
    "rating": 6.5,
    "votes": 156,
    "id": 15493
  },
  "countries": [
    "UK"
  ],
  "type": "movie",
  "tomatoes": {
    "viewer": {
      "rating": 2.8,
      "numReviews": 11
    },
    "lastUpdated": {
      "$date": "2015-06-14T18:00:09.000Z"
    }
  },
  "num_mflix_comments": 0
}
```

### Add a New Movie
- **Endpoint:** `GET /`
- **Description:** Add a new movie to the collection.
- **Request Body:**

```json
{
  "plot": "Takuma Sakamoto, a reclusive gamer, is unexpectedly transported into the virtual world of his favorite MMORPG as his in-game character, the powerful Demon Lord Diablo. Two girls who summoned him to control him end up becoming his servants due to a magic rebound. Takuma, dealing with social anxiety, adopts his in-game persona to navigate the new world. Alongside his companions, Rem and Shera, he embarks on a quest to remove the magic collars while assisting them with their personal struggles that led to their summoning.",
  "genres": ["isekai"],
  "runtime":23,
  "cast": [
    "Diablo",
    "Sheera",
    "Rem"
  ],
  "poster": "https://thecinemaholic.com/wp-content/uploads/2021/06/How-not-to-summon.jpg",
  "title": "How not to summon a Demon Lord season 2",
  "fullplot": "Takuma Sakamoto, a reclusive gamer, is unexpectedly transported into the virtual world of his favorite MMORPG as his in-game character, the powerful Demon Lord Diablo. Two girls who summoned him to control him end up becoming his servants due to a magic rebound. Takuma, dealing with social anxiety, adopts his in-game persona to navigate the new world. Alongside his companions, Rem and Shera, he embarks on a quest to remove the magic collars while assisting them with their personal struggles that led to their summoning.",
  "languages": [
    "English"
  ],
  "released": "2021-04-09T00:00:00.000Z",
  "directors": [
    "Satoshi Kuwabara"
  ],
  "rated": "TV-G",
  "awards": {},
  "lastupdated": "",
  "year": 2018,
  "imdb": {},
  "countries": [
    "JAPAN"
  ],
  "type": "ANIME",
  "tomatoes": {
    "viewer": {},
    "fresh": 6,
    "critic": {
      "rating": 7.6,
      "numReviews": 6,
      "meter": 100
    },
    "rotten": 0,
    "lastUpdated": ""
  },
  "num_mflix_comments": 0
}

```

- **Example Response:**

```json
{
    "acknowledged": true,
    "insertedId": "6557d63b84def3c71fe4da1c"
}

```
#### Post request screenshot
<img src="./sba_319_pic/POST_REQ.png" width="80%" alt="Post Request and Response">

### Update a Movie 
- **Endpoint:** PUT /:id
- **Description:** Update details of a specific movie by ID.
- **Parameters:**
    - `id`: Movie ID
- **Request Body:**

```json
{
  "type": "ANIMES WEB SERIES"
}
```

- **Example Response:**
```json
{
  "acknowledged": true,
  "modifiedCount": 1,
  "upsertedId": null,
  "upsertedCount": 0,
  "matchedCount": 1
}

```

### PUT Request Screenshot
<img src="./sba_319_pic/PUT_ID.png" width="80%" alt="Update new movie">


### 5. Delete a Movie
- **Endpoint: `DELETE /:id`**
- **Description:** Delete a specific movie by ID.
- **Parameters:**
    - `id`: Movie ID
- **Example Response:**
```json
    {
    "acknowledged": true,
    "deletedCount": 1
    }
```
#### Delete Response Screenshot
<img src="./sba_319_pic/DELETE.png" width="90%" alt="Delete new movie">


### FAILED VALIDATIONS REQUEST

- **Validation Example REQUEST**

<img src="./sba_319_pic/failed_Validation_0.png" width="90%" alt="Failed movie validations">

- **Validation Example Response**

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