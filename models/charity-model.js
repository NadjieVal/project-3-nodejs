const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charitySchema = new Schema(
  {
    missionName: { type: String, required: true, minlength: 2 },
    missionDescription: { type: String, required: true, minlength: 10 },
    charityName: { type: String, required: true, minlength: 2 },
    charityLogo: { type: String, required: true, match: /^https?:\/\// },
    charityUrl: { type: String, required: true, match: /^https?:\/\// },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "refugees",
        "women",
        "children",
        "medicine",
        "human-rights",
        "animals"
      ]
    },
    charityDescription: { type: String, required: true, minlength: 10 }
  },
  {
    timestamps: true
  }
);

const Charity = mongoose.model("Charity", charitySchema);

module.exports = Charity;
