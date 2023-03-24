const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  location: String,
  age: Number,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
