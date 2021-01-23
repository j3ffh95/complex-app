const User = require("../models/User");

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      // Create session object
      req.session.user = { favColor: "blue", username: user.data.username };
      // we have to save the session using the save method in the session object
      // added a callback function that is going to run when it is successfully saves
      // it is going to redirect the user the home page with him logged in already
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch(function (error) {
      res.redirect("/");
    });
};

exports.logout = function (req, res) {
  // use the destroy method to delete session
  req.session.destroy(function () {
    res.redirect("/");
  });
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
