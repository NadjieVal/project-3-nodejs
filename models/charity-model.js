const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charitySchema = new Schema(
  {
    charityLogo: { type: String, required: true, match: /^https?:\/\// },
    charityName: { type: String, required: true, minlength: 2 },
    missionName: { type: String, required: true, minlength: 2 },
    missionIntro: { type: String, required: true, minlength: 5 },
    missionDescription: { type: String, required: true, minlength: 10 },
    charityUrl: { type: String, required: true, match: /^https?:\/\// },
    missionDate: { type: Date, required: true },
    missionTime: { type: String, required: true },
    location: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Refugees",
        "Women",
        "Children",
        "Medicine",
        "Human Rights",
        "Animals",
        "Environment"
      ]
    }
  },
  {
    timestamps: true
  }
);

const Charity = mongoose.model("Charity", charitySchema);

module.exports = Charity;
