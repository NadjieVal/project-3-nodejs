const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MissionSchema = new Schema(
  {
    charityLogo: { type: String, required: true },
    charityName: { type: String, required: true, minlength: 2 },
    missionName: { type: String, required: true, minlength: 2 },
    duration: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Mission = mongoose.model("Mission", MissionSchema);

module.exports = Mission;
