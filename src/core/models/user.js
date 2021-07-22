const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"User Name is Required"] },
  email:{ type: String, required: [true,"User Email is Required"] },
  phone:{ type: String, required: [true,"User Phone Number is Required"] },
  gender:{ type: String, required: [true,"User Gender is Required"] },
  password:{ type: String, required: [true,"User Password is Required"] },
  address:{ type: String, default: null},
  profile_pic:{ type: String, default:null },
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema)