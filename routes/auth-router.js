const express = require("express");
const bcrypt = require("bcrypt");
const { sendSignupMail } = require("../config/nodemailer-setup");

const User = require("../models/user-model.js");

const router = express.Router();

router.post("/process-signup", (req, res, next) => {
  const { firstName, lastName, email, originalPassword } = req.body;

  if (!originalPassword || !originalPassword.match(/[0-9]/)) {
    next(new Error("Password can't be blank and must contain a number."));
    return;
  }

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ firstName, lastName, email, encryptedPassword })
    .then(userDoc => {
      sendSignupMail(userDoc).then(() => {
        req.logIn(userDoc, () => {
          userDoc.encryptedPassword = undefined;
          res.json(userDoc);
        });
      });
    })
    .catch(err => next(err));
});

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

module.exports = router;
