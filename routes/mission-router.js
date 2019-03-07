const express = require("express");

const Mission = require("../models/mission-model.js");

const router = express.Router();
const moment = require("moment");

// we get the category linked to time in the DB
router.post("/your-missions", (req, res, next) => {
  const { charityLogo, charityName, missionName, duration } = req.body;

  Mission.create({
    charityLogo,
    charityName,
    missionName,
    duration,
    user: req.user._id
  })
    .then(missionDoc => res.json(missionDoc))
    .catch(err => next(err));
});

router.get("/your-missions", (req, res, next) => {
  Mission.find({
    user: { $eq: req.user._id }
  })
    .sort({ createdAt: -1 })
    .then(missionResult => res.json(missionResult))
    .catch(err => next(err));
});

module.exports = router;
