const express = require("express");
const { route } = require("./router");
const app = express();
const router = require("./router");

app.use(express.static("public"));

// Set up app with the views folder, the first arg needs to be called views
// the second one is the name of the folder you want your views to be in.
// Now express knows where to look and find out our templates
app.set("views", "views");

// This code tells express which template engine we are using (In this project we are using ejs)
app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//   res.render("home-guest");
// });

app.use(router);

app.listen(3000);
