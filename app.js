const express = require("express");
const mongoose = require("mongoose");
const noteRoute = require("./routes/noteRoutes");
const userRoute = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", userRoute);
app.use("/api/notes", noteRoute);

mongoose
  .connect(
    "mongodb+srv://admin:Olk5SG2dxcVibt2E@cluster0.rmxqttr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
