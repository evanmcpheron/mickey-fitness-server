const express = require("express");

const { routing } = require("../../constants");

const userRoute = require("./user.routes");

module.exports = (application) => {
  const router = express.Router();

  router.use(routing.USER_ROOT, userRoute(application));

  return router;
};
