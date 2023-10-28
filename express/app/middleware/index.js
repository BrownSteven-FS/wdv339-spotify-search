const { json, urlencoded } = require("express");
const cors = require("cors");

module.exports = async (app) => {
  app.use(
    urlencoded({
      extended: true,
    })
  );
  app.use(json());
  app.use(cors());
};
