const { RssHandler } = require("htmlparser2");

exports.home = function (req, res) {
  res.render("home-guest");
};

exports.register = function (req, res) {
  res.send("Thanks for trying to register");
};