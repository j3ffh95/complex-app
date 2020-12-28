const mongodb = require("mongodb");

const connectionString =
  "mongodb+srv://j3ffh95:soccer1995@cluster0-ezsop.mongodb.net/ComplexApp?retryWrites=true&w=majority";

mongodb.connect(
  connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    // This way if we require this file from within another file its going to return the database that we can work with
    module.exports = client.db();

    // Here we require our app server file once we established a connection with the database
    const app = require("./app");
    app.listen(3000);
  }
);
