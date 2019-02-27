const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charitySchema = new Schema(
  {},
  {
    timestamps: true
  }
);

const Charity = mongoose.model("Charity", charitySchema);

module.exports = Charity;
