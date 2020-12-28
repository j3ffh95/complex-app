const User = function (data) {
  this.data = data;

  this.errors = [];
};

User.prototype.validate = function () {};

User.prototype.register = function () {
  // Step #1: Validate user data
  this.validate();

  // Step #2: Only if there are no validation errors
  // then save the user data into a database
};

module.exports = User;
