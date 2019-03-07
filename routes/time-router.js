const express = require("express");

const Time = require("../models/time-model.js");
// const Category = require("../models/category-model.js");

const router = express.Router();
const moment = require("moment");

// we get the category linked to time in the DB
router.get("/dashboard", (req, res, next) => {
  Time.find({
    user: { $eq: req.user._id },
    createdAt: {
      $gte: moment()
        .subtract(7, "days")
        .toDate(),
      $lte: moment().toDate()
    }
  })
    .populate({ path: "category", select: "name" })
    .populate({ path: "category", select: "icon" })
    .sort({ createdAt: -1 })
    .then(categoryResult => res.json(categoryResult))
    .catch(err => next(err));
});

router.post("/dashboard", (req, res, next) => {
  const { inputTime, categoryId } = req.body;
  Time.create({ time: inputTime, category: categoryId, user: req.user._id })
    .then(timeDoc => res.json(timeDoc))
    .catch(err => next(err));
});

module.exports = router;
