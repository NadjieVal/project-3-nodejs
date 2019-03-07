const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MissionSchema = new Schema(
  {
    charityLogo: { type: String, required: true, match: /^https?:\/\// },
    charityName: { type: String, required: true, minlength: 2 },
    missionName: { type: String, required: true, minlength: 2 }
  },
  {
    timestamps: true
  }
);

const Mission = mongoose.model("Mission", MissionSchema);

module.exports = Mission;
