const express = require("express");

const Charity = require("../models/charity-model.js");

const router = express.Router();

router.get("/charities", (req, res, next) => {
  Charity.find()
    .sort({ createdAt: -1 })
    .limit(20)
    .then(charityResult => res.json(charityResult))
    .catch(err => next(err));
});

router.get("/charities/:charityId", (req, res, next) => {
  const { charityId } = req.params;
  Charity.findById(charityId)
    .then(charityDoc => res.json(charityDoc))
    .catch(err => next(err));
});

router.post("/charities", (req, res, next) => {
  const {
    missionName,
    missionDescription,
    charityName,
    charityLogo,
    charityUrl,
    charityEmail,
    date,
    time,
    duration,
    location,
    category,
    charityDescription
  } = req.body;
  Charity.create({
    missionName,
    missionDescription,
    charityName,
    charityLogo,
    charityUrl,
    charityEmail,
    date,
    time,
    duration,
    location,
    category,
    charityDescription
  })
    .then(charityDoc => res.json(charityDoc))
    .catch(err => next(err));
});

module.exports = router;
