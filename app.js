const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const app = express();
const router = require("./router");

// Creating configarations options
// Adding the store property so we can store our session in mongodb
let sessionOptions = session({
  secret: "JavaScript is sooooooooo coool",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});

app.use(sessionOptions);
// make our app server use the connect-flash package
app.use(flash());

// Boilerplate code the our app server needs
// It tells express to add the user submitted data onto our request object
// so then we can access it from request dot body
// Now our app accepts the two most common way of submitting date on the Web
// a traditional html form submit and also just sending over a bit of json data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Makes the our app server be able to use the public folder with our styles
app.use(express.static("public"));

// Set up app with the views folder, the first arg needs to be called views
// the second one is the name of the folder you want your views to be in.
// Now express knows where to look and find out our templates
app.set("views", "views");

// This code tells express which template engine we are using (In this project we are using ejs)
app.set("view engine", "ejs");

// Makes our app server use the router variable which has all our url routes
// The first arg is to tell which url to use this router for
// The second arg is the router we want to use
app.use("/", router);

module.exports = app;
