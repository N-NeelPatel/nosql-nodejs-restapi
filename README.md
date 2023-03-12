## Node.js Project with MongoDB
Using MongoDB for building APIs that allows users to view, create, update, and delete subscriber. This Node.js project uses MongoDB as the database for storing and retrieving data. The project includes the following files:

- `server.js`: This is the main server file that runs the server and makes the connection to the MongoDB database. To run the server, first run npm install to install all dependencies and then run npm start. The server will start listening on port 3000 by default.

- `routers/subscribers.js`: This is a route file that contains all the APIs related to the "/subscribers" route. The APIs allow you to create, read, update, and delete subscribers.

- `models/subscriber.js`: This file contains the Subscriber model used for MongoDB. It defines the schema for the Subscriber object.

- `tests/subscriber.test.js`: This is a test file that uses the Jest framework to test the APIs.

- `.env`: This is an environment file containing the database URL.

MongoDB is a NoSQL database that uses a flexible document model to store data. In this project, we use the mongoose library to interact with MongoDB from our Node.js application. Mongoose provides a simple and straightforward API for defining models, querying the database, and handling errors.

The Subscriber model defined in models/subscriber.js includes the following fields: name, email, and subscribedToChannel. Each Subscriber object is saved as a separate document in the subscribers collection in the database.

## The APIs in routers/subscribers.js allow you to perform the following operations:

- `GET /subscribers`: Retrieves all subscribers in the database.

- `GET /subscribers/:id`: Retrieves a specific subscriber by ID.

- `POST /subscribers`: Creates a new subscriber in the database. The request body should include the subscriber's name, email, and subscribedToChannel.

- `PUT /subscribers/:id`: Updates a specific subscriber by ID. The request body should include the updated subscriber's name, email, and subscribedToChannel.

- `DELETE /subscribers/:id`: Deletes a specific subscriber by ID.

The Jest tests in tests/subscriber.test.js are used to ensure that the APIs work correctly. These tests simulate HTTP requests to the server and verify that the response from the server is correct.

To run the tests, run `npm run test`. This will execute all the tests in the project.

## How to Run

To get started with this project, you'll need to have Node.js and MongoDB installed on your machine. Once you've cloned the repository, run npm install to install all dependencies.

Next, create a .env file at the root of the project with the following content:
```
DATABASE_URL=<your MongoDB database URL>
```
Replace `<your MongoDB database URL>` with the URL for your MongoDB database.

Finally, run `npm start` to start the server. The server will be accessible at http://localhost:3000.

You can use Postman to make HTTP requests to test the APIs and their workings.

## API Documentation
The following APIs are available in this project:

### Subscribers
- `GET /subscribers`: Retrieves all subscribers in the database.

- `GET /subscribers/:id`: Retrieves a specific subscriber by ID.

- `POST /subscribers`: Creates a new subscriber in the database. The request body should include the subscriber's name, email, and subscribedToChannel.

- `PUT /subscribers/:id`: Updates a specific subscriber by ID. The request body should include the updated subscriber's name, email, and subscribedToChannel.

- `DELETE /subscribers/:id`: Deletes a specific subscriber by ID.


