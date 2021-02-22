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
      // call flash from the req object and give it 2 arguments, the first one is the name of the collection
      // that we want to add to,
      // the second arg is the text we want to fill to that collection.
      req.flash("errors", error);
      req.session.save(function () {
        res.redirect("/");
      });
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
    user.errors.forEach(function (error) {
      req.flash("registrationErrors", error);
    });
    req.session.save(function () {
      res.redirect("/");
    });
  } else {
    res.send("There is no errors");
  }
};

exports.home = function (req, res) {
  if (req.session.user) {
    // you can call render with a second arg so you can pass the specific data to the template
    res.render("home-dashboard", { username: req.session.user.username });
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      registrationErrors: req.flash("registrationErrors"),
    });
  }
};
