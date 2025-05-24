const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a description!"],
  },
  fullName: {
    type: String,
    required: [true, "Please provide a full name!"],
  },
});
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
