/** @format */

const express = require("express");
const mongoose = require("mongoose");
const port = 5000;
const placeRoutes = require("./routes/places-routes");
<<<<<<< HEAD
const bodyParser = require("body-parser");
=======
const userRoutes = require("./routes/user-routes");

const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");
>>>>>>> da62199d15fd2c6f3709ba51e8a15139cbb50840

const app = express();

// console.log(placeRoutes);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});

app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  next(error);
});

// app.use(bodyParser.json());

app.use((error, req, res, next) => {
  console.log(req.headerSent);
  if (req.headerSent) {
    next(error);
  } else {
    res.status(error.code || 500);
    res.json({ message: error.message || "Unexpected Error" });
  }
});

mongoose
  .connect(
    "mongodb+srv://mahendra:Balumahi7780@cluster0.mwhrt.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Your Application running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
