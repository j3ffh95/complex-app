const User = require("../models/User");

exports.home = function (req, res) {
  res.render("home-guest");
};

exports.register = function (req, res) {
  res.send("Thanks for trying to register");
};
