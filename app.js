require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const nodemailer = require("nodemailer");

require("./config/passport-setup.js");

mongoose
  .connect("mongodb://localhost/project-3-nodejs", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"]
  })
);

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ROUTES go here using api
const auth = require("./routes/auth-router.js");
app.use("/api", auth);

const charity = require("./routes/charity-router.js");
app.use("/api", charity);

const category = require("./routes/category-router.js");
app.use("/api", category);

const time = require("./routes/time-router.js");
app.use("/api", time);

const mission = require("./routes/mission-router.js");
app.use("/api", mission);

module.exports = app;
