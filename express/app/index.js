const express = require("express");
const app = express();
const middleware = require("./middleware");
const mongoose = require("mongoose");
middleware(app);

app.get("/", (req, res) => {
  const state = mongoose.connection.readyState;
  let message = "";

  switch (state) {
    case 0:
      message = "MongoDB disconnected";
      break;
    case 1:
      message = "MongoDB connected";
      break;
    case 2:
      message = "MongoDB connecting";
      break;
    case 3:
      message = "MongoDB disconnecting";
      break;
  }

  res.send(message);
});
// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(500 || status).json({
    error: { message, status },
    method: req.method,
  });
  next();
});

module.exports = app;
