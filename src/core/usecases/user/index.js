const model = require("../../models/user");
const mongoose = require("mongoose");

const addUser = async (user) => {
  user._id = new mongoose.Types.ObjectId();
  return (await new model(user).save()).toObject();
}

const getUser = async (userData) => {
    return (await model.find(userData || {}))
}

const updateUser = async (userId,data) => {
  let updateResponse = await model.updateOne({ _id: userId }, { $set: data }).exec() 
  if(updateResponse.ok == 1){
   return await getUser({_id:userId});
  }
  else{
      return {Error: "Something went wrong!!!"}
  }
}

const deleteUser = async (userId) => {
  console.log("USER ID :",userId)
    let updateResponse = await model.deleteOne({ _id: userId }).exec()  
    if(updateResponse.ok == 1){
    return {Message:"user deleted Successfully!!!"}
  }
  else{
      return {Error: "Something went wrong!!!"}
  }
}


module.exports = { addUser, getUser , updateUser, deleteUser }