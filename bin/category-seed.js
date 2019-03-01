require("dotenv").config();
const mongoose = require("mongoose");

const Category = require("../models/category-model.js");
const allCategories = require("./categories.json");

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

Category.insertMany(allCategories)
  .then(categoryResult => {
    console.log(`Inserted ${categoryResult.length} category`);
  })
  .catch(err => {
    console.log("CATEGORY insert error", err);
  });
