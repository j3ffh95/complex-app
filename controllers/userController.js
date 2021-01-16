const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      // Create session object
      req.session.user = { favColor: "blue", username: user.data.username };
      res.send(result);
    })
    .catch(function (error) {
      res.send(error);
    });
};

exports.logout = function (req, res) {
  // use the destroy method to delete session
  req.session.destroy();
  res.send("You are now logged out.");
};

exports.register = function (req, res) {
  let user = new User(req.body);
  user.register();
  if (user.errors.length) {
    res.send(user.errors);
  } else {
    res.send("There is no errors");
  }
};

exports.home = function (req, res) {
  if (req.session.user) {
    res.render("home-dashboard", { username: req.session.user.username });
  } else {
    res.render("home-guest");
  }
};
