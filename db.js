const dotenv = require("dotenv");
dotenv.config();

const mongodb = require("mongodb");

// Connecting the app to the mongodb database
mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    // This way if we require this file from within another file its going to return the database that we can work with
    module.exports = client;

    // Here we require our app server file once we established a connection with the database
    const app = require("./app");
    app.listen(process.env.PORT);
  }
);
