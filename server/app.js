require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

/**
 * Middlewares
 */

app.use(cors({
  credentials: true,
  origin: process.env.FRONT_END_URL,
}));

app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(
  express.urlencoded({
    extended: false,
  })
); // Access data sent as urlEncoded (standard form or postman) @req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app;
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    // origin: ["http://localhost:4000","www.facebook.com","www.amazon.com",],
    // origin: "http://localhost:4000",
    // origin: "*"
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

// Test to see if user is logged In before getting into any router.
app.use(function (req, res, next) {
  console.log(req.session.currentUser);
  next();
});

/**
 * Routes
 */

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/", require("./routes/items"));

module.exports = app;