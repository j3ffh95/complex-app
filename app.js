const express = require("express");
const { route } = require("./router");
const app = express();
const router = require("./router");

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

app.listen(3000);
