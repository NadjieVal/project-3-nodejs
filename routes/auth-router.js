const express = require("express");
const bcrypt = require("bcrypt");
const { sendSignupMail } = require("../config/nodemailer-setup");

const User = require("../models/user-model.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => err);
});

router.post("/process-signup", (req, res, next) => {
  const { firstName, lastName, email, originalPassword } = req.body;

  if (!originalPassword || !originalPassword.match(/[0-9]/)) {
    next(new Error("Password can't be blank and must contain a number."));
    return;
  }

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ firstName, lastName, email, encryptedPassword })
    .then(userDoc => {
      // sendSignupMail(userDoc).then(() => {
      req.logIn(userDoc, () => {
        userDoc.encryptedPassword === undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
});
// });

router.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        next(new Error("Email is incorrect."));
        return;
      }

      const { encryptedPassword } = userDoc;

      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        next(new Error("Password is incorrect."));
        return;
      }

      req.logIn(userDoc, () => {
        userDoc.encryptedPassword = undefined;
        res.json(userDoc);
      });
    })
    .catch(err => next(err));
});

router.get("/logout", (req, res, next) => {
  req.logOut();
  res.json({ message: "You are logged out!" });
});

router.get("/profile/:userId", (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName, email } = req.body;
  console.log("USERBACKEND", userId);
  User.findById(userId)
    .then(userDoc => res.json(userDoc))
    .catch(err => next(err));
});

module.exports = router;
