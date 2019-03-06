const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TimeSchema = new Schema(
  {
    time: { type: Number, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Time = mongoose.model("Time", TimeSchema);

module.exports = Time;
