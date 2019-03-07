require("dotenv").config();

const mongoose = require("mongoose");

const Time = require("../models/time-model.js");

mongoose
  .connect("mongodb://localhost/project-3-nodejs", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const TimeData = [
  {
    time: 30,
    category: "5c7cfb019de1d42dbd5bda87",
    user: "5c7cf1d29733aa38a17349ed"
  },
  {
    time: 90,
    category: "5c7cfb019de1d42dbd5bda8a",
    user: "5c793dd4d61e64211d352e06"
  }
];

Time.insertMany(TimeData)
  .then(timeResults => {
    console.log(`Inserted Time saved`);
  })
  .catch(err => {
    console.log("Insert FAILURE!", err);
  });
