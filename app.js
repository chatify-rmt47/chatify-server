require("dotenv").config();
const express = require("express");
const cors = require('cors');
const router = require("./routes");
const connectToMongoDB = require("./db/connectToMongoDB");
const ErrorHandler = require("./middleware/ErrorHandler");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(ErrorHandler);
app.listen(port, () => {
  connectToMongoDB();
  console.log(`Example app listening on port ${port}!`);
});
