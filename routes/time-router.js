const express = require("express");

const Time = require("../models/time-model.js");

const router = express.Router();
const moment = require("moment");

// we get the category linked to time in the DB
router.get("/dashboard", (req, res, next) => {
  Time.find({
    user: { $eq: req.user._id },
    createdAt: {
      $gte: moment()
        .subtract(7, "days")
        .calendar(),
      $lte: moment().calendar()
    }
  })
    .populate("category")
    .sort({ createdAt: -1 })
    .then(categoryResult => res.json(categoryResult))
    .catch(err => next(err));
});

module.exports = router;
