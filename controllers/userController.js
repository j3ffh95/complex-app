const User = require("../models/User");

exports.mustBeLoggedIn = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash("errors", "You must be logged in to perform that action.");
    req.session.save(function () {
      res.redirect("/");
    });
  }
};

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then(function (result) {
      // Create session object
      req.session.user = { avatar: user.avatar, username: user.data.username };
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
  user
    .register()
    .then(() => {
      req.session.user = { username: user.data.username, avatar: user.avatar };
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch((regErrors) => {
      regErrors.forEach(function (error) {
        req.flash("registrationErrors", error);
      });
      req.session.save(function () {
        res.redirect("/");
      });
    });
};

exports.home = function (req, res) {
  if (req.session.user) {
    // you can call render with a second arg so you can pass the specific data to the template
    res.render("home-dashboard", {
      username: req.session.user.username,
      avatar: req.session.user.avatar,
    });
  } else {
    res.render("home-guest", {
      errors: req.flash("errors"),
      registrationErrors: req.flash("registrationErrors"),
    });
  }
};
