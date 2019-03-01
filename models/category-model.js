const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2 },
    icon: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
