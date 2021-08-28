const model = require("../../models/user");
const mongoose = require("mongoose");

// add User in database by using modal.save() function
//The save() function is used to save the document to the database. Using this function, new documents can be added to the database.
const addUser = async (user) => {
  user._id = new mongoose.Types.ObjectId();
  return (await new model(user).save()).toObject();
}

// Get User in database by using modal.find() function
//The find() function is used to find particular data from the MongoDB database. 
// It takes 3 arguments and they are query (also known as a condition), query projection (used for mentioning which fields to include or exclude from the query), 
// and the last argument is the general query options (like limit, skip, etc).
const getUser = async (userData) => {
    return (await model.find(userData || {}))
}

// Update User in database by using modal.updateOne() function
//The updateOne() function is used to update the first document that matches the condition. This function is the same as update(), 
//except it does not support the multi or overwrite options.
const updateUser = async (userId,data) => {
  let updateResponse = await model.updateOne({ _id: userId }, { $set: data }).exec() 
  if(updateResponse.ok == 1){
   return await getUser({_id:userId});
  }
  else{ return {Error: "Something went wrong!!!"}}
}

// Delete User in database by using modal.deleteOne() function
// The deleteOne() function is used to delete the first document that matches the conditions from the collection. It behaves like the remove()
// function but deletes at most one document regardless of the single option
const deleteUser = async (userId) => {
    let updateResponse = await model.deleteOne({ _id: userId }).exec()  
    if(updateResponse.ok == 1){
    return {Message:"user deleted Successfully!!!"}
  }
  else{ return {Error: "Something went wrong!!!"} }
}

// exporting all the functions 
module.exports = { addUser, getUser , updateUser, deleteUser }