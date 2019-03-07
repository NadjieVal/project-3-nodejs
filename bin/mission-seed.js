require("dotenv").config();

const mongoose = require("mongoose");

const Mission = require("../models/mission-model.js");
const allMissions = require("./charities.json");

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
