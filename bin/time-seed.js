require("dotenv").config();

const mongoose = require("mongoose");

const Time = require("../models/time-model.js");

mongoose
  .connect(process.env.MONGODB_URI, {
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

// const TimeData = [
//   {
//     time: 0,
//     category: "",
//     user: "",
//     createdAt: ""
//   }
// ];

// Time.insertMany(TimeData)
//   .then(timeResults => {
//     console.log(`Inserted ${timeResults.length} time`);
//   })
//   .catch(err => {
//     console.log("Insert FAILURE!", err);
//   });
