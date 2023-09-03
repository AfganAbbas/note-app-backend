const express = require("express");
const mongoose = require("mongoose");
const noteRoute = require("./routes/noteRoutes");
const userRoute = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/api/auth", userRoute);
app.use("/api/notes", noteRoute);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
