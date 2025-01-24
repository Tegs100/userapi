const mongoose = require("mongoose");
const user = new mongoose.Schema({
name: {
    type: String,
    require: true
},
email: {
  type: String,
  require: true,
  unique: true
},
password: {
  type: String,
  require: true, 
}
},{timestamps: true});

const userModel = mongoose.model("User", user)
module.exports = userModel;