const mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/prichat");
const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

userSchema.plugin(plm);
module.exports = mongoose.model("users", userSchema);