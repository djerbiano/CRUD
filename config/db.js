const mongoose = require("mongoose");

// DB info
const dbHost = "mongodb://127.0.0.1:27017";

const dbName = "lwn";
const URL = `${dbHost}/${dbName}`;
const OPTIONS = {};

// DB connection
mongoose.connect(URL, OPTIONS)
  .then(() => {
    console.log(`Connected to ${URL} db`);
  })
  .catch(err => {
    console.error(`Mongoose initial connection error: ${err}`);
  });

const db = mongoose.connection;


// Connect and catch errors
db.on("error", err => {
  console.log(`Mongoose database connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log(`Mongoose disconnected from ${URL}`);
});

module.exports = db;