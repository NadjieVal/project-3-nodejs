const express = require("express");

const Category = require("../models/category-model.js");

const router = express.Router();

router.get("/categories", (req, res, next) => {
  Category.find()
    .sort({ createdAt: -1 })
    .then(categoryResult => res.json(categoryResult))
    .catch(err => next(err));
});

router.get("/categories/:categoryId", (req, res, next) => {
  const { categoryId } = req.params;
  Category.findById(categoryId)
    .then(categorDoc => res.json(categoryDoc))
    .catch(err => next(err));
});

router.post("/categories", (req, res, next) => {
  const { name, icon } = req.body;
  Category.create({
    name,
    icon
  })
    .then(categoryDoc => res.json(categoryDoc))
    .catch(err => next(err));
});

module.exports = router;
