require("dotenv").config();
const mongoose = require("mongoose");

const Charity = require("../models/charity-model.js");
const allCharity = require("./charities.json");

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

Charity.insertMany(allCharity)
  .then(charityResult => {
    console.log(`Inserted ${charityResult.length} charity`);
  })
  .catch(err => {
    console.log("CHARITY insert error", err);
  });
