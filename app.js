require('dotenv').config();
const express = require('express');
const router = require('./routes');
const connectToMongoDB = require('./db/connectToMongoDb');
const ErrorHandler = require('./middleware/ErrorHandler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(ErrorHandler);
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Example app listening on port ${port}!`);
});
